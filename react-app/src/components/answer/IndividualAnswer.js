import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useParams, useHistory } from "react-router-dom";
import * as answerActions from "../../store/answer";
import * as reactionActions from "../../store/reaction";
import usersReducer, * as userActions from "../../store/user";
//import answer.css

function IndividualAnswers({
  id,
  user_id,
  question_id,
  answer,
  url,
  dateCreated
}) {
  const dispatch = useDispatch();
  const answerAuthor = useSelector((state) =>state.usersReducer)
  console.log(answerAuthor, "ben-answer");

  useEffect(() => {
    dispatch(userActions.getTheUser(user_id))

  }, []);



      return (
        <>
      <div className="title">{answer}</div>
      <div className="title">{answerAuthor.user.username}</div>
      </>
      )
}

export default IndividualAnswers;
