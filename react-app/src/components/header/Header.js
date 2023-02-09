import React, { useState, useEffect } from "react";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
// import { useUser } from "../../context/userContext";
import * as searchesActions from "../../store/search";
import * as sessionActions from "../../store/session";

import AskQuestionModal from "../Question/AskQuestionModal/index";

import LogoutMenu from "./logout/LogoutMenu";
import LoginMenu from "./login/LoginMenu";

function Header() {
  const user = useSelector((state) => state.session);
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleDemoLogin = (e) => {
    let email = "demo@aa.io";
    let password = "password";
    e.preventDefault();
    dispatch(sessionActions.login(email, password));
    history.push("/");
  };

  const search = (e) => {
    e.preventDefault();
    dispatch(searchesActions.getTheSearch(searchQuery)).then(() =>
      history.push(`/search/questions/${searchQuery}`)
    );
    setSearchQuery("");
  };

  useEffect(() => {
    dispatch(sessionActions.authenticate());
  }, [dispatch]);

  let currentSession;

  if (user.user) {
    currentSession = (
      <div className="header">
        <div className="header_left">
          <NavLink className="header_homeLink" to="/">
            <h1 className="header_question">Question</h1>
            <h1 className="header_overflow">
              <em>overflow</em>
            </h1>
          </NavLink>
        </div>

        <div className="header_center">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            className="search_input"
            type="search"
            name="q"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for questions ..."
          />
           <button className="header_search_button" onClick={search}>Search</button>
        </div>

        <AskQuestionModal />

        <div className="header_right">
          {user.user.username}
          <LoginMenu />
        </div>
      </div>
    );
  } else {
    currentSession = (
      <div className="header">
        <div className="header_left">
          <NavLink className="header_homeLink" to="/">
            <h1 className="header_question">Question</h1>
            <h1 className="header_overflow">
              <em>overflow</em>
            </h1>
          </NavLink>
        </div>


        <button className='demo_login_button'onClick={handleDemoLogin}>Demo Login</button>

        <div className="header_center">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            className="search_input"
            type="search"
            name="q"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for questions ..."
          />
          <button className="header_search_button" onClick={search}>Search</button>
        </div>
        {/* <AskQuestionModal /> */}

        <div className="header_right">
          <LogoutMenu />
        </div>
      </div>
    );
  }

  return currentSession;
}

export default Header;
