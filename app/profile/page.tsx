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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MyArticles from '../ui/profile/MyArticles'

type Props = {
    searchParams: {
        limit: string
    }
}

async function profilePage({ searchParams: { limit } }: Props) {
    const take = Number(limit) || 6

    const session = await getServerSession(authOptions)
    console.log('session user', session?.user)

    if (!session) {
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
            favorites: {
                include: {
                    recipe: {
                        include: {
                            image: true, 
                            category: true,
                        }
                    }
                }
            },
            articles: {
                orderBy: { createdAt: 'desc' },
                include: {
                    image: true
                }
            }
        }
    })

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            {/* <!-- Header Section --> */}
            {/* @ts-ignore */}
            {session?.user && <UserDetails user={fullUser} editable />}

            <Tabs defaultValue="myRecipes" className="w-[100%]">
                <TabsList className='w-full'>
                    <TabsTrigger value="myRecipes">My Recipes</TabsTrigger>
                    <TabsTrigger value="favorites">Favorites</TabsTrigger>
                    <TabsTrigger value="articles">Articles</TabsTrigger>
                </TabsList>
                <TabsContent value="myRecipes">
                    <div>
                        <h2 className="mt-3 text-gray-700 text-xl font-semibold mb-4">My Recipes</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {
                                fullUser?.recipes.map(rcp => (
                                    <RecipeCard recipe={rcp} key={`card-${rcp.id}`} editable />
                                ))
                            }

                            {
                                fullUser && fullUser?.recipes.length < 1 && (
                                    <div className='text-gray-500 center'>You didn&apos;t post any recipes</div>
                                )
                            }

                        </div>
                        {fullUser?.recipes.length !== 0 && <ViewMoreBtn initLimit={take} />} <div className="mt-8 pb-12 border-b">
                        <Link href='/recipes/new' className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-darkorange">
                            Add New Recipe
                        </Link>
                    </div>
                    </div>
                </TabsContent>
                <TabsContent value="favorites">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        fullUser?.favorites.map(fv => (
                            <RecipeCard key={`favorites-${fv.id}`} recipe={fv.recipe} editable={false}/>
                        ))
                    }
                    </div>
                </TabsContent>
                <TabsContent value="articles">
                    <MyArticles userId={session.user.id} articles={fullUser?.articles || []}/>
                    <div className="my-3">
                        <Link className='px-3 py-1 my-3 rounded-lg bg-primary text-white hover:bg-darkorange' href='/blog/new'>
                            New Blog Post
                        </Link>
                    </div>
                  
                </TabsContent>
            </Tabs>


            {/* <!-- Recipes Section --> */}
           




            <div className="my-10">
                <ProfileForm userId={session.user.id} />
            </div>
        </div>
    )
}

export default profilePage