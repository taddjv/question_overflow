import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
// import NavBar from './components/NavBar';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import Header from "./components/header/Header";
import HomeComponent from "./components/home/HomeComponent";
import SideBar from "./components/sideBar/SideBar";
import './App.css'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>

      <div className="app_body">
        <div className="sidebar_body">
            <SideBar/>
        </div>

        <div className="inner_body">

        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <HomeComponent />
        </Route>
        </div>
      </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
