import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import './Video.scss';

export default class Video extends React.Component {
  static propTypes = {
    src: PropTypes.string
  }

  static defaultProps = {
    src: ''
  }

  // Ideally we'd be able to filter the GraphQL query by passing it the 'src'
  // prop's value. However, string interpolations are not allowed in GraphQL
  // queries.
  matchVideoSrc = function(data) {
    let self = this;
    let files = data.allFile;
    let src = null;

    if (files !== null) {
      files.edges.forEach(function(item) {
        if (self.props.src === item.node.relativePath) {
          src = item.node.publicURL;
        }
      })
    }
    return src;
  }

  renderVideo = function(data) {
    let src = this.matchVideoSrc(data);
    if (src !== null) {
      return (
        <video
          src={src}
          controls={true}
        />
      )
    }
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query videoQuery {
            ...videoFileQuery
          }
        `}
        render={data => (
          <>
            {this.renderVideo(data)}
          </>
        )}
      />
    )
  }
}

export const videoFileQuery = graphql`
  fragment videoFileQuery on Query {
    allFile(filter: {extension: {in: ["mov", "mp4"]}}) {
      edges {
        node {
          relativePath
          publicURL
        }
      }
    }
  }
`;
