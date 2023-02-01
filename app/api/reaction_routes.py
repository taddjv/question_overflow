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

    # current_answer = Answer.query.get(id)
    reaction_check = Reaction.query.filter(
        Reaction.answer_id == id,
        Reaction.user_id == current_user.id

        #! testing variables
        # Reaction.answer_id == 3,
        # Reaction.user_id == 1

    ).first()
    # print(reaction_check, ' <------')
    # print(current_user.id, ' <-----')

    if reaction_check:
        if reaction_check.up_vote == True:
            reaction_check.up_vote = False
            reaction_check.down_vote = True
            db.session.commit()
            return "downVoted"
        else:
            reaction_check.up_vote = True
            reaction_check.down_vote = False
            db.session.commit()
            return "upVoted"
    else:
        new_vote = Reaction(answer_id=id,
                            user_id=current_user.id, up_vote=True, down_vote=False)
        db.session.add(new_vote)
        db.session.commit()
        return "added upVote reaction to db"


@reaction_routes.route("/answers/<int:id>/down-vote", methods=["POST"])
@login_required
def post_downvote_reaction(id):

    reaction_check = Reaction.query.filter(
        Reaction.answer_id == id,
        Reaction.user_id == current_user.id
    ).first()

    if reaction_check:
        if reaction_check.down_vote == True:
            reaction_check.down_vote = False
            reaction_check.up_vote = True
            db.session.commit()
            return "upVoted"
        else:
            reaction_check.down_vote = True
            reaction_check.up_vote = False
            db.session.commit()
            return "downVoted"
    else:
        new_vote = Reaction(answer_id=id,
                            user_id=current_user.id, up_vote=False, down_vote=True)
        db.session.add(new_vote)
        db.session.commit()
        return "added downVote reaction to db"


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
