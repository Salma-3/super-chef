import prisma from '@/app/lib/db'
import ReviewForm from '@/app/ui/forms/ReviewForm'
import Providers from '@/app/ui/Providers'
import Buttons from '@/app/ui/recipes/Buttons'
import Rating from '@/app/ui/recipes/Rating'
import RatingAnalysis from '@/app/ui/recipes/RatingAnalysis'
import ReviewItem from '@/app/ui/recipes/ReviewItem'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    params: {
        slug: string
    }
}

async function page({ params }: Props) {
    const recipe = await prisma.recipe.findFirst({ 
        where: { slug: params.slug }, 
        include: { 
            nutrition: true,
            author: true, 
            category: true,
            image: true
        }
    })

    const reviews = await prisma.review.findMany({ 
        where: { 
            recipe: { 
                slug: params.slug 
            }
        }, 
        include: { author: true },
        orderBy: { createdAt: 'desc' }
    })

    const reviewsWithComment = reviews.filter(rv => !!rv.body)
    const rateNumbers = reviews.map(rv => rv.rate);
    

    if(!recipe) {
        return <main>Not Found</main>
    }

    return (
        <main className=''>
          
            <section className="py-10 px-5 text-gray-600">

                <div>
                    <div className='mx-auto w-fit max-w-[600px]'>
                        <h1 className='text-3xl mb-5 font-bold text-gray-800'>{recipe?.name}</h1>
                        <span className='text-gray-400 block my-4 md:m-0 md:float-end'>updated at {recipe?.updatedAt.toLocaleDateString('en-AU') }</span>
                        {/* rate shortcut */}
                        <div>
                            <div className='mb-10 flex'>
                                <Rating rate={recipe?.rate}/>

                                <Link href='#rating' className='ms-3 me-2 text-sm border-b border-primary hover:border-b-2 '>{recipe?.rate.toFixed(1)}</Link>
                                <span className='text-sm text-gray-500'>({reviews.length})</span>

                                <Link href='#reviews' className='mx-10 uppercase border-b border-primary text-sm hover:border-b-2'>{reviewsWithComment.length} reviews</Link>
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

                        <div id='reviews' className='my-10'>
                            <h4 className="text-2xl mb-3 font-bold underline">
                                Reviews
                            </h4>
                            <p className='mb-10'>checkout our community <Link className='text-primary' href='#'>guidelines</Link> about reviews</p>

                            <div className="p-6 bg-gray-100">
                                <div className="py-4 px-4 bg-white md:px-8">
                                    <Providers params={params} >
                                       <ReviewForm slug={recipe.slug} recipeId={recipe.id}/>
                                    </Providers>
                                    <RatingAnalysis totalRating={recipe.rate} ratings={rateNumbers}/>
                                </div>
                            </div>

                            <div id='reviewList'>
                                <div className="py-5 px-3 border-b">
                                    <h4 className="text-xl font-bold">{reviewsWithComment.length} Reviews</h4>
                                </div>
                                {
                                    reviewsWithComment.map(rv => (
                                        // @ts-ignore
                                        <ReviewItem key={rv.id}  review={rv}/>
                                    ))
                                }
                            </div>

                        </div>

                    </div>
                </div>

            </section>


            {/* similar recipes section */}
        </main>
    )
}

export default page