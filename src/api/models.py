from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=True, nullable=False)
    lastname= db.Column(db.String(200), unique=True, nullable=False)
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

class Course(db.Model):
    __tablename__ = 'course'
    id = db.Column(db.Integer, primary_key=True)
    course = db.Column(db.String(200), unique=True, nullable=False)
    code = db.Column(db.String(200), unique=True, nullable=False)
    category = db.Column(db.String(200), unique=True, nullable=False)
    provider = db.Column(db.String(200), unique=True, nullable=False)
    cost = db.Column(db.String(200), unique=True, nullable=False)
    description = db.Column(db.String(200), unique=True, nullable=False)
    modality = db.Column(db.String(200), unique=True, nullable=False)
    start_date = db.Column(db.String(200), unique=True, nullable=False)
    finish_date = db.Column(db.String(200), unique=True, nullable=False)
    contents = db.Column(db.String(200), unique=True, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    
    def __repr__(self):
        return f'<Course {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "course": self.course,
            "code": self.code,
            "category": self.category,
            "cost": self.cost,
            "description": self.description,
            "modality": self.modality,
            "start_date": self.start_date,
            "finish_date": self.finish_date,
            "contents": self.contents,
            # do not serialize the password, its a security breach
        }