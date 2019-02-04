const path = require('path');
const fs = require('fs');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              templateKey
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
      var templateKey = node.frontmatter.templateKey;
      if (fs.existsSync(`src/templates/${templateKey}/index.js`)) {
        var templatePath = path.resolve(`src/templates/${templateKey}/index.js`);
      }
      else if (templateKey != null) {
        var templatePath = path.resolve(`src/templates/${templateKey}.js`);
      }
      else {
        return;
      }
      createPage({
        path: node.frontmatter.path,
        component: templatePath,
        context: {} // additional data can be passed via context
      });
    });
  });
};
