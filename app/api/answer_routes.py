from flask import Blueprint,request
from app.models import Answer, Question, db
from app.forms import AnswerForm
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


@answer_routes.route("/<int:id>", methods=["GET"])
def get_answer(id):
    desired_answer = Answer.query.get(id)
    return desired_answer.to_dict()


@answer_routes.route("/questions/<int:id>", methods=["GET"])
def get_all_answers(id):

    answers = Answer.query.filter(Answer.question_id==id)

    final = {'answers': [answer.to_dict() for answer in answers]}
    return final



@answer_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_answer(id):

    form=AnswerForm()


    if (form.data):
        desired_answer = Answer.query.get(id)

        desired_answer.answer =  form.data["answer"] or desired_answer.answer
        desired_answer.url =  form.data["url"] or desired_answer.url

        db.session.commit()

        return desired_answer.to_dict()
    return "no data (error)"


@answer_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_answer(id):
    desired_answer = Answer.query.get(id)
    db.session.delete(desired_answer)
    db.session.commit()
    return {"message":"answer successfully deleted"}


@answer_routes.route("/questions/<int:id>", methods=["POST"])
@login_required
def post_answer(id):

    selected_question=Question.query.get(id)

    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        desired_answer = Answer(answer=form.data['answer'],url=form.data["url"],user_id=current_user.id, question_id=selected_question.id)
        db.session.add(desired_answer)
        db.session.commit()
        return desired_answer.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
