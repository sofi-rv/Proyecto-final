"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint , current_app
from api.models import db, User, TokenBlocked, Course, Supplier, SupplierPivot, CourseEnrollment
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity, get_jwt
from flask_jwt_extended import jwt_required

import smtplib, ssl
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from email.mime.base import MIMEBase
from email import encoders

smtp_address = os.getenv("SMTP_ADDRESS")
smtp_port = os.getenv("SMTP_PORT")
email_address = os.getenv("EMAIL_ADDRESS")
email_password = os.getenv("EMAIL_PASSWORD")

import secrets
import string

api = Blueprint('api', __name__)


def generate_random_password(length=12):
    characters = string.ascii_letters + string.digits + string.punctuation
    random_password = ''.join(secrets.choice(characters) for _ in range(length))
    return random_password


def send_password_reset_email(destinatario, random_password):
    
    asunto = "Recuperación de contraseña"
    cuerpo = f"Su contraseña provisional es: {random_password}"

    
    send_email(asunto, destinatario, cuerpo)

#enviar correos
def send_email(asunto, destinatario, body):
    message = MIMEMultipart("alternative")
    message["Subject"] = asunto
    message["From"] = email_address
    message["To"] = destinatario
    
    #Version HTML del body
    #''' indica principio y final de una cadena de texto
    html = '''
    
    <html>
    <body>
    <div>
    <p>
    Estás recibiendo este correo porque hiciste una solicitud de recuperación de contraseña para tu cuenta
    </p>
     ''' + body + '''   
    <p>
    Company CR
    </p>
    </div>
    </body>
    </html>
    '''

    #crear los elemento MIME
    html_mime = MIMEText(html, 'html')

    #adjuntamos el código html al mensaje
    message.attach(html_mime)

    #enviar el correo
    try:
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(smtp_address, smtp_port, context=context) as server:
            server.login(email_address, email_password)
            server.sendmail(email_address, destinatario, message.as_string())
        return True
    
    except Exception as error:
        print(str(error))
        return False


#prueba para bloquear token y no entre a esta ruta privada
def verifyToken(jti):
    search = TokenBlocked.query.filter_by(token=jti).first()
    
    if search == None:
        return True #para este caso el token no estaría en la lista de bloqueados
    else:
        return False #para este caso el token sí estaría en la lista de bloqueados

@api.route('/hello', methods=['POST', 'GET'])
@jwt_required() 

def handle_hello():

    verification = verifyToken(get_jwt()["jti"])
    if verification == False:
        return jsonify({"message":"forbidden"}), 403 


    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#Registro de usuario
@api.route('/register', methods=["POST"])
def user_register():
    body = request.get_json()
    email = body["email"]
    password = body["password"]
    name = body["name"]
    lastname = body["lastname"]
    role = body["role"]
    is_active = True
    if body is None:
        raise APIException("Body está vacío", status_code=400)
    if email is None or email=="":
        raise APIException("El email es necesario", status_code=400)
    if name is None or name=="":
        raise APIException("El nombre es necesario", status_code=400)
    if lastname is None or lastname=="":
        raise APIException("Los apellidos son necesarios", status_code=400)
    if password is None or password=="":
        raise APIException("El password es necesario", status_code=400)
    if role is None or role=="":
        role= "user"
    user = User.query.filter_by(email=email).first()
    #se verifica si el usuario ya existe en BD
    if user:
        raise APIException("El usario ya existe", status_code=400)
    #debería encriptar el password
    print("password sin encriptar:", password)
    password = current_app.bcrypt.generate_password_hash(password, 10).decode("utf-8")
    print("password con encriptación:", password)
    new_register = User(email=email,
                        password=password, 
                        name=name,
                        lastname=lastname,
                        role=role,
                        is_active= is_active)
    try:
        db.session.add(new_register)
        db.session.commit()
        return jsonify({"message":"Usuario registrado"}), 201
    except Exception as error:
        print(str(error))
        return jsonify({"message":"error al almacenar en BD"}), 500

