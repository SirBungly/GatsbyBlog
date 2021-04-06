import React from "react"
import LayoutMargin from "../components/layoutMargin"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

export default function BlogPost({ data, pageContext }) {
  var fm = require("front-matter")
  var markdownContent = fm(pageContext.markdown)
  console.log(markdownContent)

  return (
    <LayoutMargin>
      <div>
        <GatsbyImage image={pageContext.heroImage} alt="" />
        <h1>{pageContext.title}</h1>
        <h2>{pageContext.subtitle}</h2>
        <h5>{pageContext.firstPublishedAt}</h5>
        {pageContext.tags != null ? (
          pageContext.tags.map(tag => {
            return (
              <p key={tag.id}>
                <b>{tag.name}</b>
              </p>
            )
          })
        ) : (
          <p>No tags!</p>
        )}
        <MDXRenderer>{pageContext.mdx}</MDXRenderer>
        <div>
          <GatsbyImage
            image={pageContext.author.avatar.gatsbyImageData}
            alt=""
          />
          <Link to={"/authors/" + pageContext.author.slug}>
            <p>Posted by: {pageContext.author.name}</p>
          </Link>
        </div>
      </div>
    </LayoutMargin>
  )
}
