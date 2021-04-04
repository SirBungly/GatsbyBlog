import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import LayoutMargin from "../components/layoutMargin"
import { GatsbyImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default function Home({ data }) {
  const { posts } = data
  return posts.nodes.map(post => {
    const slug = "posts/" + post.slug
    return (
      <LayoutMargin key={post.id}>
        <div>
          <h1>
            <Link to={slug} className="text-3xl">
              {post.title}
            </Link>
          </h1>
          <h2 className="text-gray-500">{post.subtitle}</h2>
          <Link to={slug} className="text-3xl">
            <GatsbyImage image={post.heroImage.gatsbyImageData} alt="" />
          </Link>
          <MDXRenderer>{post.openingParagraphNode.childMdx.body}</MDXRenderer>
        </div>
      </LayoutMargin>
    )
  })
}

export const siteQuery = graphql`
  query {
    posts: allDatoCmsPost( sort: { fields: meta___firstPublishedAt, order: ASC } )
    {  
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
`
