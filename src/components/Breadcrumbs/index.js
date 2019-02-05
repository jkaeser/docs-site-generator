import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import * as Utils from '../../js-utils/utils'
import * as MenuFunctions from '../Menus/menu.js'
import './Breadcrumbs.scss'

/**
 * Returns global window object if valid or an empty string (e.g. Node env)
 * @return {string}
 */
function safeWindowPath() {
  let path = typeof window !== 'undefined' ? window.location.pathname : ''
  return path
}

/**
 * Represents a single breadcrumb
 */
class Crumb extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    path: PropTypes.string,
  }

  static defaultProps = {
    title: '',
    path: '',
  }

  render() {
    let windowPath = safeWindowPath()
    let crumbtitle = this.props.title

    if (
      Utils.stripSlashes(this.props.path) !== Utils.stripSlashes(windowPath)
    ) {
      crumbtitle = <a href={this.props.path}>{this.props.title}</a>
    }

    return (
      <li className="Crumb" key={this.props.path}>
        {crumbtitle}
      </li>
    )
  }
}

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
    let path = safeWindowPath()
    let pathParts = path.split('/').filter(part => part !== '')
    let pathCompare = '';

    // Start crumbs with link to home page.
    let breadcrumbs = [<Crumb title="Guides" path="/" key="bc-home" />]

    for (var i = 0; i < pathParts.length; i++) {
      pathCompare += '/' + pathParts[i];
      // eslint-disable-next-line
      data.forEach(function(item) {
        if (item.path === pathCompare) {
          breadcrumbs.push(
            <Crumb
              title={item.title}
              path={item.path}
              key={`bc-${item.id}`}
            />
          )
        }
      })
    }
    return breadcrumbs
  }

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
              {this.buildCrumbs(MenuFunctions.menuFormatData(data.allMarkdownRemark.edges))}
            </ul>
          </nav>
        )}
      />
    )
  }
}

export default Breadcrumbs;
