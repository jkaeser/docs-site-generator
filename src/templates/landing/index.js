import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import Search from '../../components/Search';
import Grid from '../../components/Menus/Grid';
import Breadcrumbs from '../../components/Menus/Breadcrumbs';
import './Landing.scss';

export default class LandingPage extends React.Component {
  render() {
    const { frontmatter, html: body } = this.props.data.pageMarkdown
    const { siteSearchIndex } = this.props.data;

    return (
      <Layout>
        <Helmet>
          <meta name="description" content={frontmatter.subtitle} />
        </Helmet>
        <PageTitle className="Landing__title">
          <h1>{frontmatter.title}</h1>
          <div className="Landing__title-wrapper">
            <Search data={siteSearchIndex} />
          </div>
        </PageTitle>
        {
          frontmatter.home !== true &&
          <div className="Landing__breadcrumb-wrapper">
            <div className="Landing__breadcrumb">
              <Breadcrumbs />
            </div>
          </div>
        }
        <section className="Landing__content-wrapper">
          <div className="Landing__content">
            {
              body !== null &&
              <div
                className="Landing__content-body"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            }
            <Grid section={frontmatter.menuSection || '/'} />
          </div>
        </section>
      </Layout>
    )
  };
};

export const LandingPageQuery = graphql`
  query LandingPage($path: String!) {
    pageMarkdown: markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        menuSection
        home
      }
      html
    }
    ...searchIndexQuery
  }
`
