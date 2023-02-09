
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Answer(db.Model):
    __tablename__ = "answers"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    answer= db.Column(db.String(2000))
    url = db.Column(db.String(255))
    dateCreated = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    user = db.relationship("User", back_populates="answers")

    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("questions.id")), nullable=False)
    question = db.relationship("Question", back_populates="answers")

    reactions = db.relationship("Reaction", back_populates="answer", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'answer': self.answer,
            'url': self.url,
            'dateCreated': self.dateCreated,
            'user_id': self.user_id,
            'question_id': self.question_id
        }
