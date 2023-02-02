from .db import db, environment, SCHEMA
from sqlalchemy.sql import func


class Search(db.Model):
    __tablename__ = "searches"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    search = db.Column(db.String(255), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="searches")


    def to_dict(self):
        return {
            'id': self.id,
            'search': self.search,
            'user_id': self.user_id,
        }
