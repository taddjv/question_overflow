from app.models import db, Question, environment, SCHEMA, Search


def seed_searches():
    demo = Search(
        user_id=1, search='how to bathe'
    )
    demo1 = Search(
        user_id=1, search='where should i go'
    )
    db.session.add(demo)
    db.session.add(demo1)
    db.session.commit()


def undo_searches():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM searches")

    db.session.commit()
