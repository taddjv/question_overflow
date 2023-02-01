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


#! need to clarify what type of data is coming in to search (from form etc...)
@search_routes.route('/', methods=["POST"])
@login_required
def post_search():
    form = SearchForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_search = Search(user_id=current_user.id,
                            search=form.data['search'])
        db.session.add(new_search)
        db.session.commit()

        questions = Question.query.like(f'%{form.data['search']}%')
        final = {'questions': [question.to_dict() for question in questions]}
        return final

    return "added search to db"
