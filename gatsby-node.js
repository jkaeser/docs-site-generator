const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              home
              path
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
      if (node.frontmatter.home) {
        createPage({
          path: node.frontmatter.path,
          component: path.resolve(`src/templates/home/index.js`),
          context: {}
        });
      }
      else {
        createPage({
          path: node.frontmatter.path,
          component: path.resolve(`src/templates/docs/index.js`),
          context: {}
        });
      }
    });
  });
};
