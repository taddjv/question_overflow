import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./PopularQuestions.css";
import { renderQuestions } from "../../../../helper/questionHelper";
import * as answerActions from "../../../../store/answer";
import * as questionActions from "../../../../store/question";
import * as sessionActions from "../../../../store/session";
import IndividualAnswer from "../../../answer/IndividualAnswer";

function PopularQuestions() {
  const dispatch = useDispatch();
  const allquestions = useSelector(
    (state) => state.questionsReducer.question.questions
  );

  let orderQuestions = [];
  return <>Popular question under construction</>;
}

export default PopularQuestions;
