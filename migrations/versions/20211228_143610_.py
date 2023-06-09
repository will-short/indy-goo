"""empty message

Revision ID: ebdd8e5e5dd1
Revises: e0f4c6a9355b
Create Date: 2021-12-28 14:36:10.584377

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ebdd8e5e5dd1'
down_revision = 'e0f4c6a9355b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_likes')
    op.drop_table('user_dislikes')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_dislikes',
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('review_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['review_id'], ['reviews.id'], name='user_dislikes_review_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='user_dislikes_user_id_fkey'),
    sa.PrimaryKeyConstraint('user_id', 'review_id', name='user_dislikes_pkey')
    )
    op.create_table('user_likes',
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('review_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['review_id'], ['reviews.id'], name='user_likes_review_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='user_likes_user_id_fkey'),
    sa.PrimaryKeyConstraint('user_id', 'review_id', name='user_likes_pkey')
    )
    # ### end Alembic commands ###
