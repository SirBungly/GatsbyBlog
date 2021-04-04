import React from "react"
import LayoutMargin from "../components/layoutMargin"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage } from "gatsby-plugin-image"

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
        <MDXRenderer>{pageContext.mdx}</MDXRenderer>
      </div>
    </LayoutMargin>
  )
}