#Login de usuario
@api.route("/", methods=["POST"]) 
def login():
    body = request.get_json()
    #ver si se puede hacer un email restringido de empresa
    email = body["email"]
    password = body["password"]

    if body is None:
        raise APIException("Body está vacío", status_code=400)
    if email is None or email=="":
        raise APIException("El email es necesario", status_code=400)
    if password is None or password=="":
        raise APIException("El password es necesario", status_code=400)
    user = User.query.filter_by(email=email).first()
    if user is None:
        raise APIException("El usuario o el password son incorrectos", status_code=400)
    coincidencia = current_app.bcrypt.check_password_hash(user.password,password) #si coincide, devuelve True
    if not coincidencia:
        raise APIException("El usuario o el password son incorrectos", status_code=400)
    access_token = create_access_token(identity=email)
    user_info = user.serialize() #["id"] para solo traer id
    return jsonify({"token":access_token, "user":user_info}), 200

@api.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    try:
        jti = get_jwt()["jti"]
        identity = get_jwt_identity() #asociada al correo
        print("jti: ", jti)
        new_register =  TokenBlocked(token=jti, email= identity) #creamos una instancia de la clase TokenBlocked

        db.session.add(new_register)
        db.session.commit()

        return jsonify({"message":"logout succesfully"}), 200
    
    except Exception as error:
        print(str(error))
        return jsonify({"message":"error trying to logout"}), 403

@api.route("/auth", methods=["GET"])
@jwt_required()
def auth():
    try:
        email = get_jwt_identity() #asociada al correo
        print(email)
        user = User.query.filter_by(email = email).first()

        return jsonify(user.serialize()), 200
    
    except Exception as error:
        print(str(error))
        return jsonify({"message":"error trying to auth"}), 403

#Traer info de un usuario
@api.route('/user/<int:id>', methods=['GET'])
def get_user_id(id):
    try:
        search = User.query.get(id)   
    
        search_serialize = search.serialize()  
        print("valor de search_serialize", search_serialize)       

        return jsonify(search_serialize), 200

    except Exception as error:
            print(error)
            return jsonify({"message":str(error)}), 500

#Traer info de todos los cursos
@api.route('/courses', methods=['GET'])
def get_course():
    search = Course.query.all()    
    search_serialize = list(map(lambda x: x.serialize(), search)) # search.map((item)=>{item.serialize()})
    print("valor de search_serialize ", search_serialize)
    
    return jsonify(search_serialize), 200

#Traer info de un solo curso
@api.route('/addCourse/<int:id>', methods=['GET'])
def get_course_id(id):
    try:
        search = Course.query.get(id)   
    
        search_serialize = search.serialize()  
        print("valor de search_serialize", search_serialize)       

        return jsonify(search_serialize), 200

    except Exception as error:
            print(error)
            return jsonify({"message":str(error)}), 500

#Borrar curso
@api.route('/addCourse/<int:id>', methods=['DELETE'])
def delete_course_id(id):
    try:
        search = Course.query.get(id)  
        db.session.delete(search)
        db.session.commit()
        return jsonify({"message":"se elimino correctamente"}), 200

    except Exception as error:
        print(error)  
        return jsonify({"message":str(error)}), 500 

#Editar curso
@api.route('/addCourse/<int:id>', methods=['PUT'])
def edit_course_id(id):
    try:
        body = request.get_json()
        search = Course.query.get(id)  
        if "name" in body:
            search.name = body["name"]

        if "code" in body:
            search.code = body["code"]

        if "category" in body:
            search.category = body["category"]

        if "cost" in body:
            search.cost = body["cost"]

        if "description" in body:
            search.description = body["description"]

        if "modality" in body:
            search.modality = body["modality"]
        
        if "start_date" in body:
            search.start_date = body["start_date"]
        
        if "finish_date" in body:
            search.finish_date = body["finish_date"]

        if "contents" in body:
            search.contents = body["contents"]
        
        db.session.commit()

        return jsonify({"message":"se edito correctamente"}), 200

    except Exception as error:
        print(error)  
        return jsonify({"message":str(error)}), 500 

