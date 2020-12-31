import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import logo from '../../img/logo.png';
import './Header.scss';

const Header = () => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <header id="Header">
        <div className="Header__wrapper">
          <div className="Header__logo">
            <Link to="/" title="Home">
              <figure className="Header__logo-figure">
                <img src={logo} alt="logo" />
              </figure>
              <span className="Header__logo-title">
                {data.site.siteMetadata.title}
              </span>
            </Link>
          </div>
        </div>
      </header>
    )}
  />
);

export default Header;
