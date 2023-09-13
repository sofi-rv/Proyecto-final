from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=False, nullable=False)
    lastname= db.Column(db.String(200), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Company_admin(db.Model): #pascalcase
    __tablename__ = 'company_admin'
    id = db.Column(db.Integer, primary_key=True)
    admin_id = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    
    def __repr__(self):
        return f'<Company_admin {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "admin_id": self.admin_id,
            # do not serialize the password, its a security breach
        }

# class Supplier(db.Model):
#     __tablename__ = 'supplier'
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(200), unique=True, nullable=False)
#     phone = db.Column(db.String(200), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     legal_id = db.Column(db.String(120), unique=True, nullable=False)
#     course_id = db.Column(db.String(120), db.ForeignKey('course.id'))
#     is_active = db.Column(db.Boolean(), unique=False, nullable=False)

#     def __repr__(self):
#         return '<Supplier %r>' % self.id

#     def serialize(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "phone": self.phone,
#             "email": self.email,
#             "legal_id": self.legal_id,
#             "course_id": self.course_id,
#         }

class Course(db.Model):
    __tablename__ = 'course'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=False, nullable=False)
    code = db.Column(db.String(200), unique=True, nullable=False)
    category = db.Column(db.String(200), unique=False, nullable=False)
    provider = db.Column(db.String(200), unique=False, nullable=False) #hay que borrarlo
    cost = db.Column(db.String(200), unique=False, nullable=False)
    description = db.Column(db.String(200), unique=False, nullable=False)
    modality = db.Column(db.String(200), unique=False, nullable=False)
    start_date = db.Column(db.String(200), unique=False, nullable=False)
    finish_date = db.Column(db.String(200), unique=False, nullable=False)
    contents = db.Column(db.String(200), unique=False, nullable=False)
    #supplier = db.relationship(Supplier, backref = 'course', lazy=True)
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
            "provider": self.provider,
            "description": self.description,
            "modality": self.modality,
            "start_date": self.start_date,
            "finish_date": self.finish_date,
            "contents": self.contents,
            # do not serialize the password, its a security breach
        }

