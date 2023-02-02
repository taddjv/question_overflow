import React from 'react'
import './Header.css'
import LogoutMenu from './logout/LogoutMenu'

function Header() {
  return (
    <div className='header'>

      <div className='header_left'>
        <h1 className='header_question'>Question</h1>
        <h1 className='header_overflow'><em>overflow</em></h1>
      </div>

      <div className='header_center'>
        <input  className='search_input' type='text'/>
      </div>

      <div className='header_right'>
        <LogoutMenu/>

      </div>
    </div>
  )
}

export default Header
