import prisma from '@/app/lib/db'
import RecipeForm from '@/app/ui/forms/RecipeForm'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

async function  newRecipe({}: Props) {
  
  const session = await getServerSession(authOptions);

  if(!session?.user) {
    redirect('/')
  }

  const categories = await prisma.category.findMany()

    
  return (
    <main className=''>
        <div className="max-w-[700px] mx-auto p-8">
            <h4 className="text-3xl font-bold mb-4">New Recipe</h4>
            <hr />

            <div className='my-6'>
                <RecipeForm recipeData={null} authorId={session.user.id} categories={categories}/>
            </div>
        </div>
    </main>
  )
}

export default  newRecipe