import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { menuTreeFromRawData } from '../menu.js'
import './Grid.scss';

export class GridItem extends React.Component {
  static propTypes = {
    path: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    path: '',
    title: '',
  }

  render() {
    return (
      <div className='Grid__item'>
        <Link to={this.props.path}>
          {this.props.title}
        </Link>
      </div>
    )
  }
}

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
            {menuTreeFromRawData(data).map(item => (
              <GridItem
                key={`g-${item.id}`}
                path={item.path}
                title={item.title}
              />
            ))}
          </div>
        )}
      />
    )
  }
}

export default Grid;
