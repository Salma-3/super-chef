import React, { Suspense } from 'react'
import ReviewsList from './ReviewsList'
import prisma from '@/app/lib/db'
import Rating from './Rating';
import Link from 'next/link';
import Buttons from './Buttons';
import Providers from '../Providers';
import Image from 'next/image';
import Spinner from '../Spinner';

type Props = {
    slug: string;
    params: any
}

async function RecipeContent({ slug, params }: Props) {
    const recipe = await prisma.recipe.findUnique({
        where: { slug },
        include: {
            image: true,
            author: true,
            nutrition: true,
        }
    })

    if(!recipe) {
        return <div>404 Not Found</div>
    }

    const countReviews = await prisma.review.count({ where: { recipeId: recipe.id}})
    
  return (
    <section className="py-10 px-5 text-gray-600">

                <div>
                    <div className='mx-auto w-fit max-w-[600px]'>
                        <h1 className='text-3xl mb-5 font-bold text-gray-800'>{recipe?.name}</h1>
                        <span className='text-gray-400 block my-4 md:m-0 md:float-end'>updated at {recipe?.updatedAt.toLocaleDateString('en-AU') }</span>
                        {/* rate shortcut */}
                        <div>
                            <div className='mb-10 flex'>
                                <Rating rate={recipe.rate}/>

                                <Link href='#rating' className='ms-3 me-2 text-sm border-b border-primary hover:border-b-2 '>{recipe?.rate.toFixed(1)}</Link>
                                <span className='text-sm text-gray-500'>({countReviews})</span>

                                <Link href='#reviews' className='mx-10 uppercase border-b border-primary text-sm hover:border-b-2'>{countReviews} reviews</Link>
                            </div>
                        </div>
                        <Providers params={params}>
                          <Buttons recipeId={recipe?.id} />
                        </Providers>
                        <Image className='block border border-gray-400' src={recipe.image?.url!} width={600} height={400} alt='food' />

                        {/* servings, time and calories brief */}
                        <div className='py-10'>
                            <div className="flex gap-5 justify-center">
                                <div className="p-4 px-6 shadow-md text-center text-primary bg-primary/10">
                                    <span className="text-3xl ti ti-timer"></span>
                                    <span className='block text-lg'>{recipe.time}</span>
                                </div>
                                <div className="p-4 px-6 shadow-md text-center text-primary bg-primary/10">
                                    <span className="text-3xl font-bold">{recipe.servings}</span>
                                    <span className='block text-lg'>Servings</span>
                                </div>
                                <div className="p-4 px-6 shadow-md text-center text-primary bg-primary/10">
                                    <span className="text-3xl font-bold">{recipe.calories}</span>
                                    <span className='block text-lg'>Calories</span>
                                </div>
                            </div>
                        </div>
                        {/* ingredients */}
                        <h3 className='text-2xl font-bold underline my-5'>Ingredients</h3>
                        <ul className='list-disc mx-7'>
                            {
                                recipe.ingredients.map(ing => (
                                    <li key={`ing-${ing}`} className="mb-2">{ing}</li>
                                ))
                            }
                        </ul>

                        <h3 className="text-2xl mb-5 mt-10 font-bold underline">Instructions</h3>

                        <ol className='list-decimal px-7 max-w-[600px]'>
                            {
                                recipe.instructions.map(ins => (
                                    <li key={`ins-${ins}`} className="mb-3">{ins}</li>
                                ))
                            }
                        </ol>

                        {/* Nutrition facts per serving */}

                        <div id='nutrition' className="my-5">
                            <h3 className='text-2xl mb-5 underline font-bold'>Nutrition Facts (per serving)</h3>
                            <div className="flex justify-center gap-10 text-lg text-center">
                                {
                                    recipe.nutrition.map(nt => (
                                        <div key={nt.id}>
                                            <p>{nt.name} <br />{nt.value}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        {/* author */}

                        <div className='py-4 border-b border-gray-300'>
                            <h4 className='mb-6 text-2xl underline font-bold'>Author</h4>
                            <div className="flex gap-4 items-center">
                                <Image src={recipe.author?.avatar!} height={50} width={50} alt='author avatar' className='rounded-full'/>
                                <div>
                                   <Link href={`/users/${recipe.author?.username}`} className='text-lg font-bold text-primary'>
                                        {recipe.author?.username}
                                   </Link>
                                   <p className='text-gray-700'>Posted at {recipe.createdAt.toLocaleDateString('en-AU')}</p>
                                </div>
                            </div>
                        </div>

                        {/* reviews */}
                        <Suspense fallback={<Spinner />}>
                            <ReviewsList id={recipe.id} slug={recipe.slug} rate={recipe.rate} />
                        </Suspense>

                    </div>
                </div>

            </section>

  )
}

export default RecipeContent