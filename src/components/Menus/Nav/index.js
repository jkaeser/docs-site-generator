import React from 'react';
import { Link } from 'gatsby';
import './Nav.scss';

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

  toggleMenu = function() {
    this.setState(prevState => ({
      open: !prevState.open,
    }));

    //@TODO: Set this class on the body in a more React-friendly way.
    document
      .getElementsByTagName('body')
      .item(0)
      .classList.toggle('menu-is-open')
  }

  closeMenu = function() {
    this.setState({
      open: false
    });
  }

  navItems = [
    {
      name: 'KYT',
      path: '/',
    },
    {
      name: 'Reactor',
      path: '/'
    }
  ];

  render() {
    return (
      <div className="Nav">
        <div
          className={'Nav__toggle ' + (this.state.open ? 'is-active' : '')}
          onClick={this.toggleMenu}
        >
          <span className="line" role="presentation" />
          <span className="line" role="presentation" />
          <span className="line" role="presentation" />
          <span className="hidden">Open mobile menu</span>
        </div>
        <div
          className={'Nav__wrapper ' + (this.state.open ? 'open' : 'closed')}
        >
          <nav className="Nav__list">
            {this.navItems.map(item => (
              <Link
                key={item.name}
                className="Nav__item"
                to={item.path}
                onClick={this.closeMenu}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="Nav__overlay" onClick={this.closeMenu} />
        </div>
      </div>
    )
  }
}

export default Nav;
