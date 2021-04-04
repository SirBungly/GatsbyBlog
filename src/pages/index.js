import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Image from "@graphcms/react-image"
import LayoutMargin from "../components/layoutMargin"

export default function Home({ data }) {
  const { posts } = data
  return posts.nodes.map(post => {
    const asset = {
      handle: post.heroImage.handle,
      width: 1920,
      height: 1080,
    }
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
            <Image image={asset} maxWidth={1080} />
          </Link>
        </div>
      </LayoutMargin>
    )
  })
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    posts: allGraphCmsPost(sort: { fields: createdAt, order: ASC }) {
      nodes {
        id
        title
        subtitle
        slug
        publishedAt
        createdAt
        color {
          hex
        }
        heroImage {
          handle
        }
      }
    }
  }
`
