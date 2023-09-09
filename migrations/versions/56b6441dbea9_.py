"""empty message

Revision ID: 56b6441dbea9
Revises: 31de1434f3b6
Create Date: 2023-09-08 20:28:17.381576

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '56b6441dbea9'
down_revision = '31de1434f3b6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('company_admin',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('admin_id', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('admin_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('company_admin')
    # ### end Alembic commands ###
