import React, { useState, useEffect } from "react";
import IndividualQuestion from "./IndividualQuestion";
import { useDispatch, useSelector } from "react-redux";
import * as questionActions from "../../store/question";
import './index.css'

function Question() {
  const dispatch = useDispatch();
  const allQuestions = useSelector((state) => state.questionsReducer.question);

  useEffect(() => {
    dispatch(questionActions.getTheQuestions());
  }, []);

  const content = allQuestions
    ? allQuestions.questions.map((ele) => {
        return (
          <>
            {" "}
            <IndividualQuestion
              questionTitle={ele.question}
              detail={ele.detail}
              url={ele.url}
              dateCreated={ele.dateCreated}
              //   user_id={ele.user_id}
            />
            <div className="username-test">{ele.username}</div>
          </>
        );
      })
    : null;
  return (
    <div className="question-container">
      <div className="question-title">
        <div className="q-t-title">Questions</div>
        <div className="q-t-answers"># Answers</div>
        <div className="q-t-author">Author</div>
        <div className="q-t-latest-answer">Latest Answer</div>
      </div>
      <div className="question-body">{content}</div>
    </div>
  );
}

export default Question;
