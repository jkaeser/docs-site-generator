import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import PageTitle from '../../components/PageTitle'
import Search from '../../components/Search'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import './404.scss'

const NotFoundPage = ({ data }) => (
  <Layout>
    <Helmet title={`Page Not Found | ${data.site.siteMetadata.title}`}>
      <meta
        name="description"
        content="You found a page that doesn't exist."
      />
    </Helmet>
    <PageTitle>
      <h1>404: This page doesn't exist!</h1>
    </PageTitle>
    <section className="FourOhFour">
      <p>
        Perhaps you'd like to go back to the <Link to="/">home page</Link>?
      </p>
      <p>Or you can search the guides:</p>
      <Search data={data.siteSearchIndex} />
    </section>
  </Layout>
)

export default NotFoundPage

export const query = graphql`
  query FourOhFourQuery {
    ...siteTitle
    ...searchIndexQuery
  }
`
