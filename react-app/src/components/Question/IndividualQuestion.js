// import React, { useEffect } from "react";
import QuizIcon from "@mui/icons-material/Quiz";
import { NavLink } from "react-router-dom";

function IndividualQuestion({
  id,
  questionTitle,
  detail,
  url,
  dateCreated,
  user,
  questionId,
  answers,
}) {
  return (
    <>
      <NavLink className="question-nav" to={`/questions/${id}`}>
        <div className="question-content">
          <div className="q-c-logo">
            {(
              <img src={user.profile_url} alt="" className="profile-logo-icon" />
            ) || (
              <QuizIcon fontSize="large" className="q-c-logo-icon"></QuizIcon>
            )}
          </div>
          <div className="q-c-title">
            <div className="q-c-t-q">{questionTitle}</div>
            <div className="q-c-t-d">{detail}</div>
          </div>
          <div className="q-c-answers">
            <span>{answers.length}</span>
          </div>
          <div className="q-c-author">
            <div className="q-c-a-user">
              by <span className="q-c-a-user1">{user.username}</span>
            </div>
            <div className="q-c-a-date">{dateCreated}</div>
          </div>
          <div className="q-c-latest-answer">
            {answers.length ? (
              <>
                <div className="q-c-a-user">
                  Re:<span className="q-c-a-user1">{answers[0].answer}</span>
                </div>
                <div className="q-c-a-date">{answers[0].dateCreated}</div>
              </>
            ) : null}
          </div>
        </div>
      </NavLink>
    </>
  );
}

export default IndividualQuestion;
