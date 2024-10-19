import prisma from '@/app/lib/db';
import ArticleForm from '@/app/ui/forms/ArticleForm';
import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    params: {
        slug: string
    }
}

async function EditArticlePage({ params }: Props) {
    const session = await getServerSession(authOptions)

    if(!session || !session.user) {
        redirect('/')
    }
    const article = await prisma.article.findFirst({ 
        where: {
            slug: params.slug
        },
        include: {
            image: true,
        }
     });

     if(session.user.id !== article?.authorId) {
        // TODO: Authorization denied
        redirect('/');
     }
     
  return (
    <main>
        <div className="max-w-[800px] mx-auto">
            <ArticleForm authorId={article.authorId} articleData={article}/>
        </div>
    </main>
  )
}

export default EditArticlePage