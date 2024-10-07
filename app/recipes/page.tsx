import { Metadata } from 'next'
import React, { Suspense } from 'react'
import Filter from '@/app/ui/recipes/Filter'
import RecipesList from '@/app/ui/recipes/RecipesList'
import Pagination from '@/app/ui/Pagination'
import prisma from '@/app/lib/db'
import SearchForm from '@/app/ui/forms/SearchForm'
import { RecipeWithCategory } from '../lib/definitions'
import { buildRecipeQuery, searchParamsSantizer } from '../utils'

type Props = {
  searchParams?: {
    search?: string;
    page?: string;
    tags?: string[];
    categories: string[];
  }
}

export const metadata: Metadata = {
  title: 'Recipes'
}

async function RecipesIndex({ searchParams }: Props) { 
  const params = searchParamsSantizer(searchParams || {})
  const currentPage = params.page;
  const take = 10;
  const offset = (currentPage - 1) * take;

  const where = buildRecipeQuery(params);

  
  // @ts-ignore
  const recipes: RecipeWithCategory[] = await prisma.recipe.findMany({ where, 
    include: { category: true, image: true }, 
    orderBy: {createdAt: 'desc' },
    take, 
    skip: offset
   }) 
  // @ts-ignore
  const recipesCount = await prisma.recipe.count({ where })

  const categories = await prisma.category.findMany();

  const tags: {tag: string}[] = await prisma.$queryRaw`SELECT DISTINCT UNNEST(tags) as tag FROM "Recipe";`;

  return (
    <main className='overflow-hidden'>
      <section id='recipesHero' className='relative'>
        <div className="absolute left-0 right-0 bottom-0 top-0 bg-black opacity-40"></div>
        <div className="absolute w-[90%] h-[100px] top-10 left-[5%] bg-white/50 rounded-xl md:w-[70%] md:left-[15%] md:top-[30%]"></div>
        <SearchForm />
      </section>
      <section className='py-20 px-6'>
        <div className="flex flex-col gap-5 lg:flex-row md:gap-10">
          {/* filter */}

          <Filter categories={categories} tags={tags}/>
          {/* recipes list */}
          <div className="w-full lg:w-8/12">
            <div className="flex justify-between items-start pb-7 border-b border-gray-300">
              <p className='text-gray-500'><b className='text-primary underline'>{recipesCount}</b> recipes found</p>
              <select name="sort" id="sort" className='px-2 border border-gray-300'>
                <option value="">Sort</option>
                <option value="highrate">By Rate</option>
                <option value="newest">Newest</option>
                <option value="quick">Quick</option>
              </select>
            </div>

            {/* recipes list */}

            <RecipesList recipes={recipes}/>

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