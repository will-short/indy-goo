from app.models import db, User
from faker import Faker
fake = Faker()

# Adds a demo user, you can add other users here if you want


def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    db.session.add(demo)
    for x in range(2, 112):
        additionalUser = User(
            username=f'{fake.first_name()}{x}',
            email=fake.profile()['mail'],
            password='password',
            image_url=f"https://picsum.photos/id/{x}/200"
        )
        db.session.add(additionalUser)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
