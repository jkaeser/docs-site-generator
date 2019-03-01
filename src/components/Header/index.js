import React from 'react';
import { Link } from 'gatsby';
import Nav from '../Menus/Nav';
import logo from '../../img/logo.png';
import './Header.scss';

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
      <Nav />
    </div>
  </header>
);

export default Header;
