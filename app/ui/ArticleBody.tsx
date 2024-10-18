'use client'
import MarkdownEditor from '@uiw/react-markdown-editor'
import React from 'react'

type Props = {
    src: string
}

function ArticleBody({ src }: Props) {
  return (
    <MarkdownEditor.Markdown source={src}/>
  )
}

export default ArticleBody