#Agregar proveedor
@api.route('/suppliers', methods=["POST"]) 
def supplier_register():
    body = request.get_json()
    name = body["name"]
    phone = body["phone"]
    email = body["email"]
    legal_id = body["legal_id"]
    is_active = True
    if body is None:
        raise APIException("Body está vacío", status_code=400)
    if name is None or name=="":
        raise APIException("El nombre del proveedor es necesario", status_code=400)
    if phone is None or phone=="":
        raise APIException("El numero de telefono es necesario", status_code=400)
    if email is None or email=="":
        raise APIException("El email es necesario", status_code=400)
    if legal_id is None or legal_id=="":
        raise APIException("La cedula juridica es necesaria", status_code=400)
    
    supplier = Supplier.query.filter_by(legal_id=legal_id).first()
    #se verifica si el usuario ya existe en BD
    if supplier:
        raise APIException("El proveedor ya existe", status_code=400)
    new_supplier = Supplier(name=name,
                        phone=phone, 
                        email=email,
                        legal_id=legal_id,
                        is_active= is_active)
    try:
        db.session.add(new_supplier)
        db.session.commit()
        return jsonify({"message":"Proveedor registrado"}), 201
    except Exception as error:
        print(str(error))
        return jsonify({"message":"error al almacenar en BD"}), 500 

#Traer info de todos los proveedores
@api.route('/suppliers', methods=['GET'])
def get_supplier():
    try:
        print("entre a la ruta supplier")
        search = Supplier.query.all() 
        print("GET base de datos supplier: ", search)   
        search_serialize = list(map(lambda x: x.serialize(), search)) # search.map((item)=>{item.serialize()})
        print("valor de search_serialize ", search_serialize)
        
        return jsonify(search_serialize), 200
    except Exception as error:
        print(str(error))
        return jsonify({"message":"error al obtener suppliers"}), 500 

#Traer info del proveedor de un curso
@api.route('/supplier/<int:id>', methods=['GET'])
def get_supplier_id(id):
    try:
        search = SupplierPivot.query.filter_by(course_id = id).first()
        search_serialize = search.serialize()  
        print("valor de search_serialize", search_serialize) 
        
        return jsonify(search_serialize), 200

    except Exception as error:
            print(error)
            return jsonify({"message":str(error)}), 500

#Agregar curso
@api.route('/addCourse', methods=["POST"])
def add_course():
    body = request.get_json()

    # Extrae los datos del cuerpo de la solicitud
    name = body["name"]
    code = body["code"]
    category = body["category"]
    provider_id = body["provider_id"]  # Cambia "provider" a "provider_id"
    cost = body["cost"]
    description = body["description"]
    modality = body["modality"]
    start_date = body["start_date"]
    finish_date = body["finish_date"]
    contents = body["contents"]

    if body is None:
        return jsonify({"message": "Body está vacío"}), 400

    # ... Validaciones y creación del curso ...

    try:
        # Crea un nuevo curso en la tabla de cursos
        new_course = Course(name=name, code=code, category=category, cost=cost, description=description,
                            modality=modality, start_date=start_date, finish_date=finish_date, contents=contents, is_active=True)
        db.session.add(new_course)
        db.session.commit()
        db.session.refresh(new_course) #para que se agregue el id

        new_supplier_pivot = SupplierPivot(course_id=new_course.id, supplier_id=provider_id) 
        db.session.add(new_supplier_pivot)
        db.session.commit()

        return jsonify({"message": "Curso añadido"}), 201
    except Exception as error:
        print(str(error))
        return jsonify({"message": "Error al añadir el curso en BD"}), 500

