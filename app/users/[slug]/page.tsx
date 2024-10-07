import prisma from '@/app/lib/db'
import RecipeCard from '@/app/ui/profile/RecipeCard'
import UserDetails from '@/app/ui/profile/UserDetails'
import ViewMoreBtn from '@/app/ui/ViewMoreBtn'
import React from 'react'

type Props = {
    params: { slug: string },
    searchParams: { limit: string }
}

async function userPage({ params: { slug }, searchParams: { limit }}: Props) {
    const take = Number(limit) || 3
    const user = await prisma.user.findUnique({ 
        where: { username: slug },
        include: { 
            recipes: {
                include: { category: true, image: true },
                take,
                orderBy: { createdAt: 'desc' }
            },
        },
    })

    if(!user) {
        return <div>Page Not Found</div>
    }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        
        {/* <!-- Header Section --> */}
        {/* @ts-ignore */}
        <UserDetails user={user}/>

        {/* <!-- Recipes Section --> */}
        <div>
            <h2 className="text-gray-700 text-xl font-semibold mb-4">Recent Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* <!-- Recipe Card --> */}
                
                {
                    user.recipes.map(rcp => (
                        <RecipeCard recipe={rcp} key={`rcp-${rcp.id}`} editable={false}/>
                    ))
                }

            </div>
            {user.recipes.length === take && <ViewMoreBtn initLimit={take}/>}
        </div>
    </div>
  )
}

export default userPage