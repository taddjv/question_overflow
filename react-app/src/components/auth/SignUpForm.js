import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      // const data = await dispatch(signUp(username, email, password));
      return setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    } else if (!username || !email || !password) {
      return setErrors(["Username, Email and Password fields are required"]);
    } else {
      const data = await dispatch(signUp(username, email, password)).then(
        async (res) => {
          const data = await res;

          if (data) {
            const newErrors = res.map((ele) => {
              return ele.slice(ele.indexOf(":") + 2);
            });
            setErrors(newErrors);
          }
        }
      );
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signUpBody">
      <form className="signUp_form" onSubmit={onSignUp}>
        <div className="signup_logo">
          <h1 className="signup_question">Question</h1>
          <h1 className="signup_overflow">
            <em>overflow</em>
          </h1>
        </div>
        <h1 className="signup_signupform">SignUp</h1>
        {errors.map((error, ind) => (
          <div className="signup_error" key={ind}>
            {error}
          </div>
        ))}

        <label>
          <div className="signup_label">Username</div>
          <input
            type="text"
            className="signup_username"
            name="username"
            size="30"
            onChange={updateUsername}
            value={username}
          />
        </label>

        <label>
          <div className="signup_label">Email</div>
          <input
            type="text"
            className="signup_email"
            name="email"
            size="30"
            onChange={updateEmail}
            value={email}
          />
        </label>

        <label>
          <div className="signup_label">Password</div>
          <input
            className="signup_password"
            type="password"
            name="password"
            size="30"
            onChange={updatePassword}
            value={password}
          />
        </label>

        <label>
          <div className="signup_label">Confirm Password</div>
          <input
            className="signup_repeate_password"
            type="password"
            name="repeat_password"
            size="30"
            onChange={updateRepeatPassword}
            value={repeatPassword}
          />
        </label>

        <div className="signup_button_div">
          <button className="signup_button" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
