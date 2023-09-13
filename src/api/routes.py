"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint , current_app
from api.models import db, User, Course, Company_admin
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hola qué tal"
    }

    return jsonify(response_body), 200

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
                        is_active= is_active)
    try:
        db.session.add(new_register)
        db.session.commit()
        return jsonify({"message":"Usuario registrado"}), 201
    except Exception as error:
        print(str(error))
        return jsonify({"message":"error al almacenar en BD"}), 500

#Aquí termina el registro de usuario

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
    return jsonify({"token":access_token}), 200

#Aquí termina el login de usuario

@api.route("/adminLogin", methods=["POST"])
def admin_login():
    body = request.get_json()
    #ver si se puede hacer un email restringido de empresa
    admin_id = body["admin_id"]
    password = body["password"]

    if body is None:
        raise APIException("Body está vacío", status_code=400)
    if admin_id is None or admin_id=="":
        raise APIException("El admin id es necesario", status_code=400)
    if password is None or password=="":
        raise APIException("El password es necesario", status_code=400)
    admin_login = Company_admin.query.filter_by(admin_id=admin_id).first()
    if admin_login is None:
        raise APIException("El admin id o el password son incorrectos", status_code=400)
    coincidencia = current_app.bcrypt.check_password_hash(user.password,password) #si coincide, devuelve True
    if not coincidencia:
        raise APIException("El admin id o el password son incorrectos", status_code=400)
    access_token = create_access_token(identity=email)
    return jsonify({"token":access_token}), 200

#Aquí termina login administrador

@api.route('/addCourse', methods=["POST"])
def add_course():
    body = request.get_json()
    print(body)
    name = body["name"]
    code = body["code"]
    category = body["category"]
    provider = body["provider"]
    cost = body["cost"]
    description = body["description"]
    modality = body["modality"]
    start_date = body["start_date"]
    finish_date = body["finish_date"]
    contents = body["contents"]
    is_active = True
    if body is None:
        raise APIException("Body está vacío", status_code=400)
    if name is None or name=="":
        raise APIException("Ingrese el nombre de curso", status_code=400)
    if code is None or code=="":
        raise APIException("Ingrese el código", status_code=400)
    if category is None or category=="":
        raise APIException("Ingrese la categoría", status_code=400)
    if provider is None or provider=="":
        raise APIException("Ingrese el proveedor", status_code=400)
    if cost is None or cost=="":
        raise APIException("Ingrese el costo", status_code=400)
    if description is None or description=="":
        raise APIException("Digite la descripción", status_code=400)
    if modality is None or modality=="":
        raise APIException("Ingrese la modalidad", status_code=400)
    if start_date is None or start_date=="":
        raise APIException("Ingrese la fecha de inicio", status_code=400)
    if finish_date is None or finish_date=="":
        raise APIException("Ingrese la fecha de finalización de curso", status_code=400)
    if contents is None or contents=="":
        raise APIException("Ingrese los contenidos", status_code=400)
    addcourse = Course.query.filter_by(code=code).first()
    #se verifica si el curso ya existe en BD
    if addcourse:
        raise APIException("El curso ya existe", status_code=400)
    #debería encriptar el password
    #print("password sin encriptar:", password)
    #password = current_app.bcrypt.generate_password_hash(password, 10).decode("utf-8")
    #print("password con encriptación:", password)
    new_course = Course(name=name,
                        code=code,
                        category=category,
                        provider=provider,
                        cost=cost,
                        description=description,
                        modality=modality,
                        start_date=start_date,
                        finish_date=finish_date,
                        contents=contents,
                        is_active=True)
    try:
        db.session.add(new_course)
        db.session.commit()
        return jsonify({"message":"curso añadido"}), 201
    except Exception as error:
        print(str(error))
        return jsonify({"message":"error al añadir el curso en BD"}), 500

#Aquí termina el formulario de agregar curso 
###########

#Traer info de todos los cursos
@api.route('/addCourse', methods=['GET'])
def get_course():
    search = Course.query.all()    
    search_serialize = list(map(lambda x: x.serialize(), search)) # search.map((item)=>{item.serialize()})
    print("valor de search_serialize ", search_serialize)
    
    return jsonify(search_serialize), 200

#Traer info de un solo curso
@api.route('/pruebaVistaMostrarMas/<int:id>', methods=['GET'])
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

        search.modality = body["modality"]
        search.code = body["code"]

        db.session.commit()

        return jsonify({"message":"se edito correctamente"}), 200

    except Exception as error:
        print(error)  
        return jsonify({"message":str(error)}), 500  


  
  

    