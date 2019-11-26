import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';
import * as Utils from '../../../js-utils/utils';
import { Menu } from '../menu.js';
import './Breadcrumbs.scss';

/**
 * Represents a single breadcrumb
 */
class Crumb extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    path: PropTypes.string,
    comparePath: PropTypes.string,
  };

  static defaultProps = {
    title: '',
    path: '',
    comparePath: '',
  };

  render() {
    let windowPath = Utils.safeWindowPath();
    let crumbtitle = this.props.title;

    if (
      Utils.stripSlashes(this.props.comparePath) !== Utils.stripSlashes(windowPath)
    ) {
      crumbtitle = <Link to={this.props.path}>{this.props.title}</Link>;
    }

    return (
      <li className="Crumb">
        {crumbtitle}
      </li>
    )
  };
};

/**
 * Represents a series of breadcrumbs built from menu data
 */
class Breadcrumbs extends React.Component {
  /**
   * Builds an array of Crumbs by comparing the current page path to GraphQL
   * query data.
   * @param {array} data
   * @return {array}
   */
  buildCrumbs = function(data) {
    let path = Utils.safeWindowPath();
    const pathParts = Utils.splitPath(path);
    let pathCompare = '';

    // Start crumbs with link to home page.
    let breadcrumbs = [<Crumb title="Guides" path="/" key="bc-home" />];

    for (var i = 0; i < pathParts.length; i++) {
      pathCompare += '/' + pathParts[i];
      // eslint-disable-next-line
      data.forEach(function(item) {
        let itemPath = item.comparePath;
        if (Utils.stripSlashes(itemPath) === Utils.stripSlashes(pathCompare)) {
          breadcrumbs.push(
            <Crumb
              title={item.title}
              path={item.path}
              comparePath={item.comparePath}
              key={`bc-${item.id}`}
            />
          )
        }
      })
    }
    return breadcrumbs
  };

  render() {
    return (
      <StaticQuery
        query={graphql`
          query BreadcrumbQuery {
            ...dynamicMenuQuery
          }
        `}
        render={data => (
          <nav aria-label="Breadcrumb">
            <ul className="Breadcrumbs">
              {this.buildCrumbs(new Menu(data).nodes)}
            </ul>
          </nav>
        )}
      />
    )
  };
};

export default Breadcrumbs;
