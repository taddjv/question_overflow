"""empty message

<<<<<<<< HEAD:migrations/versions/20230209_163149_.py
Revision ID: 8aabf1443502
Revises: 
Create Date: 2023-02-09 16:31:49.653260
========
Revision ID: eb9a16009c0c
Revises: 
Create Date: 2023-02-09 10:34:21.320373
>>>>>>>> 55170922efd8410adcc807001b532fa2d94b5a4e:migrations/versions/20230209_103421_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/20230209_163149_.py
revision = '8aabf1443502'
========
revision = 'eb9a16009c0c'
>>>>>>>> 55170922efd8410adcc807001b532fa2d94b5a4e:migrations/versions/20230209_103421_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('profile_url', sa.String(length=255), nullable=True),
    sa.Column('dateCreated', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('questions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('question', sa.String(length=1000), nullable=False),
    sa.Column('detail', sa.String(length=2000), nullable=True),
    sa.Column('url', sa.String(length=255), nullable=True),
    sa.Column('dateCreated', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('searches',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('search', sa.String(length=255), nullable=False),
    sa.Column('dateCreated', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('answers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('answer', sa.String(length=2000), nullable=True),
    sa.Column('url', sa.String(length=255), nullable=True),
    sa.Column('dateCreated', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('question_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['question_id'], ['questions.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reactions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('up_vote', sa.Boolean(), nullable=True),
    sa.Column('down_vote', sa.Boolean(), nullable=True),
    sa.Column('dateCreated', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('answer_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['answer_id'], ['answers.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reactions')
    op.drop_table('answers')
    op.drop_table('searches')
    op.drop_table('questions')
    op.drop_table('users')
    # ### end Alembic commands ###