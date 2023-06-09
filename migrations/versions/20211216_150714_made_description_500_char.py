"""made description 500 char

Revision ID: 29671d9786a4
Revises: 42dd79b10bff
Create Date: 2021-12-16 15:07:14.756291

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '29671d9786a4'
down_revision = '42dd79b10bff'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('listings', 'description',
               existing_type=sa.VARCHAR(length=300),
               type_=sa.String(length=500),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('listings', 'description',
               existing_type=sa.String(length=500),
               type_=sa.VARCHAR(length=300),
               existing_nullable=True)
    # ### end Alembic commands ###
