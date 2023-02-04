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

function SideBarComponent({title,icon}) {
  return (
    <div className='sidebar_container'>
      
      <h4 className='row_title'>{title}</h4>
    </div>
  )
}

export default SideBarComponent
