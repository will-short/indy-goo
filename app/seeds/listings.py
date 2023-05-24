import random
from app.models import db, Listing, Tag, Review
from faker import Faker
import json
fake = Faker()
# Adds a demo user, you can add other users here if you want


def seed_listings():

    with open('./app/seeds/gameData.json', 'r') as f:
        contents = f.readlines()

    ind = 0
    reviewInd = 0
    # remove any duplicate games from game list from steam

    formattedGameData = list(set(contents))

    for s in formattedGameData:
        ind += 1
        gameData = json.loads(s)
        owner_id = (1 + ind//8)
        game = Listing(
            name=gameData["name"],
            description=gameData["description"][:499],
            image_urls=str(gameData["image_urls"]),
            video_url=gameData["video_url"],
            price=gameData["price"][1:],
            owner_id=owner_id
        )
        db.session.add(game)
        if gameData["genres"]:
            formatted = [str.lower() for str in gameData["genres"]]
            action = True if "action" in formatted else None
            adventure = True if "adventure" in formatted else None
            rpg = True if "rpg" in formatted else None
            mmo = True if "mmo" in formatted or "massively multiplayer" in formatted else None
            casual = True if "casual" in formatted else None
            sports = True if "sports" in formatted else None
            simulation = True if "simulation" in formatted else None
            strategy = True if "strategy" in formatted else None
            racing = True if "racing" in formatted else None
            rts = True if "rts" in formatted else None
            horror = True if "horror" in formatted or "violent" in formatted else None
            platformer = True if "platformer" in formatted else None
            tags = Tag(
                action=action,
                adventure=adventure,
                rpg=rpg,
                mmo=mmo,
                casual=casual,
                sports=sports,
                simulation=simulation,
                strategy=strategy,
                racing=racing,
                rts=rts,
                horror=horror,
                platformer=platformer,
                listing_id=ind)
            db.session.add(tags)
            for z in range(random.randint(3, 5)):
                review = Review(
                    content=fake.sentence(nb_words=10),
                    rating=random.randint(1, 5),
                    listing_id=ind,
                    owner_id=random.randint(1, 100),
                )
                db.session.add(review)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_listings():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
