import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from '../menu.js';
import * as Utils from '../../../js-utils/utils.js';
import './Sidebar.scss';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.toggleMenu = this.toggleMenu.bind(this);
  };

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string,
      title: PropTypes.string
    })),
  };

  toggleMenu = function() {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  };

  matchesPath = function(string) {
    let activeClass = '';
    let windowPath = Utils.safeWindowPath();

    if (Utils.stripSlashes(windowPath) === Utils.stripSlashes(string)) {
      activeClass = 'active';
    }

    return activeClass;
  };

  renderItem = function(item) {
    return (
      <li key={`sb-${item.id}`} className={`Sidebar__item ${this.matchesPath(item.path)}`}>
        <Link to={item.path}>{item.title}</Link>

        {item.children.length !== 0 &&
          <ul className="Sidebar__children">
            {item.children.map(child => (
              this.renderItem(child)
            ))}
          </ul>
        }
      </li>
    )
  };

  renderMenu = function(data) {
    const open = this.state.open ? 'open' : '';

    return (
      <nav className={`Sidebar ${open}`}>
        <div className="Sidebar__intro">
          <div className="Sidebar__intro-text">In this guide:</div>
          <button
            className={`Sidebar__toggle ${open}`}
            onClick={this.toggleMenu}
          >
            <span className="hidden">Expand menu</span>
            <FontAwesomeIcon icon="chevron-down" />
          </button>
        </div>
        <ul className={`Sidebar__list ${open}`}>
          {data.map(item => (
            this.renderItem(item)
          ))}
        </ul>
      </nav>
    )
  };

  render() {
    return (
      <StaticQuery
        query={graphql`
          query MenuQuery {
            ...dynamicMenuQuery
          }
        `}
        render={data => (
          <>
            {this.renderMenu(
              new Menu(data).getCurrentSection()
            )}
          </>
        )}
      />
    )
  };
};
