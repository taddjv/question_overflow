from flask import Blueprint,request
from app.models import Question,db
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

@questions_routes.route("/<int:id>", methods=["GET"])
def get_question(id):
    desired_question = Question.query.get(id)
    return desired_question.to_dict()


@questions_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_question(id):

    form=QuestionForm()


    if form.data:
        desired_question = Question.query.get(id)

        desired_question.question =  form.data["question"] or desired_question.question
        desired_question.detail =  form.data["detail"] or desired_question.detail
        desired_question.url =  form.data["url"] or desired_question.url

        db.session.commit()

        return desired_question.to_dict()
    return "no data (error)"


@questions_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_question(id):
    desired_question = Question.query.get(id)
    db.session.delete(desired_question)
    db.session.commit()
    return {"message":"question successfully deleted"}


@questions_routes.route("/", methods=["GET"])
def get_all_questions():
    questions = Question.query.all()
    final = {'questions': [question.to_dict() for question in questions]}
    return final


@questions_routes.route("/", methods=["POST"])
@login_required
def post_question():

    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        desired_question = Question(question=form.data['question'],detail=form.data['detail'],url=form.data["url"],user_id=current_user.id)
        db.session.add(desired_question)
        db.session.commit()
        return desired_question.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
