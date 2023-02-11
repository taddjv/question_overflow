import React from 'react'
import {NavLink} from 'react-router-dom'
import './Sidebar.css'
import SideBarComponent from './SidebarRow'

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

      <NavLink className='sidebar_link' to='/questions/popular'>
      <div className='sidebar_items'>
        <div className='icon'>
          <i className="fa-solid fa-thumbs-up"/>
        </div>
        <SideBarComponent title={'Popular Questions'}/>
      </div>
      </NavLink>
      <hr/>

      <NavLink className='sidebar_link' to='/questions/newest'>
      <div  className='sidebar_items'>
        <div className='icon'>
          <i className="fa-solid fa-clock"/>
        </div>
        <SideBarComponent title={'Newest Questions'}/>
      </div>
      </NavLink>
      <hr/>

      <NavLink className='sidebar_link' to='/questions/hated'>

      <div className='sidebar_items'>

        <div className='icon'>
          <i className="fa-solid fa-thumbs-down"/>
        </div>
        <SideBarComponent title={'Most Hated'}/>
      </div>
      </NavLink>
      <hr/>

    </div>
  )
}

export default SideBar
