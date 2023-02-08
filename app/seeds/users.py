from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/950229895341031585/1073011278878097438/257-2572603_user-man-social-avatar-profile-icon-man-avatar-in-circle.png')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', profile_url='https://media.discordapp.net/attachments/950229895341031585/1073010150849384600/profile-view-and-negative-emotion.png?width=348&height=348')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', profile_url='https://media.discordapp.net/attachments/950229895341031585/1073010684230639636/171-1717870_stockvader-predicted-cron-for-may-user-profile-icon-png.png')
    dave = User(
        username='dave', email='dave@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/950229895341031585/1073011083872309418/small-profile.png')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(dave)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
