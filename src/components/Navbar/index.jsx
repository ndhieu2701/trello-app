import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <ul className="navbar">
        <NavbarItem name="Workspaces"/>
        <NavbarItem name="Recently"/>
        <NavbarItem name="Starred"/>
        <NavbarItem name="Sample"/>
        <button className="btn navbar-btn">Create new</button>
    </ul>
  )
}

const NavbarItem = (props) => {
  return (
    <li className="navbar-item">
      <div className="navbar-name">{props.name}</div>
      <div className="arrow-down-icon">
          <i className='bx bx-chevron-down'></i>
      </div>
    </li>
  )
}

export default Navbar