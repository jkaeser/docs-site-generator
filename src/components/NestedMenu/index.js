import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import './NestedMenuItem.scss'

export const MENU_ITEM_SHAPE = {
  path: PropTypes.string,
  label: PropTypes.string,
}

export const MENU_DATA_SHAPE = {
  items_1: PropTypes.arrayOf(
    PropTypes.shape({
      items_2: PropTypes.arrayOf(
        PropTypes.shape({
          items_3: PropTypes.arrayOf(
            PropTypes.shape({
              ...MENU_ITEM_SHAPE,
            })
          ),
          ...MENU_ITEM_SHAPE,
        })
      ),
      ...MENU_ITEM_SHAPE,
    })
  ),
}

export class NestedMenu extends React.Component {
  static propTypes = {
    data: PropTypes.shape(MENU_DATA_SHAPE),
    className: PropTypes.string,
    pathPrefix: PropTypes.string,
  }

  static defaultProps = {
    data: {},
    className: '',
    pathPrefix: '',
  }

  render() {
    const { data } = this.props
    const pathPrefix = `${this.props.pathPrefix}`

    return (
      <div className={this.props.className}>
        {data.items_1.map(item_1 => (
          <NestedMenuItem
            label={item_1.label}
            path={pathPrefix + item_1.path}
            key={item_1.path}
            className={`NestedMenuItem__first`}
          >
            {item_1.items_2 &&
              item_1.items_2.map(item_2 => (
                <NestedMenuItem
                  label={item_2.label}
                  path={pathPrefix + item_1.path + item_2.path}
                  key={item_2.path}
                  className={`NestedMenuItem__second`}
                >
                  {item_2.items_3 &&
                    item_2.items_3.map(item_3 => (
                      <NestedMenuItem
                        label={item_3.label}
                        path={`${pathPrefix}${item_1.path}${item_2.path}#${item_3.path}`}
                        key={item_3.path}
                        className={`NestedMenuItem__third`}
                      />
                    ))}
                </NestedMenuItem>
              ))}
          </NestedMenuItem>
        ))}
      </div>
    )
  }
}

class NestedMenuItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: this.matchesPath(this.props.path),
    }
    this.toggleOpen = this.toggleOpen.bind(this)
  }

  matchesPath(input) {
    var match = false

    // Node environments do not have a global window object.
    if (typeof window !== 'undefined') {
      var windowPath = window.location.pathname

      // Is this the page we're on?
      if (input === windowPath) {
        match = true
      } else {
        // Is this the parent of the page we're on?
        var splitWindowPath = windowPath.split('/')
        var splitInput = input.split('/')

        // Do not open subsections.
        if (splitInput.length <= 3) {
          windowPath = splitWindowPath.slice(1, 3).join('/')
          var parentPath = splitInput.slice(1, 3).join('/')

          match = windowPath === parentPath
        }
      }
    }

    return match
  }

  static propTypes = {
    ...MENU_ITEM_SHAPE,
    className: PropTypes.string,
  }

  static defaultProps = {
    path: '',
    label: '',
    className: '',
  }

  toggleOpen(e) {
    if (e.keyCode) {
      if (e.keyCode === 32 || e.keyCode === 13) {
        e.preventDefault()
        this.setState(prevState => ({
          open: !prevState.open,
        }))
      }
    } else {
      this.setState(prevState => ({
        open: !prevState.open,
      }))
    }
  }

  render() {
    const hasChildren =
      React.Children.count(this.props.children) === 0 ? null : 'visible'
    return (
      <div
        className={`NestedMenuItem ${this.props.className} ${this.state.open
          ? 'is-active'
          : ''}`}
      >
        <div className="NestedMenuItem__link-wrapper">
          <Link to={this.props.path} className="NestedMenuItem__link">
            {this.props.label}
          </Link>
          {hasChildren && (
            <span
              className={`NestedMenuItem__icon ${hasChildren}`}
              tabIndex="0"
              aria-expanded={this.state.open}
              onClick={this.toggleOpen}
              onKeyDown={this.toggleOpen}
            >
              <span className="hidden">Reveal child menu items</span>
            </span>
          )}
        </div>
        {hasChildren && (
          <div className="NestedMenuItem__children">{this.props.children}</div>
        )}
      </div>
    )
  }
}

export default NestedMenu
