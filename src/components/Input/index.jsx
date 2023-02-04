import React from 'react'
import './Input.css'

const Input = () => {
  return (
    <div className="header-input">
        <input type="text" name="header-input" id="header-input-input" placeholder="Search" />
        <div className="input-search-icon">
            <i className='bx bx-search' ></i>
        </div>
    </div>
  )
}

export default Input