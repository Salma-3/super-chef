import ArticleForm from '@/app/ui/forms/ArticleForm'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

async function NewArticle({}: Props) {
    const session = await getServerSession(authOptions)

    console.log('session', session)

    if(!session?.user) {
      redirect('/')
    }
    
  return (
    <main className='overflow-hidden'>
      <div className="flex justify-center">
        <ArticleForm authorId={session.user.id}/>
      </div>
    </main>
  )
}

export default NewArticle