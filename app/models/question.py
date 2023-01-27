from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Question(db.Model):
    __tablename__ = "questions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey("user_id"), nullable=False)
    question = db.Column(db.String(1000), nullable=False)
    detail = db.Column(db.String(2000))
    url = db.Column(db.String(255))
    dateCreated = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="questions")

    answers = db.relationship("Answer", back_populates="question")
