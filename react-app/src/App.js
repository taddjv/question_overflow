import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
// import NavBar from './components/NavBar';
// import ProtectedRoute from "./components/auth/ProtectedRoute";
// import UsersList from "./components/UsersList";
// import User from "./components/User";
import { authenticate } from "./store/session";
import Header from "./components/header/Header";
import HomeComponent from "./components/home/HomeComponent";
import SideBar from "./components/sideBar/SideBar";
import "./App.css";
import QuestionDetail from "./components/Question/QuestionDetail";
import { useUser } from "./context/userContext";
import PopularQuestions from "./components/sideBar/SidebarLinks/PopularQuestions/PopularQuestions";
import NewestQuestion from "./components/sideBar/SidebarLinks/NewestQuestion/NewestQuestion";
import MostHated from "./components/sideBar/SidebarLinks/MostHated/MostHated";
// import Search from "./components/Search";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const { user, setUser } = useUser(); // global useState

  useEffect(() => {
    (async () => {
      let loggedInUser = await dispatch(authenticate());
      setUser(loggedInUser);
      setLoaded(true);
    })();
  }, [dispatch, setUser]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <Switch>
          <Route exact path="/login">
            <LoginForm />
          </Route>

          <Route exact path="/sign-up">
            <SignUpForm />
          </Route>

          <div className="app_body">
            {/* <SideBar/> */}

            <Route exact path="/">
              <HomeComponent type="home" />
            </Route>

            <Route path="/questions/:id">
              <QuestionDetail />
            </Route>

            {/* <ProtectedRoute path="/users" exact={true}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User/>
        </ProtectedRoute> */}

            <Route path="/search/questions/:searchQuery" exact={true}>
              <HomeComponent type="search" />
            </Route>

            {/* <Route exact path='/questions/popular'>
          <PopularQuestions/>
        </Route>

        <Route exact path='/questions/newest'>
          <NewestQuestion/>
        </Route>

        <Route exact path='/questions/hated'>
          <MostHated/>
        </Route> */}
          </div>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
