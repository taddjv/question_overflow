from .db import db, environment, SCHEMA
from sqlalchemy.sql import func

class Reaction(db.Model):
    __tablename__ = "reactions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="reactions")

    answer_id = db.Column(db.Integer, db.ForeignKey("answers.id"), nullable=False)
    answer = db.relationship("Answer", back_populates="reactions")
