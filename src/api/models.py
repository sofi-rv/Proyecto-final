from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

class CourseEnrollment(db.Model):
    __tablename__ = 'courseenrollment'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))
    condition = db.Column(db.String(12), unique=False, nullable=False)
    approval_doc = db.Column(db.String(200), unique=False, nullable=False)
  
    def __repr__(self):
        return '<CourseEnrollment %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "course_id": self.course_id,
            "condition": self.condition,
            "approval_doc": self.approval_doc,
            "course_name": Course.query.get(self.course_id).serialize()["name"],
            "course_code": Course.query.get(self.course_id).serialize()["code"],
            "user_email": User.query.get(self.user_id).serialize()["email"],
            "user_name": User.query.get(self.user_id).serialize()["name"],
            "user_lastname": User.query.get(self.user_id).serialize()["lastname"]
        }

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=False, nullable=False)
    lastname= db.Column(db.String(200), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    role = db.Column(db.String(120), unique=False, nullable=False)
    course_enrollment = db.relationship(CourseEnrollment, backref = 'user', lazy=True)

    def __repr__(self):
        return '<User %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "role": self.role,
            # do not serialize the password, its a security breach
        }

class TokenBlocked(db.Model):
    __tablename__ = 'tokenblocked'
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(200), unique=True, nullable=False)
    email = db.Column(db.String(120), nullable=False)
    date = db.Column(db.DateTime, nullable = False, default=datetime.datetime.utcnow)
    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "token": self.token,
            "date": self.date
            # do not serialize the password, its a security breach
        }

class SupplierPivot(db.Model):
    __tablename__ = 'supplierpivot'
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))
    supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.id'))

    def __repr__(self):
        return '<SupplierPivot %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "course_id": self.course_id,
            "supplier_id": self.supplier_id,
            "supplier_name": Supplier.query.get(self.supplier_id).serialize()["name"],
        }

class Supplier(db.Model):
    __tablename__ = 'supplier'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=True, nullable=False)
    phone = db.Column(db.String(200), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    legal_id = db.Column(db.String(120), unique=True, nullable=False)
    supplierpivot = db.relationship('SupplierPivot', backref='supplier', lazy=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<Supplier %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone": self.phone,
            "email": self.email,
            "legal_id": self.legal_id
            # "courses": [pivot.course.name for pivot in self.supplierpivot]
        }

# class Supplier(db.Model):
#     __tablename__ = 'supplier'
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(200), unique=True, nullable=False)
#     phone = db.Column(db.String(200), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     legal_id = db.Column(db.String(120), unique=True, nullable=False)
#     supplierpivot = db.relationship('SupplierPivot', backref = 'supplier', lazy=True)
#     is_active = db.Column(db.Boolean(), unique=False, nullable=False)

#     def __repr__(self):
#         return '<Supplier %r>' % self.id

#     def serialize(self):
#         search = SupplierPivot.query.filter_by(supplier_id=self.id).all()    
#         search_serialize = list(map(lambda x: x.serialize()["course_id"], search))
#         courses = []
#         for course_id in search_serialize : 
#             courses.append(Course.query.get(course_id).serialize()["name"])    
#         return {
#             "id": self.id,
#             "name": self.name,
#             "phone": self.phone,
#             "email": self.email,
#             "legal_id": self.legal_id,
#             "courses": courses
#         }

# class Contents(db.Model):
#     __tablename__ = 'contents'
#     id = db.Column(db.Integer, primary_key=True)
#     course_id = db.Column(db.Integer, db.ForeignKey('course.id'))
#     content = db.Column(db.String(500), unique=False, nullable=True)

#     def __repr__(self):
#         return '<Contents %r>' % self.id

#     def serialize(self):
#         return {
#             "id": self.id,
#             "course_id": self.course_id,
#             "content": self.content
#         }

class Course(db.Model):
    __tablename__ = 'course'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=False, nullable=False)
    code = db.Column(db.String(200), unique=True, nullable=False)
    category = db.Column(db.String(200), unique=False, nullable=False)
    cost = db.Column(db.String(200), unique=False, nullable=False)
    description = db.Column(db.String(200), unique=False, nullable=False)
    modality = db.Column(db.String(200), unique=False, nullable=False)
    start_date = db.Column(db.String(200), unique=False, nullable=False)
    finish_date = db.Column(db.String(200), unique=False, nullable=False)
    contents = db.Column(db.String(200), unique=False, nullable=False)
    supplierpivot = db.relationship(SupplierPivot, backref = 'course', lazy=True)
    course_enrollment = db.relationship(CourseEnrollment, backref = 'course', lazy=True)
    # contents = db.relationship(Contents, backref = 'course', lazy=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    
    def __repr__(self):
        return f'<Course {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "code": self.code,
            "category": self.category,
            "cost": self.cost,
            "description": self.description,
            "modality": self.modality,
            "start_date": self.start_date,
            "finish_date": self.finish_date,
            "contents": self.contents,
            # "provider": Supplier.query.get(self.id).serialize()["name"],
        }

