import React from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';

const converter = new showdown.Converter();

const Markdown = ({ content, className }) => (
  <div
    className={className}
    dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }}
  />
);

Markdown.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
};

export default Markdown;
