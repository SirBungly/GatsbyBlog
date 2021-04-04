const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      posts: allDatoCmsPost {
        nodes {
          id
          title
          subtitle
          slug
          meta {
            firstPublishedAt(formatString: "DD MMMM, YYYY", locale: "en")
          }
          openingParagraph
          openingParagraphNode {
            childMdx {
              body
            }
          }
          heroImage {
            gatsbyImageData
          }
        }
      }
    }
  `)

  const { posts } = result.data

  posts.nodes.forEach(node => {
    createPage({
      path: `posts/${node.slug}`,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        title: node.title,
        subtitle: node.subtitle,
        mdx: node.openingParagraphNode.childMdx.body,
        heroImage: node.heroImage.gatsbyImageData,
        markdown: node.openingParagraph,
        firstPublishedAt: node.meta.firstPublishedAt,
      },
    })
  })
}
