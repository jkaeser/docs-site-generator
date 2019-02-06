import React from 'react'
import { graphql } from 'gatsby'
import Script from 'react-load-script'
import Helmet from 'react-helmet'
import Layout from '../../components/Layout'
import PageTitle from '../../components/PageTitle'
import Search from '../../components/Search'
import Grid from '../../components/Menus/Grid'
import './Home.scss';

export default class HomePage extends React.Component {
  handleScriptLoad() {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/'
          })
        }
      })
    }
    window.netlifyIdentity.init()
  }

  render() {
    const { frontmatter } = this.props.data.pageMarkdown
    const { siteSearchIndex } = this.props.data;

    return (
      <Layout>
        <Helmet>
          <meta name="description" content={frontmatter.subtitle} />
        </Helmet>
        <PageTitle className="Home__title">
          <h1>{frontmatter.title}</h1>
          <div className="Home__title-wrapper">
            <Search data={siteSearchIndex} />
          </div>
        </PageTitle>
        <section className="Home__content-wrapper">
          <div className="Home__content">
            <Grid />
          </div>
        </section>
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={this.handleScriptLoad.bind(this)}
        />
      </Layout>
    )
  }
}

export const homePageQuery = graphql`
  query HomePage($path: String!) {
    pageMarkdown: markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        subtitle
      }
    }
    ...siteTitle
    ...searchIndexQuery
  }
`
