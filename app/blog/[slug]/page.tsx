import prisma from '@/app/lib/db'
import ArticleBody from '@/app/ui/ArticleBody'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CommentForm from '@/app/ui/forms/CommentForm'
import CommentsList from '@/app/ui/blog/CommentsList'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import ArticleContent from '@/app/ui/blog/ArticleContent'

type Props = {
  params: {
    slug: string
  }
}

async function Blog({ params: { slug } }: Props) {

  return (
    <main>
      <div className="flex justify-center px-4 py-12">
        <ArticleContent slug={slug}/>
      </div>
    </main>
  )
}

export default Blog