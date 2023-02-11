from flask import Blueprint, request
from app.models import Answer, Question, db
from app.forms import AnswerForm
from sqlalchemy import inspect
from flask_login import current_user, login_user, logout_user, login_required


answer_routes = Blueprint("answers", __name__)


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


def ans_reactions_formatter(inputs):
    final = {"answers": []}
    for input in inputs:
        final_input = object_as_dict(input)
        reactions = []
        user = object_as_dict(input.user)
        for reaction in input.reactions:
            reactions.append(object_as_dict(reaction))
        final_input["reactions"] = reactions
        final_input["user"] = user

        final["answers"].append(final_input)
    return final


@answer_routes.route("/<int:id>", methods=["GET"])
def get_answer(id):
    desired_answer = Answer.query.get(id)
    return desired_answer.to_dict()


@answer_routes.route("/questions/<int:id>", methods=["GET"])
def get_all_answers(id):

    answers = Answer.query.filter(Answer.question_id == id)

    # final = {'answers': [answer.to_dict() for answer in answers]}
    return ans_reactions_formatter(answers)


@answer_routes.route("/count", methods=["GET"])
def answer_count():
    count = Answer.query.count()
    return str(count)


@answer_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_answer(id):

    form = AnswerForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        desired_answer = Answer.query.get(id)
        if desired_answer.user_id == current_user.id:
            desired_answer.answer = form.data["answer"]
            desired_answer.url = form.data["url"]

            db.session.commit()

            return desired_answer.to_dict()
        else:
            return {"message": "You are not the author of this answer"}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@answer_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_answer(id):
    desired_answer = Answer.query.get(id)
    if desired_answer.user_id == current_user.id:
        db.session.delete(desired_answer)
        db.session.commit()
        return {"message": "answer successfully deleted"}
    else:
        return {"message": "You are not allow to delete this answer"}


@answer_routes.route("/questions/<int:id>", methods=["POST"])
@login_required
def post_answer(id):

    selected_question = Question.query.get(id)

    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        desired_answer = Answer(answer=form.data['answer'], url=form.data["url"],
                                user_id=current_user.id, question_id=selected_question.id)
        db.session.add(desired_answer)
        db.session.commit()
        return desired_answer.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
