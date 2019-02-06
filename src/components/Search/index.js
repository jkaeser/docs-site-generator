import React from 'react';
import { graphql, Link } from 'gatsby';
import { Index } from 'elasticlunr';
import './Search.scss';

// Search component
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ``,
      results: [],
    };
  }

  render() {
    const activeClass = this.state.query.length !== 0 ? 'active' : '';

    return (
      <div className="Search">
        <label htmlFor="search" className="hidden">
          Search guides
        </label>
        <input
          type="text"
          placeholder="Search guides..."
          name="search"
          id="search"
          value={this.state.query}
          onChange={this.search}
          className={`Search__input ${activeClass}`}
        />
        <ul className="Search__results">
          {this.state.results.map(page => (
            <li key={page.id} className="Search__result">
              <Link to={page.path}>
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
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
