from flask import Blueprint,request
from sqlalchemy import insert,update
from app.models import Question

questions_routes = Blueprint("questions", __name__)

@questions_routes.route("/<int:id>", methods=["GET"])
def get_question(id):
    desired_question = Question.query.get(id)
    return {'questions': [question.to_dict() for question in desired_question]}

@questions_routes.route("/<int:id>", methods=["PUT"])
def edit_question(id):
    desired_question = Question.query.get(id)


@questions_routes.route("/", methods=["GET"])
def get_all_questions():
    questions = Question.query.all()
    return {'questions': [question.to_dict() for question in questions]}


@questions_routes.route("/", methods=["POST"])
def post_question():
    # desired_question_data = request.json()
    desired_question_data = request.form
    desired_question = (
        insert(Question).values(question=desired_question_data.question,detail=desired_question_data.detail,url=desired_question_data.url,user_id=desired_question_data.user_id)
    )
    return {desired_question.to_dict()}
