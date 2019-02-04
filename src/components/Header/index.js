import React from 'react'
import { Link } from 'gatsby'
// import Nav from '../Nav'
import logo from '../../img/logo.svg'
import './Header.scss'

const Header = () => (
  <header id="Header">
    <div className="Header__wrapper">
      <div className="Header__logo">
        <Link to="/" title="Home">
          <figure>
            <img src={logo} alt="chainalysis logo" />
          </figure>
        </Link>
      </div>
    </div>
  </header>
)

export default Header
