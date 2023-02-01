from app.models import db, Question, environment, SCHEMA


def seed_questions():
    demo = Question(
        user_id=1, question="how do i bathe", detail="people say i stink and say that i should bathe", url="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2020/11/bathReasons-1143723436-770x533-1.jpg"
    )
    demo1 = Question(
        user_id=1, question="how to what", detail="people say i stink and say that i should bathe", url="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2020/11/bathReasons-1143723436-770x533-1.jpg"
    )
    db.session.add(demo)
    db.session.add(demo1)
    db.session.commit()


def undo_questions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM questions")

    db.session.commit()
