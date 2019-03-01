import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout';
import Helmet from 'react-helmet';
import Search from '../../components/Search';
import Sidebar from '../../components/Menus/Sidebar';
import Breadcrumbs from '../../components/Menus/Breadcrumbs';
import Video from '../../components/Video';
import './Docs.scss';

function stripHtml(html) {
  var stripped = new DOMParser().parseFromString(html, 'text/html')
  return stripped.body.textContent || ''
};

function firstParagraph(input) {
  let regex = /[<p>].*[</p>]/
  var match = regex.exec(input)
  return match !== null ? match : ''
};

export default class DocsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
    }
  };

  componentDidMount() {
    this.setState({
      description: stripHtml(firstParagraph(this.props.data.pageMarkdown.html)),
    })
  };

  render() {
    const { frontmatter, html: body } = this.props.data.pageMarkdown
    const { siteSearchIndex } = this.props.data
    const description = this.state.description

    return (
      <Layout>
        <Helmet title={`${frontmatter.title} | Chainalysis Documentation`}>
          <meta name="description" content={description} />
        </Helmet>
        <div className="Docs">
          <div className="Docs__wrapper">
            <section className="Docs__content">
              <h1 className="Docs__title">
                {frontmatter.title}
              </h1>
              { frontmatter.video &&
                <Video src={frontmatter.video} />
              }
              <div>
                <div
                  className="Docs__content-body"
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              </div>
            </section>
            <section className="Docs__breadcrumb">
              <Breadcrumbs />
            </section>
            <aside className="Docs__sidebar">
              <Search data={siteSearchIndex} />
              <Sidebar />
            </aside>
          </div>
        </div>
      </Layout>
    )
  };
};

export const docsPageQuery = graphql`
  query DocsPage($path: String!) {
    pageMarkdown: markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        path
        video
      }
      html
    }
    ...searchIndexQuery
  }
`
