from flask import Blueprint,request
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



@reaction_routes.route("/answers/<int:id>", methods=["POST"])
@login_required
def post_upvote_reaction(id):

    current_answer=Answer.query.get(id)
    reaction_check=Reaction.query.filter(
        Reaction.answer_id.like(current_answer),
        Reaction.user_id.like(current_answer.id)
    )
    #check for user id in specific answers reaction, in reaction table
    # query = Reaction.query(User).filter(
    # User.firstname.like(search_var1),
    # User.lastname.like(search_var2)
    # )


    if reaction_check:
        
        return
