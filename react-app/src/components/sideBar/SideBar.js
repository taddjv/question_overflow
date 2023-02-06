import React from 'react'
import {NavLink} from 'react-router-dom'
import './Sidebar.css'
import SideBarComponent from './SideBarComponent'

function SideBar() {
  return (
    <div className='sidebar'>

      <NavLink className='sidebar_link' to='/'>

        <div className='icon'>
          <i className="fa-solid fa-house"/>
        </div>

        <SideBarComponent title={'Home'}/>
      </NavLink>
      <hr/>

      <div className='sidebar_items'>
        <div className='icon'>
          <i className="fa-solid fa-thumbs-up"/>
        </div>
        <SideBarComponent title={'Popular Questions'}/>
      </div>
      <hr/>

      <div className='sidebar_items'>
        <div className='icon'>
          <i className="fa-solid fa-clock"/>
        </div>
        <SideBarComponent title={'Newest Questions'}/>
      </div>
      <hr/>

      <div className='sidebar_items'>

        <div className='icon'>
          <i className="fa-solid fa-thumbs-down"/>
        </div>
        <SideBarComponent title={'Most Hated'}/>
      </div>

    </div>
  )
}

export default SideBar
