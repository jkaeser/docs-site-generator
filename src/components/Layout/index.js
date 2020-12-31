import React from 'react';
import { StaticQuery, graphql } from "gatsby";
import Helmet from 'react-helmet';
import Header from '../Header';
import Footer from '../Footer';
import '../../js-utils/fontawesome.js';
import './sass/layout.scss';
import './sass/typography.scss';
import * as config from '../../../config.default.js';

function generateColorVars(config, documentRoot, prefix = '') {
  let keys = Object.keys(config);
  for (let i = 0; i < keys.length; i++) {
    let varName = `${prefix}${keys[i]}`;
    if (typeof config[keys[i]] === 'object') {
      generateColorVars(config[keys[i]], documentRoot, `${varName}-`);
    }
    else {
      documentRoot.style.setProperty(`--${varName}`, config[keys[i]]);
    }
  }
}

class Layout extends React.Component {
  componentDidMount() {
    generateColorVars(config.colors, document.documentElement);
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Helmet title={ data.site.siteMetadata.title }>
              <html lang="en" />
            </Helmet>
            <a href="#content-wrapper" className="skip-link">Skip to main content</a>
            <Header />
            <div id="content-wrapper" tabIndex="-1">
              <div id="content">
                { this.props.children }
              </div>
            </div>
            <Footer />
          </>
        )}
      />
    )
  };
};

export default Layout;

export const siteTitleFragmentQuery = graphql`
  fragment siteTitle on Query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
