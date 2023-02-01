from flask import Blueprint, request
from app.models import Answer, Question, Reaction, db
from flask_login import current_user, login_user, logout_user, login_required


reaction_routes = Blueprint("reactions", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@reaction_routes.route("/answers/<int:id>/up-vote", methods=["POST"])
@login_required
def post_upvote_reaction(id):

    current_answer = Answer.query.get(id)
    reaction_check = Reaction.query.filter(
        # Reaction.answer_id.like(current_answer.id),
        # Reaction.user_id.like(current_answer.user_id)

        Reaction.answer_id == current_answer.id,
        Reaction.user_id == current_answer.user_id
    ).one()

    if reaction_check:
        if reaction_check.up_vote == True:
            reaction_check.up_vote = False
            db.session.commit()
            return "upVote removed"
        else:
            reaction_check.up_vote = True
            db.session.commit()
            return "upVoted"


@reaction_routes.route("/answers/<int:id>/down-vote", methods=["POST"])
@login_required
def post_downvote_reaction(id):

    current_answer = Answer.query.get(id)
    reaction_check = Reaction.query.filter(
        # Reaction.answer_id.like(current_answer.id),
        # Reaction.user_id.like(current_answer.user_id)

        Reaction.answer_id == current_answer.id,
        Reaction.user_id == current_answer.user_id
    ).one()

    if reaction_check:
        if reaction_check.up_vote == True:
            reaction_check.up_vote = False
            db.session.commit()
            return "downVote removed"
        else:
            reaction_check.up_vote = True
            db.session.commit()
            return "downVoted"


@reaction_routes.route('/answers/<int:id>/up-votes')
@login_required
def get_all_up_votes(id):
    current_answer = Answer.query.get(id)
    reaction_check = Reaction.query.filter(
        Reaction.answer_id == current_answer.id,
        Reaction.up_vote == True
    ).count()

    return str(reaction_check)


@reaction_routes.route('/answers/<int:id>/down-votes')
@login_required
def get_all_down_votes(id):
    current_answer = Answer.query.get(id)
    reaction_check = Reaction.query.filter(
        Reaction.answer_id == current_answer.id,
        Reaction.down_vote == True
    ).count()

    return str(reaction_check)
