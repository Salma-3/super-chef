import React, { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ArticleBody from '../ArticleBody'
import prisma from '@/app/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import CommentForm from '../forms/CommentForm'
import CommentsList from './CommentsList'
import Spinner from '../Spinner'

type Props = {
    slug: string
}

async function ArticleContent({ slug }: Props) {
    const article = await prisma.article.findFirst({ 
        where: { slug }, 
        include: { 
          image: true, 
          author: true, 
        } 
      })
    
      console.log(article)
    
      if (!article) return <div>404 Not Found</div>
    
      const session = await getServerSession(authOptions);
  return (
    <div className='max-w-[800px]'>
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <hr />
          <div className="my-6">
            {article.image && <Image className='mb-4' src={article.image?.url} height={article.image?.height} width={article.image?.width} alt='article cover' />}
            <ArticleBody src={article.body} />
          </div>
          <hr />
          <div className='flex items-center gap-4 p-3'>
            <Image src={article.author?.avatar} alt='avatar' width={80} height={80} className='rounded-full' />
            <div>
              <Link href={`/users/${article.author?.username}`} className='text-lg'>{article.author?.username}</Link>
              <p className='text-gray-500'>posted at {article.createdAt.toLocaleDateString()}</p>
            </div>
          </div>
          <section className="bg-white rounded-lg shadow-md p-6 mt-12">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>

            {/* <!-- Comment Form --> */}
            <div className="mb-6">
              <CommentForm authorId={session?.user.id} articleId={article.id}/>
            </div>

            {/* <!-- Comments List --> */}
            {/* @ts-ignore */}
            <Suspense fallback={<Spinner />}>
               <CommentsList userId={session?.user.id} articleId={article.id}/>
            </Suspense>
          </section>
        </div>
  )
}

export default ArticleContent