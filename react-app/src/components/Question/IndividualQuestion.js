import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/user";
import { NavLink } from "react-router-dom";

import QuizIcon from "@mui/icons-material/Quiz";

function IndividualQuestion({
  id,
  questionTitle,
  detail,
  url,
  dateCreated,
  user_id,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.usersReducer);

  useEffect(() => {
    dispatch(userActions.getTheUser(user_id));
  }, []);

  const userContent = user.user ? (
    <>
      <div className="q-c-a-user">
        by <span className="q-c-a-user1">{user.user.username}</span>
      </div>
      <div className="q-c-a-date">{dateCreated}</div>
    </>
  ) : null;

  // const handleClick= (e) => {
  //   e.preventDefault()
  // } use to prevent some rendering issue

  return (
    //!add new route to answers to count the answers per question
    <>
      <div className="question-content">
        <div className="q-c-logo">
          <QuizIcon className="q-c-logo-icon"></QuizIcon>
        </div>
        <div className="q-c-title">
          <div className="q-c-t-q">{questionTitle}</div>
          <div className="q-c-t-d">{detail}</div>
        </div>
        <div className="q-c-answers">
          <span>0</span>
        </div>
        <div className="q-c-author">{userContent}</div>
        <div className="q-c-latest-answer">Latest Answer</div>
      </NavLink>
    </>
  );
}

export default IndividualQuestion;
