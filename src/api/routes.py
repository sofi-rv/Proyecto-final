"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint , current_app
from api.models import db, User
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
