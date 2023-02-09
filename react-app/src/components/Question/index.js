import React, { useEffect } from "react";
import IndividualQuestion from "./IndividualQuestion";
import { useDispatch, useSelector } from "react-redux";
// import { useUser } from "../../context/userContext";
import * as questionActions from "../../store/question";
import "./Question.css";

function Question() {
  const dispatch = useDispatch();
  const allQuestions = useSelector((state) => state.questionsReducer.question);
  // const { user, setUser } = useUser();

  useEffect(() => {
    dispatch(questionActions.getTheQuestions());
  }, [dispatch]);

  const content =
    allQuestions && Array.isArray(allQuestions.questions)
      ? allQuestions.questions.map((ele, i) => {
          return (
            <>
              <IndividualQuestion
                id={ele.id}
                questionTitle={ele.question}
                detail={ele.detail}
                url={ele.url}
                dateCreated={ele.dateCreated}
                user={ele.user}
                questionId={ele.id}
                answers={ele.answers}
                key={ele.id}
              />
            </>
          );
        })
      : null;

  return (
    <div className="question-container">
      <div className="question-title">
        <div></div>
        <div className="q-t-title">Questions</div>
        <div className="q-t-answers">Answers</div>
        <div className="q-t-author">Author</div>
        <div className="q-t-latest-answer">Latest Answer</div>
      </div>
      <div className="question-body">{content}</div>
    </div>
  );
}

export default Question;
