from flask import Blueprint, request
from app.models import Answer, Question, Reaction, db, Search
from flask_login import current_user, login_user, logout_user, login_required


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


@search_routes.route('/', methods=["GET"])
@login_required
def get_search_history():
    searches = Search.query.filter(
        Search.user_id == current_user.id
    )
    final = {'searches': [search.to_dict() for search in searches]}
    return final
