import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom';
import {signUp} from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
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
    return <Redirect to='/'/>;
  }

  return (
    <div className='signUpBody'>

      <form className='signUp_form' onSubmit={onSignUp}>
          {errors.map((error, ind) => (
            <div key={ind}>
              {error}</div>
          ))}



        <div className='signup_logo'>
          <h1 className='signup_question'>Question</h1>
          <h1 className='signup_overflow'><em>overflow</em></h1>
        </div>
        <h1 className='signup_signupform'>SignUp</h1>


        <label>
          <div className='signup_label'>
            Username
          </div>
          <input
          type='text'
          className='signup_username'
          name='username'
          size='30'
          onChange={updateUsername}
          value={username}
          required={true}/>
        </label>


        <label>
          <div className='signup_label'>
            Email
          </div>
          <input
          type='text'
          className='signup_email'
          name='email'
          size='30'
          onChange={updateEmail}
          value={email}
          required={true}/>
        </label>


        <label>
          <div className='signup_label'>
            Password
          </div>
          <input
          className='signup_password'
          type='password'
          name='password'
          size='30'
          onChange={updatePassword}
          value={password}
          required={true}/>
        </label>


        <label>
          <div className='signup_label'>
            Repeat Password
          </div>
          <input
          className='signup_repeate_password'
          type='password'
          name='repeat_password'
          size='30'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}/>
        </label>

        <div className='signup_button_div'>
        <button className='signup_button'type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
