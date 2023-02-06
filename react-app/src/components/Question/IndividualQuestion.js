import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/user";
import { NavLink } from "react-router-dom";

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
      <div className="q-c-a-user">by {user.user.username}</div>
      <div className="q-c-a-date">{dateCreated}</div>
    </>
  ) : null;

  // const handleClick= (e) => {
  //   e.preventDefault()
  // } use to prevent some rendering issue

  return (
    //!add new route to answers to count the answers per question
    <>
      <NavLink className="question-content" to={`/questions/${id}`}>
        <div className="q-c-logo"></div>
        <div className="q-c-title-">
          <div className="q-c-t-q">{questionTitle}</div>
          <div className="q-c-t-d">{detail}</div>
        </div>
        <div className="q-c-answers">0</div>
        <div className="q-c-author">{userContent}</div>
        <div className="q-c-latest-answer">Latest Answer</div>
      </NavLink>
    </>
  );
}

export default IndividualQuestion;
