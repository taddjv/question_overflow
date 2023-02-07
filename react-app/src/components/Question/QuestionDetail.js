import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { UserContext, useUser } from "../../context/userContext";
import * as answerActions from "../../store/answer";
import * as questionActions from "../../store/question";
import IndividualAnswer from "../answer/IndividualAnswer";
import "./QuestionDetail.css";

function QuestionDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const answers = useSelector((state) => state.answersReducer.answer);
  const question = useSelector((state) => state.questionsReducer.question);


  useEffect(() => {
    dispatch(questionActions.getTheQuestion(id));
    dispatch(answerActions.getTheAnswers(id));

    // dispatch(answerActions.getTheAnswersCount());
  }, []);

//TODO IMPLEMENT JOIN TABLES QUESTIONID AND USER
  return (
    <>
     { question &&
      answers &&
      <>
      <div className="individual-question-container">

        <div className="user-timestamp-question-con">

          <div className="username-timestamp">
            <div className="ind-ques-username">Demo asks</div>
            <div className="ind-ques-timestamp">Posted on Oct 3rd, 1993</div>
          </div>

          <div className="ind-ques-title">Question title goes here
          Question title goes here Question title goes here Question title goes here?
          </div>

        </div>

        <div className="ind-ques-body">Question Body goes here Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        <div className="ind-ques-image"> Optional image goes here</div>
        <div className="ind-ques-cruds">
          <button className="edit-button">edit</button>
          <button className="delete-button">delete</button>

        </div>

      </div>



      <div className="all-answer-container">

        <div className="individual-answer">
          REPLIES
          {answers
        ? answers.answers.map((ele, i) => {
            return (
              <>
                <IndividualAnswer
                  id={ele.id}
                  answer={ele.answer}
                  question_id={ele.question_id}
                  user_id={ele.user_id}
                  url={ele.url}
                  dateCreated={ele.dateCreated}
                />
              </>
            );
          })
        : null}
        </div>
      </div>
    </>
    }
    </>

  )

}

export default QuestionDetail;
