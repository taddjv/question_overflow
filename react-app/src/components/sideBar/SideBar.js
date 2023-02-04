import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import SideBarComponent from './SideBarComponent'

function SideBar() {
  return (
    <div className='sidebar'>
      <NavLink to='/'>
      <SideBarComponent title={'Home'}/>
      </NavLink>
      <SideBarComponent title={'Questions'}/>
      <SideBarComponent title={'Categories'}/>
      <SideBarComponent title={'Top Questions'}/>
       <SideBarComponent title={'New Questions'}/>
       <SideBarComponent title={'Most Hated'}/>
    </div>
  )
}

export default SideBar
