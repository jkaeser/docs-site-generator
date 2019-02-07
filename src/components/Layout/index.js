import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from "gatsby";
import Helmet from 'react-helmet';
import Header from '../Header';
import Footer from '../Footer';
import './sass/layout.scss';
import './sass/typography.scss';


class Layout extends React.Component {
  static propTypes = {
    color: PropTypes.oneOf(['0', '1', '2', '3', '4']),
  }

  static defaultProps = {
    color: '0',
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
              <div id="content" className={ `bg-${this.props.color}` }>
                { this.props.children }
              </div>
            </div>
            <Footer />
          </>
        )}
      />
    )
  }
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
