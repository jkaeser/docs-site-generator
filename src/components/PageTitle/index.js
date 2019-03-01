import React from 'react';
import PropTypes from 'prop-types';
import './PageTitle.scss';

class PageTitle extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    return (
      <div className={`PageTitle ${this.props.className}`}>
        {this.props.children}
      </div>
    )
  };
};

export default PageTitle;
