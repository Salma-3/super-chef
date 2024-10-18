import { Metadata } from 'next'
import React, { Suspense } from 'react'
import Filter from '@/app/ui/recipes/Filter'
import RecipesList from '@/app/ui/recipes/RecipesList'
import Pagination from '@/app/ui/Pagination'
import prisma from '@/app/lib/db'
import SearchForm from '@/app/ui/forms/SearchForm'
import { RecipeWithCategory, SORT_CRIT } from '../lib/definitions'
import { buildRecipeQuery, searchParamsSantizer } from '../utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import Spinner from '../ui/Spinner'
import Sort from '../ui/recipes/Sort'

type Props = {
  searchParams?: {
    search?: string;
    page?: string;
    tags?: string[];
    categories: string[];
    sort: SORT_CRIT
  },
  params: any
}

export const metadata: Metadata = {
  title: 'Recipes'
}

async function RecipesIndex({ searchParams, params }: Props) { 
  const prms = searchParamsSantizer(searchParams || {})
  const currentPage = prms.page;
  const take = 12;
  const offset = (currentPage - 1) * take;
  const sortBy = searchParams?.sort === SORT_CRIT.RATE ? { rate: 'desc' } : { createdAt: 'desc'}

  const where = buildRecipeQuery(prms);

  const session = await getServerSession(authOptions)

  
  // @ts-ignore
  const recipesCount = await prisma.recipe.count({ where })

  const categories = await prisma.category.findMany();

  const tags: {tag: string}[] = await prisma.$queryRaw`SELECT DISTINCT UNNEST(tags) as tag FROM "Recipe";`;
  
  const userFavorites = session?.user.favorites || []

  return (
    <main className='overflow-hidden'>
      <section id='recipesHero' className='relative'>
        <div className="absolute left-0 right-0 bottom-0 top-0 bg-black opacity-40"></div>
        <div className="absolute w-[90%] h-[100px] top-10 left-[5%] bg-white/50 rounded-xl md:w-[70%] md:left-[15%] md:top-[30%]"></div>
        <SearchForm className='absolute w-[80%] top-20 left-10 z-10 md:w-[70%] md:left-[20%] md:top-[43%]'/>
      </section>
      <section className='py-20 px-6'>
        <div className="flex flex-col gap-5 lg:flex-row md:gap-10">
          {/* filter */}
          <Filter categories={categories} tags={tags.map(t => t.tag)}/>
          {/* recipes list */}
          <div className="w-full lg:w-8/12">
            <div className="flex justify-between items-start pb-7 border-b border-gray-300">
              <p className='text-gray-500'><b className='text-primary underline'>{recipesCount}</b> recipes found</p>
              <Sort />
            </div>

            {/* recipes list */}
            
            <Suspense fallback={
              <div className="flex justify-center items-center h-48">
                <Spinner/>
              </div>
            }>
              <RecipesList {...params} take={take} offset={offset} sortBy={sortBy} where={where} favorites={userFavorites} user={session?.user} />
            </Suspense>

            {/* pagination */}
            <div className="text-center mt-10">
              <Suspense fallback={<span>Loading</span>}>
                <Pagination count={recipesCount} limit={take} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default RecipesIndex