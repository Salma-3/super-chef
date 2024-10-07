import ProfileForm from '@/app/ui/forms/ProfileForm'
import RecipeCard from '@/app/ui/profile/RecipeCard'
import Link from 'next/link'
import React from 'react'
import UserDetails from '@/app/ui/profile/UserDetails'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import prisma from '../lib/db'
import ViewMoreBtn from '../ui/ViewMoreBtn'

type Props = {
    searchParams: {
        limit: string
    }
}

async function profilePage({ searchParams: { limit }}: Props) {
    const take = Number(limit) || 6

    const session = await getServerSession(authOptions)
    console.log('session user', session?.user)

    if(!session) {
        redirect('/')
    }

    const fullUser = await prisma.user.findUnique({ 
        where: { id: session.user.id }, 
        include: { 
            recipes: {
                include: { category: true, image: true },
                take,
                orderBy: {
                    updatedAt: 'desc'
                }
            }, 
        }
    })

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        {/* <!-- Header Section --> */}
        {/* @ts-ignore */}
        {session?.user && <UserDetails user={fullUser} editable/>}

        {/* <!-- Recipes Section --> */}
        <div className="mt-8 pb-12 border-b">
            <Link href='/recipes/new' className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-darkorange">
                Add New Recipe
            </Link>
        </div>
        <div>
            <h2 className="mt-3 text-gray-700 text-xl font-semibold mb-4">My Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
               {
                fullUser?.recipes.map(rcp => (
                    <RecipeCard recipe={rcp} key={`card-${rcp.id}`} editable />
                ))
               }

            </div>
            <ViewMoreBtn initLimit={take}/>
        </div>

        

        <div className="my-10">
            <ProfileForm userId={session.user.id} />
        </div>
    </div>
  )
}

export default profilePage