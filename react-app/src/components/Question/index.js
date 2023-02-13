import React, { useEffect } from "react";
// import IndividualQuestion from "./IndividualQuestion";
import { useDispatch, useSelector } from "react-redux";
// import { useUser } from "../../context/userContext";
import { renderQuestions } from "../../helper/questionHelper";
import * as questionActions from "../../store/question";
import "./Question.css";

function Question() {
  const dispatch = useDispatch();

  const allQuestion = useSelector((state) => state.questionsReducer);

  useEffect(() => {
    dispatch(questionActions.getTheQuestions());
  }, [dispatch]);

  return (
    <div className="question-container">
      <div className="question-title">
        <div></div>
        <div className="q-t-title">Questions</div>
        <div className="q-t-answers">Answers</div>
        <div className="q-t-author">Author</div>
        <div className="q-t-latest-answer">Latest Answer</div>
      </div>
      <div className="question-body">
        {allQuestion.allQuestions
          ? renderQuestions(allQuestion.allQuestions)
          : null}
      </div>
    </div>
  );
}

export default Question;
