import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import './Button.scss';

class Button extends React.Component {
  static propTypes = {
    color: PropTypes.oneOf(['navy', 'white', 'gold']),
    link: PropTypes.string,
    attributes: PropTypes.object,
  };

  static defaultProps = {
    color: 'white',
    link: null,
    attributes: null,
  };

  render() {
    var classes = classnames(`Button -${this.props.color}`);

    if (this.props.link !== null) {
      return (
        <Link
          to={this.props.link}
          className={classes}
          {...this.props.attributes}
        >
          {this.props.children}
        </Link>
      )
    } else {
      return (
        <button className={classes} {...this.props.attributes}>
          {this.props.children}
        </button>
      )
    }
  };
};

export default Button;
