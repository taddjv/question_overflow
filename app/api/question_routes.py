from flask import Blueprint, request
from app.models import Question, db, User, Answer
from sqlalchemy import inspect
from sqlalchemy.orm import joinedload

from app.forms import QuestionForm
from flask_login import current_user, login_user, logout_user, login_required


questions_routes = Blueprint("questions", __name__)


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
    final = {"questions": []}
    for input in inputs:
        final_input = object_as_dict(input)
        answers = []
        user = object_as_dict(input.user)
        for answer in input.answers:
            answers.append(object_as_dict(answer))
        final_input["answers"] = answers
        final_input["user"] = user

        final["questions"].append(final_input)
    return final


@questions_routes.route("/<int:id>", methods=["GET"])
def get_question(id):
    desired_question = Question.query.get(id)
    final_input = object_as_dict(desired_question)
    answers = []
    user = object_as_dict(desired_question.user)
    for answer in desired_question.answers:
        answers.append(object_as_dict(answer))
    final_input["answers"] = answers
    final_input["user"] = user

    #     final["questions"].append(final_input)
    return final_input


@questions_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_question(id):

    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        desired_question = Question.query.get(id)
        if desired_question.user_id == current_user.id:
            desired_question.question = form.data["question"]
            desired_question.detail = form.data["detail"]
            desired_question.url = form.data["url"]

            db.session.commit()

            return desired_question.to_dict()
        else:
            return {"message": "You are not allowed to edit this question"}
    return {'errors': validation_errors_to_error_messages(form.errors)}


@questions_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_question(id):
    desired_question = Question.query.get(id)
    if desired_question.user_id == current_user.id:
        db.session.delete(desired_question)
        db.session.commit()
        return {"message": "question successfully deleted"}
    else:
        return {"message": "you are not the author of this question"}


@questions_routes.route("/", methods=["GET"])
def get_all_questions():
    desired_question = db.session.query(Question).all()

    return quest_ans_formatter(desired_question)


@questions_routes.route("/", methods=["POST"])
@login_required
def post_question():
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        desired_question = Question(
            question=form.data['question'], detail=form.data['detail'], url=form.data["url"], user_id=current_user.id)
        # print(current_user.id, ' <------')
        db.session.add(desired_question)
        db.session.commit()
        return desired_question.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@questions_routes.route("/popular", methods=["GET"])
def get_popular_questions():
    questions = Question.query.filter(
        Answer.question_id).order_by(Answer.count())
    print(questions, ' <--- popular')
    return quest_ans_formatter(questions)
