from flask import Blueprint, request
from app.models import Question, Search, db
from app.forms import SearchForm
from flask_login import current_user, login_required

search_routes = Blueprint("searches", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


#!didn't test this route because i'm not sure how to login on postman
@search_routes.route("/questions/<query>", methods=["GET"])
def get_results(query):
    if (current_user.is_authenticated):
        desired_search = Search(search=query, user_id=current_user.id)
        db.session.add(desired_search)
        db.session.commit()
    results = Question.query.filter(Question.question.contains(query))
    final = {"results": [result.to_dict() for result in results]}
    return final


@search_routes.route("/user/<int:id>", methods=["GET"])
def get_user_searches(id):
    results = Search.query.filter(Search.user_id == id)
    final = {"results": [result.to_dict() for result in results]}
    return final


@search_routes.route('/', methods=["DELETE"])
@login_required
def clear_search():
    searches = Search.query.filter(Search.user_id == current_user.id)
    if len(list(searches)) == 0:
        return {"message": "No history to clear"}
    if searches:
        for search in searches:
            db.session.delete(search)
            db.session.commit()
        return {"message": "Search History Cleared"}
