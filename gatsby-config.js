const siteUrl = `https://docs.chainalysis.com`;

module.exports = {
  siteMetadata: {
    title: `Chainalysis Documentation`,
    siteUrl: siteUrl,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: siteUrl,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
        ignore: [
          '**/*.mov',
          '**/*.mp4',
          '**/*.jpg',
          '**/*.jpeg',
          '**/*.png',
          '**/*.svg',
          '**/*.gif',
          '**/*.scss',
          '**/*.js'
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/docs`,
        name: 'media',
        ignore: [
          '**/*.md',
          '**/*.scss',
          '**/*.js'
        ]
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 695,
              linkImagesToOriginal: true,
              quality: 100,
              wrapperStyle: 'margin: 3rem 0;',
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/img/favicon.png",
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `@andrew-codes/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [
          'title',
          'keywords',
          'body',
          'path',
        ],
        // How to resolve each field's value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields' values
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            keywords: node => node.frontmatter.keywords,
            body: node => node.rawMarkdownBody,
            path: node => node.frontmatter.path,
          },
        },
      },
    },
  ]
};
