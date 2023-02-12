import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password)).then(async (res) => {
      const newErrors = res?.map((ele) => {
        if (!ele.includes("No such")) {
          if (ele.includes("required")) {
            return (
              ele.slice(0, ele.indexOf(":")) + ele.slice(ele.indexOf(":") + 7)
            );
          } else {
            return ele.slice(ele.indexOf(":") + 2);
          }
        }
        
      });
      setErrors(newErrors);
    });
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="loginBody">
      <form className="login_form" onSubmit={onLogin}>
        <div className="login_logo">
          <h1 className="login_question">Question</h1>
          <h1 className="login_overflow">
            <em>overflow</em>
          </h1>
        </div>
        <h1 className="login_loginform">Login</h1>
        {errors.map((error, ind) => (
          <div className="login_error" key={ind}>
            {error}
          </div>
        ))}

        <label htmlFor="email">
          <div className="email">Email</div>
          <input
            className="email_input"
            name="email"
            size="30"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </label>

        <label htmlFor="password">
          <div className="password">Password</div>
          <input
            name="password"
            type="password"
            size="30"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
        </label>

        <div className="login_button_div">
          <button className="login_button" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
