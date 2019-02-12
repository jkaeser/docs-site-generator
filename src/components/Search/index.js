import React from 'react';
import { graphql, Link } from 'gatsby';
import * as elasticlunr from 'elasticlunr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FocusWithin from 'react-focus-within';
import './Search.scss';

const { Index } = elasticlunr;
elasticlunr.clearStopWords();

// Search component
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ``,
      results: [],
    };
    this.clearSearch = this.clearSearch.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  handleKeydown = (e) => {
    // Do not clear input when enter/return key is pressed.
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }

  clearSearch = (e) => {
    e.preventDefault();
    this.setState({
      query: ``,
      results: [],
    })
  }

  render() {
    const hasQuery = this.state.query.length !== 0 ? 'hasQuery' : '';
    const hasResults = this.state.results.length !== 0 ? 'hasResults' : '';

    return (
      <FocusWithin>
        {({ focusProps, isFocused }) => (
          <div className="Search" {...focusProps}>
            <form autoComplete="off">
              <label htmlFor="searchInput" className="hidden">
                Search guides
              </label>
              <FontAwesomeIcon icon="search" className="Search__icon" />
              <input
                type="text"
                placeholder="Search guides..."
                name="searchInput"
                id="search"
                value={this.state.query}
                onChange={this.search}
                onKeyDown={this.handleKeydown}
                className={`Search__input ${hasQuery}`}
              />
              <button
                className={`Search__clear ${hasQuery}`}
                onClick={this.clearSearch}
              >
                <span className="hidden">Clear search input</span>
              </button>
            </form>
            <ul className={`Search__results ${hasResults} ${isFocused ? 'isFocused' : ''}`}>
              {this.state.results.map(page => (
                <li key={page.id} className="Search__result">
                  <Link to={page.path}>
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </FocusWithin>
    );
  }

  getOrCreateIndex = function() {
    // Return index, or create an elastic lunr index and hydrate with graphql query results
  return this.index ? this.index : Index.load(this.props.data.index);
  }

  search = (event) => {
    const query = event.target.value;
    this.index = this.getOrCreateIndex();
    this.setState({
      query,
      results: this.index.search(query, {
        fields: {
          title: {boost: 3},
          keywords: {boost: 2},
          body: {boost: 1},
          // Ignore path. Path only in index to create <Link>s.
          path: {boost: 0},
        },
        expand: true,
      })
        // Map over each ID and return the full document
        .map(({
        ref,
        }) => this.index.documentStore.getDoc(ref)),
    });
  }
}

// Graphql query used to retrieve the serialized search index.
export const query = graphql`
  fragment searchIndexQuery on Query {
    siteSearchIndex {
      index
    }
  }
`;
