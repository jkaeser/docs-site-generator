import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import { menuTreeFromRawData, menuGetSection } from '../menu.js'

export default class Sidebar extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string,
      title: PropTypes.string
    })),
  };

  renderItem = function(item) {
    return (
      <li key={`sb-${item.id}`}>
        <Link to={item.path}>{item.title}</Link>

        {item.children.length !== 0 &&
          <ul>
            {item.children.map(child => (
              this.renderItem(child)
            ))}
          </ul>
        }
      </li>
    )
  }

  renderMenu = function(data) {
    return (
      <ul>
        {data.map(item => (
          this.renderItem(item)
        ))}
      </ul>
    )
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query MenuQuery {
            ...dynamicMenuQuery
          }
        `}
        render={data => (
          <div>
            {this.renderMenu(menuGetSection(menuTreeFromRawData(data)))}
          </div>
        )}
      />
    )
  }
}

export const dynamicMenuQuery = graphql`
  fragment dynamicMenuQuery on Query {
    allMarkdownRemark(filter:{ frontmatter:{ templateKey:{ eq: "docs"} } } ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`
