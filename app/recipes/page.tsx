import { Metadata } from 'next'
import React, { Suspense } from 'react'
import Filter from '@/app/ui/recipes/Filter'
import RecipesList from '@/app/ui/recipes/RecipesList'
import Pagination from '@/app/ui/Pagination'

type Props = {}

export const metadata: Metadata = {
  title: 'Recipes'
}

function RecipesIndex({ }: Props) {
  
  return (
    <main className='overflow-hidden'>
      <section id='recipesHero' className='relative'>
        <div className="absolute left-0 right-0 bottom-0 top-0 bg-black opacity-40"></div>
        <div className="absolute w-[90%] h-[100px] top-10 left-[5%] bg-white/50 rounded-xl md:w-[70%] md:left-[15%] md:top-[30%]"></div>
        <form className='absolute w-[80%] top-20 left-10 z-10 md:w-[70%] md:left-[20%] md:top-[43%]' action="">
          <div className="flex gap-2">
            <input type="search" placeholder='search' className='w-8/12 w-10/12 px-3 py-1 bg-white rounded-full ring-primary' />
            <button type="submit" className='w-3/12 md:w-2/12 px-3 text-white bg-primary rounded-full hover:bg-primary/70'>search</button>
          </div>
        </form>
      </section>
      <section className='py-20 px-6'>
        <div className="flex flex-col gap-5 lg:flex-row md:gap-10">
          {/* filter */}
          <Filter />
          {/* recipes list */}
          <div className="w-full lg:w-8/12">
            <div className="flex justify-between items-start pb-7 border-b border-gray-300">
              <p className='text-gray-500'><b className='text-primary underline'>102</b> recipes found</p>
              <select name="sort" id="sort" className='px-2 border border-gray-300'>
                <option value="">Sort</option>
                <option value="highrate">By Rate</option>
                <option value="newest">Newest</option>
                <option value="quick">Quick</option>
              </select>
            </div>

            {/* recipes list */}

            <RecipesList />

            {/* pagination */}
            <div className="text-center mt-10">
              <Suspense fallback={<span>Loading</span>}>
                <Pagination count={1000} limit={10} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default RecipesIndex