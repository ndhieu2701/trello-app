import React from 'react'
import Navbar from '../Navbar'
import Input from '../Input'
import './Header.css'
import HeaderRightItem from '../HeaderRightItem'

const Header = () => {
  return (
    <div className="header">
        <div className="header-left">
            <div className="logo">
              <div className="logo-img"></div>
            </div>
            <Navbar/>
        </div>
        <div className="header-right">
            <Input/>
            <HeaderRightItem/>
        </div>
    </div>
  )
}

export default Header