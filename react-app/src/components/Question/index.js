import React, { useState, useEffect } from "react";
import IndividualQuestion from "./IndividualQuestion";
import { useDispatch, useSelector } from "react-redux";
import * as questionActions from "../../store/question";

function Question() {
  const dispatch = useDispatch();
  const allQuestions = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(questionActions.getTheQuestions()).then(() => {
      console.log(allQuestions);
    }, []);
  });
  return (
    <div className="question-container">
      <div className="question-title">
        <div className="q-t-title">Questions</div>
        <div className="q-t-answers"># Answers</div>
        <div className="q-t-author">Author</div>
        <div className="q-t-latest-answer">Latest Answer</div>
      </div>
      <div className="question-body"></div>
    </div>
  );
}

export default Question;
