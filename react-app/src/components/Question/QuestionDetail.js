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
      <div className="question-container">
        <div className="question-title">
         question title
          {/* <div className="q-t-title">Question</div> */}
          <div className="q-t-answers">
            Answers
            {/* <div className="q-c-answers">{answersCount}</div> */}
          </div>
          <div className="q-t-author">
            Author
            <div className="q-t-author">question author</div>
          </div>
          <div className="q-t-latest-answer">
            Latest Answer
            <div className="q-c-answers">"render last username"</div>
          </div>
        </div>
        {/* <div className="question-body">{content}</div> */}
      </div>
      <div className="question-container">
        <div className="q-c-logo"></div>
        <div className="q-c-title-">
          {/* <div className="q-c-t-q">{question.question}</div> */}
          <div className="q-c-t-d">detail</div>
        </div>

        {/* <div className="q-c-author">{user.username}</div> */}
        <div className="q-c-latest-answer">Latest Answer</div>
      </div>
      <div className="all-answer-container">
        
        <div className="individual-answer">
          Mapped answer component
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
