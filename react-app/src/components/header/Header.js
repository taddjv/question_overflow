import React from 'react'
import './Header.css'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'


import LogoutMenu from './logout/LogoutMenu'
import LoginMenu from './login/LoginMenu'

function Header() {
  const sessionUser = useSelector(state => state.session.user)
  let currentSession;

if (sessionUser){
  currentSession = (
    <div className='header'>

    <div className='header_left'>
      {/* <NavLink className='header_homeLink' to='/'> */}
      <h1 className='header_question'>Question</h1>
      <h1 className='header_overflow'><em>overflow</em></h1>
      {/* </NavLink> */}
    </div>

  <div className='header_center'>
  <i className="fa-solid fa-magnifying-glass"></i>
    <input
    className='search_input'
    type='text'
    placeholder='search...'
    />

  </div>

  <div className='header_right'>
  <LoginMenu/>

  </div>
</div>
)
}else{
  currentSession =(
  <div className='header'>

    <div className='header_left'>
      {/* <NavLink className='header_homeLink' to='/'> */}
      <h1 className='header_question'>Question</h1>
      <h1 className='header_overflow'><em>overflow</em></h1>
      {/* </NavLink> */}
    </div>

  <div className='header_center'>
  <i className="fa-solid fa-magnifying-glass"></i>
    <input
    className='search_input'
    type='text'
    placeholder='search...'
    />

  </div>

  <div className='header_right'>
  <LogoutMenu/>

  </div>
</div>
  )
}

  return (currentSession)
  }

export default Header