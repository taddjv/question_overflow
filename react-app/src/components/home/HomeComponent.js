import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getTheQuestions } from "../../store/question";
import Question from "../Question";
import SideBarComponent from "../sideBar/SideBarComponent";
import SideBar from "../sideBar/SideBar";

function HomeComponent() {
  // const history = useHistory()
  // const dispatch = useDispatch()
  // const questions = useSelector(state => state.questions)
  // console.log(questions)

  // useEffect(() => {
  //   dispatch(getTheQuestions())
  // },[dispatch])

  return (
    <div className="home_container">
      <div className="home">
        <SideBar/>
      <Question />
      </div>
    </div>
  );
}

export default HomeComponent;
