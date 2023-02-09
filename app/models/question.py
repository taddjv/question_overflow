from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
import json

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

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    user = db.relationship("User", back_populates="questions")

    answers = db.relationship("Answer", back_populates="question", cascade="all, delete-orphan")

    # @property
    def to_dict(self):
        return {
            'id': self.id,
            'question': self.question,
            'detail': self.detail,
            'url': self.url,
            'dateCreated': self.dateCreated,
            'user_id': self.user_id
        }
    # def toJSON(self):
    #     return json.dumps(self, default=lambda o: o.__dict__,
    #         sort_keys=True, indent=4)
