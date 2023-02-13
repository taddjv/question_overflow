from flask import Blueprint, request, redirect
from app.models import Answer, Question, Reaction, db
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy import inspect


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

def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}

def quest_ans_formatter(inputs):
    final = {"reactions": []}

    for input in inputs:
        final_input = object_as_dict(input)
        reactions = []
        user = object_as_dict(input.user)

        for reaction in input.reaction:
            reactions.append(object_as_dict(reaction))
        final_input["answer_id"] = reactions
        final_input["user_id"] = user
        final["reactions"].append(final_input)

    return final

@reaction_routes.route('/answers/<int:id>', methods=['GET'])
@login_required
def get_answer_reactions(id):
    print('hit the routes')
    answer_reactions = Reaction.query.filter(
        Reaction.answer_id == id
    ).all()
    print(answer_reactions, ' <--- from the reaction routes')
    return quest_ans_formatter(answer_reactions)

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
    # return 'hello from backend'
    if reaction_check:
        if reaction_check.up_vote == True:
            reaction_check.up_vote = False
            # reaction_check.down_vote = True
            db.session.delete(reaction_check)
            db.session.commit()
            # print("deleted upVote from db")
            return {"message": "deleted upVote from db"}
        elif reaction_check.up_vote == False:
            reaction_check.up_vote = True
            reaction_check.down_vote = False
            db.session.commit()
            # print("upVoted")
            return {"message": "upVoted"}
    else:
        new_vote = Reaction(answer_id=id,
                            user_id=current_user.id, up_vote=True, down_vote=False)
        db.session.add(new_vote)
        db.session.commit()
        # print("added upVote reaction to db")
        return {"message": "added upVote reaction to db"}


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
            # reaction_check.up_vote = True
            db.session.delete(reaction_check)
            db.session.commit()

            return {"message": "deleted downVote from db"}
        elif reaction_check.down_vote == False:
            reaction_check.down_vote = True
            reaction_check.up_vote = False
            db.session.commit()
            return {"message": "downVoted"}
    else:
        new_vote = Reaction(answer_id=id,
                            user_id=current_user.id, up_vote=False, down_vote=True)
        db.session.add(new_vote)
        db.session.commit()
        return {"message": "added downVote reaction to db"}


@reaction_routes.route('/answers/<int:id>/up-votes')
@login_required
def get_all_up_votes(id):

    reaction_check = Reaction.query.filter(
        Reaction.answer_id == id,
        Reaction.up_vote == True
    )
    return {"reactions":[object_as_dict(reaction) for reaction in reaction_check]}

@reaction_routes.route('/answers/<int:id>/down-votes')
@login_required
def get_all_down_votes(id):
    reaction_check = Reaction.query.filter(
        Reaction.answer_id == id,
        Reaction.down_vote == True
    )

    return {"reactions":[object_as_dict(reaction) for reaction in reaction_check]}
