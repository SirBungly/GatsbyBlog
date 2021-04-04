/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'My Gatsby Test'
  },
  plugins: [
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        endpoint: 'https://api-eu-central-1.graphcms.com/v2/ckj2134fh6lyc01z91vr8hwht/master',
        buildMarkdownNodes: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
  ],
}