#Matricula de curso
@api.route('/enrollment', methods=["POST"])
def enroll_course():
    body = request.get_json()

    # Extrae los datos del cuerpo de la solicitud
    user_id = body["user_id"]
    course_id = body["course_id"]
    condition = body["condition"]
    if "approval_doc" in body:
        approval_doc = body["approval_doc"]

    # if body is None:
    #     return jsonify({"message": "Body está vacío"}), 400

    # ... Validaciones y matricula ...

    try:
        search2 = CourseEnrollment.query.filter_by(user_id = user_id, course_id=course_id).first()
        if search2:
            return jsonify({"message":"ya se encuentra matriculado"}), 409
        # Crea un nuevo curso en la tabla de cursos
        enroll_course = CourseEnrollment(condition=condition, course_id=course_id, user_id=user_id, approval_doc=approval_doc)
        db.session.add(enroll_course)
        db.session.commit()

        return jsonify({"message": "matriculado"}), 201
    except Exception as error:
        print(str(error))
        return jsonify({"message": "Error al matricularse"}), 500 

#Traer info de todas las matrículas de cursos
@api.route('/enrollment', methods=['GET'])
def course_enrollment():
    try:
        search = CourseEnrollment.query.all()    
        search_serialize = list(map(lambda x: x.serialize(), search)) # search.map((item)=>{item.serialize()})
        print("valor de search_serialize ", search_serialize)

        return jsonify(search_serialize), 200

    except Exception as error:
        print(error)
        return jsonify({"message":str(error)}), 500

#Traer info del historial académico del usuario
@api.route('/enrollment/<int:id>', methods=['GET'])
def course_enrollment_id(id):
    try:
        search2 = CourseEnrollment.query.filter_by(user_id = id).all()
        search2_serialize = list(map(lambda x: x.serialize(), search2))
        print("resultado final: ", search2_serialize)
        
        return jsonify(search2_serialize), 200      

        return jsonify(search_serialize), 200

    except Exception as error:
            print(error)
            return jsonify({"message":str(error)}), 500

#Ingresar comprobante de aprobación
@api.route('/enrollment/<int:id>', methods=['PUT'])
def send_approval_doc(id):
    try:
        print(id)
        body = request.get_json()
        search = CourseEnrollment.query.filter_by(course_id = id).first()
        print(search.serialize())
        search.approval_doc = body["approval_doc"]

        db.session.commit()

        return jsonify({"message":"se envio correctamente"}), 200

    except Exception as error:
        print(error)  
        return jsonify({"message":str(error)}), 500 

#Ingresar condición de empleado 
@api.route('/condition/<int:id>', methods=['PUT'])
def set_condition(id):
    try:
        body = request.get_json()
        search = CourseEnrollment.query.get(id)
        search.condition = body["condition"]

        db.session.commit()

        return jsonify({"message":"se envio correctamente"}), 200

    except Exception as error:
        print(error)  
        return jsonify({"message":str(error)}), 500 

#ruta para enviar correo
@api.route("/sendmail", methods=["POST"])
def endpoint_mail():
    body = request.get_json()
    asunto = body["asunto"]
    destinatario = body["destinatario"]
    cuerpo = body["contenido"]

    verificar = send_email(asunto, destinatario, cuerpo)

    if verificar==True:
        return jsonify({"message":"email sent"}), 200
    else:
        return jsonify({"message":"error sending mail"}), 400

#recuperar contraseña
@api.route("/password_recovery", methods=["POST"])
def password_recovery():
    body = request.get_json()
    email = body["email"]

    
    user = User.query.filter_by(email=email).first()
    if user:
        
        new_password = generate_random_password()

        
        user.password = current_app.bcrypt.generate_password_hash(new_password).decode('utf-8')
        db.session.commit()

        
        send_password_reset_email(email, new_password)

        return jsonify({"message": "Password reset email sent"}), 200
    else:
        return jsonify({"message": "User not found"}), 404

#cambiar contraseña
@api.route('/change_password/<string:email>', methods=['PUT'])
def change_password(email):
    body = request.get_json()
    password = body["password"]
    
    user = User.query.filter_by(email=email).first()
    if user:

        user.password = current_app.bcrypt.generate_password_hash(password).decode('utf-8')
        db.session.commit()

        return jsonify({"message": "Password reset"}), 200
    else:
        return jsonify({"message": "User not found"}), 404

    