from app.models import db, Answer, environment, SCHEMA


def seed_answers():
    demo = Answer(
        answer="simply jump inside a body of water. this is better when you add soap", url="https://images.theconversation.com/files/333754/original/file-20200508-49546-dx6y3a.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop",user_id=2,question_id=1,up_votes=33,down_votes=8
    )
    db.session.add(demo)
    db.session.commit()


def undo_answers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM answers")

    db.session.commit()
