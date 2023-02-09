from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Reaction(db.Model):
    __tablename__ = "reactions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    up_vote = db.Column(db.Boolean, default=False)

    down_vote = db.Column(db.Boolean, default=False)

    dateCreated = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    user = db.relationship("User", back_populates="reactions")

    answer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("answers.id")), nullable=False)
    answer = db.relationship("Answer", back_populates="reactions")

    def to_dict(self):
        return {
            'id': self.id,
            'answer_id': self.answer_id,
            'user_id': self.user_id,
            'up_vote': self.up_vote,
            'down_vote': self.down_vote,
        }
