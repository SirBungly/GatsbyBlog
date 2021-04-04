import React from "react"
import Image from "@graphcms/react-image";
import LayoutMargin from "../components/layoutMargin"
import ReactMarkdown from 'react-markdown'

export default function BlogPost({data, pageContext}) {
  var fm = require('front-matter');
  const macro = require('remark-macro')()

  var markdownContent = fm(pageContext.markdown);
  macro.addMacro('alert', function (content, props, { transformer, eat }) {
    return {
      type: 'AlertNode',
      data: {
        hName: 'div',
        hClassNames: ['alert alert-note'],
        hChildren: transformer.tokenizeBlock(content, eat.now())
      }
    } 
  })
  console.log(markdownContent);
  const asset = {
    handle: pageContext.heroImage,
    width: 1920,
    height: 1080
  }

  const renderers = {
    //This custom renderer changes how images are rendered
    //we use it to constrain the max width of an image to its container
    image: ({
        alt,
        src,
        title,
    }) => {
        return <img src={src} alt={alt} title={title}></img>;
    },
};

  return (
    <LayoutMargin>
    <div>
      <Image image={asset} maxWidth={1080} />
      <h1>{pageContext.title}</h1>
      <h2>{pageContext.subtitle}</h2>
      <h5>{new Date(pageContext.publishedAt).toDateString()}</h5>
      <ReactMarkdown renderers={renderers}>{markdownContent.body}</ReactMarkdown>
    </div>
    </LayoutMargin>
  )
}