from app.models import db, Question, environment, SCHEMA


def seed_questions():
    demo = Question(
        user_id=1, question="how do i bathe", detail="people say i stink and say that i should bathe", url="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2020/11/bathReasons-1143723436-770x533-1.jpg"
    )
    demo1 = Question(
        user_id=2, question="how to what", detail="dont know what to do most of the time", url="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2020/11/bathReasons-1143723436-770x533-1.jpg"
    )
    demo2 = Question(
        user_id=3, question="how to when", detail="people say i have no concept of time, it's true", url="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2020/11/bathReasons-1143723436-770x533-1.jpg"
    )
    demo3 = Question(
        user_id=1, question="What is a Stack Overflow?", detail="just wondering", url="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2020/11/bathReasons-1143723436-770x533-1.jpg"
    )
    demo4 = Question(
        user_id=1, question="How do I search for a specific question on Stack Overflow?", detail="beginner question", url="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2020/11/bathReasons-1143723436-770x533-1.jpg"
    )
    demo5 = Question(
        user_id=1, question="Is Stack Overflow free to use?", detail="more beginner question1", url="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2020/11/bathReasons-1143723436-770x533-1.jpg"
    )
    demo6 = Question(
        user_id=1, question="How do I ask a question on Stack Overflow?", detail="more beginner question1", url="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2020/11/bathReasons-1143723436-770x533-1.jpg"
    )
    demo7 = Question(
        user_id=1, question="What are tags on Stack Overflow?", detail="more beginner question1", url="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2020/11/bathReasons-1143723436-770x533-1.jpg"
    )
    demo8 = Question(
        user_id=1, question="How do I post an answer to a question on Stack Overflow?", detail="more beginner question1", url="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2020/11/bathReasons-1143723436-770x533-1.jpg"
    )
    demo9 = Question(
        user_id=1, question="What is the difference between a cell phone and a smartphone?", detail="more beginner question1", url="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2020/11/bathReasons-1143723436-770x533-1.jpg"
    )

    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)

    db.session.commit()


def undo_questions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM questions")

    db.session.commit()
