const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      posts: allGraphCmsPost {
        edges {
          node {
            title
            subtitle
            slug
            publishedAt
            markdown
            color {
              hex
            }
            heroImage {
              handle
            }
          }
        }
      }
    }
  `)

  const { posts } = result.data

  posts.edges.forEach(edge => {
    const node = edge.node;
    createPage({
      path: `posts/${node.slug}`,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        title: node.title,
        subtitle: node.subtitle,
        slug: node.slug,
        publishedAt: node.publishedAt,
        color: node.color.hex,
        heroImage: node.heroImage.handle,
        markdown: node.markdown,
      },
    })
  })
}
