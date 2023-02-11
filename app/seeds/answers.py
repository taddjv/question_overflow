from app.models import db, Answer, environment, SCHEMA


def seed_answers():
    demo = Answer(
        answer="simply jump inside a body of water. this is better when you add soap", url="https://images.theconversation.com/files/333754/original/file-20200508-49546-dx6y3a.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop", user_id=2, question_id=1
    )
    demo1 = Answer(
        answer="yea ok. this is right", url="https://images.theconversation.com/files/333754/original/file-20200508-49546-dx6y3a.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop", user_id=1, question_id=2
    )
    demo2 = Answer(
        answer="iunno lol", url="https://images.theconversation.com/files/333754/original/file-20200508-49546-dx6y3a.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop", user_id=2, question_id=2
    )
    demo3 = Answer(
        answer="i came here to troll", url="https://images.theconversation.com/files/333754/original/file-20200508-49546-dx6y3a.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop", user_id=1, question_id=2
    )
    demo4 = Answer(
        answer="ask your mom", url="https://images.theconversation.com/files/333754/original/file-20200508-49546-dx6y3a.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop", user_id=3, question_id=2
    )
    demo5 = Answer(
        answer="isnt it a board game or something", url="https://images.theconversation.com/files/333754/original/file-20200508-49546-dx6y3a.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop", user_id=3, question_id=4
    )
    demo6 = Answer(
        answer="it better be, i dont even have a credit card", url="https://images.theconversation.com/files/333754/original/file-20200508-49546-dx6y3a.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop", user_id=3, question_id=6
    )
    demo7 = Answer(
        answer="type your question in the search bar", url="https://images.theconversation.com/files/333754/original/file-20200508-49546-dx6y3a.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop", user_id=3, question_id=5
    )
    demo8 = Answer(
        answer="type your answer after clicking on the Answer this Question button", url="https://images.theconversation.com/files/333754/original/file-20200508-49546-dx6y3a.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop", user_id=2, question_id=7
    )
    demo9 = Answer(
        answer="i cant even find the tags", url="https://images.theconversation.com/files/333754/original/file-20200508-49546-dx6y3a.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop", user_id=2, question_id=8
    )
    demo10 = Answer(
        answer="use your eyeballs to find it", url="https://images.theconversation.com/files/333754/original/file-20200508-49546-dx6y3a.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop", user_id=3, question_id=8
    )
    demo11 = Answer(
        answer="use a watch , easy fix", url="https://images.theconversation.com/files/333754/original/file-20200508-49546-dx6y3a.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop", user_id=2, question_id=3
    )

    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)
    db.session.add(demo11)
    db.session.commit()


def undo_answers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM answers")

    db.session.commit()
