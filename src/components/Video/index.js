import React from 'react';
import './Video.scss';

export default class Video extends React.Component {
  render() {
    return (
      <video
        src={this.props.src}
        className="Video"
        controls="true"
      />
    )
  }
}
