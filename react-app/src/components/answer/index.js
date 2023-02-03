import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useParams, useHistory } from "react-router-dom";
import * as answerActions from "../../store/answer";
import * as reactionActions from "../../store/reaction";
//import answer.css

function Answer() {
  const dispatch = useDispatch();

  const allAnswers = useSelector((state) => state.answers);

  useEffect(() => {
    dispatch(answerActions.getTheAnswers());
  }, [dispatch]);

  return <div className="title"> Answer</div>;
}

export default Answer;
