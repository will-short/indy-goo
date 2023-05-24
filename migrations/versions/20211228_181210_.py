"""empty message

Revision ID: 40beeb5818f7
Revises: fad65fb08fe1
Create Date: 2021-12-28 18:12:10.759544

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '40beeb5818f7'
down_revision = 'fad65fb08fe1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('cart_listings_listing_id_fkey', 'cart_listings', type_='foreignkey')
    op.drop_constraint('cart_listings_user_id_fkey', 'cart_listings', type_='foreignkey')
    op.drop_column('cart_listings', 'user_id')
    op.drop_column('cart_listings', 'listing_id')
    op.alter_column('users', 'image_url',
               existing_type=sa.VARCHAR(length=255),
               type_=sa.String(length=260),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'image_url',
               existing_type=sa.String(length=260),
               type_=sa.VARCHAR(length=255),
               existing_nullable=True)
    op.add_column('cart_listings', sa.Column('listing_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('cart_listings', sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.create_foreign_key('cart_listings_user_id_fkey', 'cart_listings', 'users', ['user_id'], ['id'])
    op.create_foreign_key('cart_listings_listing_id_fkey', 'cart_listings', 'listings', ['listing_id'], ['id'])
    # ### end Alembic commands ###