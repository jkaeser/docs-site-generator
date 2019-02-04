import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import * as Utils from '../../js-utils/utils'
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
    label: PropTypes.string,
    path: PropTypes.string,
  }

  static defaultProps = {
    label: '',
    path: '',
  }

  render() {
    let windowPath = safeWindowPath()
    let crumbLabel = this.props.label

    if (
      Utils.stripSlashes(this.props.path) !== Utils.stripSlashes(windowPath)
    ) {
      crumbLabel = <a href={this.props.path}>{this.props.label}</a>
    }

    return (
      <li className="Crumb" key={this.props.path}>
        {crumbLabel}
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

    // Set up our base path, which is not reflected in the docs-menu data file.
    // @TODO: Perhaps we should include it there so we don't have to do
    // something like this each time we want to implement it.
    let breadcrumbs = [<Crumb label="Guides" path="/" key="/" />]

    // For each piece of the current page path...
    for (var i = 0; i < pathParts.length; i++) {
      // Compare it to top-level items from the menu data...
      // eslint-disable-next-line
      data.items_1.forEach(function(child) {
        // And if there is a match...
        if (pathParts[i] === Utils.stripSlashes(child.path)) {
          // Build a breadcrumb out of that menu item...
          breadcrumbs.push(
            <Crumb
              label={child.label}
              path={child.path}
              key={child.path}
            />
          )
          // And if that menu item has children...
          if (child.hasOwnProperty('items_2') && child.items_2 !== null) {
            child.items_2.forEach(function(grandchild) {
              // And one of those children's paths matches the next piece of the
              // URL path...
              if (pathParts[i + 1] === Utils.stripSlashes(grandchild.path)) {
                // Build a breadcrumb out of that, too.
                breadcrumbs.push(
                  <Crumb
                    label={grandchild.label}
                    path={breadcrumbs[1].props.path + grandchild.path}
                    key={breadcrumbs[1].props.path + grandchild.path}
                  />
                )
              }
            })
          }
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
            ...docsMenu
          }
        `}
        render={data => (
          <nav aria-label="Breadcrumb">
            <ul className="Breadcrumbs">
              {this.buildCrumbs(data.file.childMarkdownRemark.frontmatter)}
            </ul>
          </nav>
        )}
      />
    )
  }
}

/**
 * Represents a series of breadcrumbs inferred from the page path
 */
export class BreadcrumbsFromPath extends React.Component {
  /**
   * Builds an array of Crumb objects by inferring their attributes from the
   * current page path
   * @return {array}
   */
  buildCrumbs = function() {
    let path = safeWindowPath()
    let pathParts = path.split('/').filter(word => word !== '')
    let breadcrumbs = []
    let prevPath = ''

    pathParts.forEach(function(part) {
      let thisPath = ''
      if (prevPath !== '') {
        thisPath = prevPath + part + '/'
      } else {
        thisPath = '/' + part + '/'
      }

      let crumb = (
        <Crumb
          label={Utils.getLabelFromPathPart(part)}
          path={thisPath}
          key={thisPath}
        />
      )

      prevPath = thisPath
      breadcrumbs.push(crumb)
    })

    return breadcrumbs
  }

  render() {
    const breadcrumbs = this.buildCrumbs()
    return (
      <nav aria-label="Breadcrumb">
        <ul className="Breadcrumbs">
          {breadcrumbs.map(crumb => crumb.render())}
        </ul>
      </nav>
    )
  }
}

export default Breadcrumbs
