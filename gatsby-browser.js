import React from "react"
import { MDXProvider } from "@mdx-js/react"
import "./src/styles/global.css"

const wrapRootElement = ({ element }) => {
  return <MDXProvider>{element}</MDXProvider>
}

export { wrapRootElement }
