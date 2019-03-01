import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from '../menu.js';
import './Grid.scss';

export class GridItem extends React.Component {
  static propTypes = {
    path: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
  };

  static defaultProps = {
    path: '',
    title: '',
    icon: '',
  };

  render() {
    return (
      <div className='Grid__item'>
        <Link to={this.props.path}>
          <div className="Grid__item-icon">
          {this.props.icon &&
            <FontAwesomeIcon
              icon={this.props.icon}
            />
          }
          </div>
          <div className="Grid__item-title">
            {this.props.title}
          </div>
        </Link>
      </div>
    )
  };
};

export class Grid extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query MenuGridQuery {
            ...dynamicMenuQuery
          }
        `}
        render={data => (
          <div className="Grid">
            {new Menu(data).tree.map(item => (
              <GridItem
                key={`g-${item.id}`}
                path={item.path}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </div>
        )}
      />
    )
  };
};

export default Grid;
