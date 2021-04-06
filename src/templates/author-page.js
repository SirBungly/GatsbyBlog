import React from "react"
import LayoutMargin from "../components/layoutMargin"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage } from "gatsby-plugin-image"

export default function AuthorPage({ data, pageContext }) {
  return (
    <LayoutMargin>
      <GatsbyImage image={pageContext.avatar} alt="" />
      <h1 className="text-2xl">{pageContext.name}</h1>
      <MDXRenderer>{pageContext.bio}</MDXRenderer>
    </LayoutMargin>
  )
}
