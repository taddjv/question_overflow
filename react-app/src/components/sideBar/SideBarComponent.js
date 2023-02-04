import React from 'react'
import './SideBarComponent.css'
import { NavLink } from 'react-router-dom'

// side bar:
// Home
// Questions
// Categories (bonus)
// Top Questions (sorted highest upvote)
// New Questions (sorted by date)
// Most Hated (sorted by most :arrow_down:votes)

function SideBarComponent() {
  return (
    <div className='sidebar_container'>
      <NavLink className='sidebar_link' to='/'>
        Home
      </NavLink>
    </div>
  )
}

export default SideBarComponent
