from flask import Blueprint,request
from sqlalchemy import insert,update
from app.models import Question,db


questions_routes = Blueprint("questions", __name__)

@questions_routes.route("/<int:id>", methods=["GET"])
def get_question(id):
    desired_question = Question.query.get(id)
    return desired_question.to_dict()


@questions_routes.route("/<int:id>", methods=["PUT"])
def edit_question(id):
    desired_question_data = request.form


    if (desired_question_data):
        desired_question = Question.query.get(id)

        desired_question.question =  desired_question_data.question or desired_question.question
        desired_question.detail =  desired_question_data.detail or desired_question.detail
        desired_question.url =  desired_question_data.url or desired_question.url

        db.session.commit()

        return desired_question.to_dict()
    return "no data (error)"

#! this route gives us an issue with the answers model
@questions_routes.route("/<int:id>", methods=["DELETE"])
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


#! We can't test this route yet because we have no form
@questions_routes.route("/", methods=["POST"])
def post_question():

    desired_question_data = request.form
    desired_question = Question(question=desired_question_data.question,detail=desired_question_data.detail,url=desired_question_data.url,user_id=desired_question_data.user_id)
    db.session.add(desired_question)
    db.session.commit()
    return desired_question.to_dict()
