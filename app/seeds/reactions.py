from app.models import db, Answer, environment, SCHEMA, Reaction


def seed_reactions():
    demo = Reaction(
        answer_id=1, user_id=1, up_vote=True
    )
    db.session.add(demo)
    db.session.commit()


def undo_reactions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reactions")

    db.session.commit()
