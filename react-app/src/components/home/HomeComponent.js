// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import { getTheQuestions } from "../../store/question";
import Question from "../Question";
import Search from "../Search";
import SideBarComponent from "../sideBar/SidebarRow";
// import SideBar from "../sideBar/SideBar";

function HomeComponent({ type }) {
  // const history = useHistory()
  // const dispatch = useDispatch()
  // const questions = useSelector(state => state.questions)

  // useEffect(() => {
  //   dispatch(getTheQuestions())
  // },[dispatch])

  return (
    <div className="home_container">
      <div className="home">
        <SideBarComponent />
        {type === "home" ? <Question /> : type === "search" ? <Search /> : null}
      </div>
    </div>
  );
}

export default HomeComponent;
