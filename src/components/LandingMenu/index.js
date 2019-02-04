import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { MENU_ITEM_SHAPE, MENU_DATA_SHAPE } from '../NestedMenu'
import classnames from 'classnames'
import './LandingMenu.scss'

export class LandingMenuItem extends React.Component {
  static propTypes = {
    ...MENU_ITEM_SHAPE,
    prefix: PropTypes.string,
    level: PropTypes.oneOf(['first', 'second', 'third']),
  }

  render() {
    const classes = classnames(
      `LandingMenu__item LandingMenu__item--${this.props.level}`
    )

    return (
      <div key={this.props.path} className={classes}>
        <Link to={`${this.props.prefix}${this.props.path}`}>
          {this.props.label}
        </Link>
        {this.props.children}
      </div>
    )
  }
}

export class LandingMenu extends React.Component {
  static propTypes = {
    data: PropTypes.shape(MENU_DATA_SHAPE),
    pathPrefix: PropTypes.string,
    topLevelPath: PropTypes.string,
  }

  static defaultProps = {
    data: {},
    pathPrefix: '',
    topLevelPath: null,
  }

  pathPrefix = `/${this.props.pathPrefix}`

  renderFullTree = () => {
    return (
      <div className="LandingMenu">
        {this.props.data.items_1.map(item_1 => (
          <LandingMenuItem
            key={item_1.path}
            prefix={this.pathPrefix}
            path={item_1.path}
            label={item_1.label}
            level="first"
          />
        ))}
      </div>
    )
  }

  renderPartialTree = () => {
    // Loop through first level of data.
    for (var first in this.props.data) {
      let first_level = this.props.data[first]

      // Loop through second level, where path data is stored.
      for (var second in first_level) {
        let second_level = first_level[second]

        // Compare the found path value to the selected path value.
        if (
          `${this.pathPrefix}${second_level.path}` === this.props.topLevelPath
        ) {
          let children = second_level.items_2

          return (
            <div>
              {children.map(item_2 => (
                <LandingMenuItem
                  key={item_2.path}
                  prefix={this.pathPrefix}
                  path={`${second_level.path}${item_2.path}`}
                  label={item_2.label}
                  level="second"
                >
                  {item_2.items_3 &&
                    item_2.items_3.map(item_3 => (
                      <LandingMenuItem
                        key={item_3.path}
                        prefix={this.pathPrefix}
                        path={`${second_level.path}${item_2.path}#${item_3.path}`}
                        label={item_3.label}
                        level="third"
                      />
                    ))}
                </LandingMenuItem>
              ))}
            </div>
          )
        }
      }
    }
  }

  render() {
    return (
      <div>
        {this.props.topLevelPath == null && this.renderFullTree()}
        {this.props.topLevelPath != null && this.renderPartialTree()}
      </div>
    )
  }
}

export default LandingMenu
