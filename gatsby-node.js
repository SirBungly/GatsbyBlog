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
          tags {
            name
            id
          }
          author {
            name
            avatar {
              gatsbyImageData(width: 100, height: 100)
            }
            slug
          }
        }
      }
      authors: allDatoCmsAuthor {
        nodes {
          avatar {
            gatsbyImageData(width: 150, height: 150)
          }
          bioNode {
            childMdx {
              body
            }
          }
          id
          slug
          name
        }
      }
    }
  `)

  const { posts } = result.data
  const { authors } = result.data

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
        tags: node.tags,
        author: node.author,
        id: node.id,
      },
    })
  })

  authors.nodes.forEach(author => {
    createPage({
      path: `/authors/${author.slug}`,
      component: path.resolve(`./src/templates/author-page.js`),
      context: {
        name: author.name,
        avatar: author.avatar.gatsbyImageData,
        id: author.id,
        slug: author.slug,
        bio: author.bioNode.childMdx.body,
      },
    })
  })
}
