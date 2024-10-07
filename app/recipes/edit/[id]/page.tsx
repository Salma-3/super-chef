import prisma from '@/app/lib/db'
import RecipeForm from '@/app/ui/forms/RecipeForm'
import DeleteBtn from '@/app/ui/recipes/DeleteBtn'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: {
        id: number
    }
}

async function  edtiPage({ params }: Props) {

  const id = Number(params.id)
  
  const session = await getServerSession(authOptions);

  if(!session?.user) {
    redirect('/')
  }

  const categories = await prisma.category.findMany()
  

  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      image: true,
      category: true,
      nutrition: true,
      author: true,
    }
  })

  if(!recipe) {
    return <div>404 Not Found</div>
  }

    
  return (
    <main className=''>
        <div className="max-w-[700px] mx-auto p-8">
            <h4 className="text-3xl font-bold mb-4">Edit Recipe</h4>
            <hr />

            <div className='my-6'>
                {/* @ts-ignore */}
                <RecipeForm recipeData={recipe} authorId={session.user.id} categories={categories}/>
                <hr className='my-4' />
                <DeleteBtn imageId={recipe?.imageId!} recipeId={id}/>
            </div>
        </div>
    </main>
  )
}

export default  edtiPage