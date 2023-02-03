import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as answerActions from "../../store/answer";

function Answer() {
  const dispatch = useDispatch();
  const allAnswers = useSelector((state) => state.answers);

  return <div className="title"> Answer</div>;
}

export default Answer;
