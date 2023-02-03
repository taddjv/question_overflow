import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getTheQuestions } from "../../store/question";
import Question from "../Question";

function HomeComponent() {
  // const history = useHistory()
  // const dispatch = useDispatch()
  // const questions = useSelector(state => state.questions)
  // console.log(questions)

  // useEffect(() => {
  //   dispatch(getTheQuestions())
  // },[dispatch])

  return (
    <div>
      <Question />
    </div>
  );
}

export default HomeComponent;
