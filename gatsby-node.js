const path = require('path');

exports.sourceNodes = ({ actions, schema }) => {
  actions.createTypes(`
    type MarkdownRemarkFrontmatter {
      demo: Boolean
      template: String
      home: Boolean
      title: String
      path: String
      weight: Int
      keywords: String
      icon: String
      video: String
      redirect_to: String
      menuSection: String
    }

    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }
  `);
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions;

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              template
              path
              redirect_to
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.redirect_to) {
        createRedirect({
          fromPath: node.frontmatter.path,
          toPath: node.frontmatter.redirect_to,
          isPermanent: true,
          force: true,
          redirectInBrowser: true
        });
      }
      if (node.frontmatter.template === 'landing') {
        createPage({
          path: node.frontmatter.path,
          component: path.resolve(`src/templates/landing/index.js`),
          context: {}
        });
      }
      else if (node.frontmatter.path) {
        createPage({
          path: node.frontmatter.path,
          component: path.resolve(`src/templates/docs/index.js`),
          context: {}
        });
      }
    });
  });
};
