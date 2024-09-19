import ReviewForm from '@/app/ui/forms/ReviewForm'
import Buttons from '@/app/ui/recipes/Buttons'
import Rating from '@/app/ui/recipes/Rating'
import RatingAnalysis from '@/app/ui/recipes/RatingAnalysis'
import ReviewItem from '@/app/ui/recipes/ReviewItem'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

function page({ }: Props) {
    return (
        <main className=''>
            {/* recipe image */}

            {/* ingredients list */}

            {/* instructions */}

            <section className="py-10 px-5 text-gray-600">

                <div>
                    <div className='mx-auto w-fit max-w-[600px]'>
                        <h1 className='text-3xl mb-5 font-bold text-gray-800'>Grilled Delmonico Steaks</h1>
                        <span className='text-gray-400 block my-4 md:m-0 md:float-end'>updated at 03/05/2024</span>
                        {/* rate shortcut */}
                        <div>
                            <div className='mb-10 flex'>
                                <Rating rate={3.5}/>

                                <Link href='#rating' className='ms-3 me-2 text-sm border-b border-primary hover:border-b-2 '>4.5</Link>
                                <span className='text-sm text-gray-500'>(467)</span>

                                <Link href='#reviews' className='mx-10 uppercase border-b border-primary text-sm hover:border-b-2'>380 reviews</Link>
                            </div>
                        </div>

                        <Buttons />
                        <Image className='block border border-gray-400' src='/images/dinner.jpg' width={600} height={400} alt='food' />

                        {/* servings, time and calories brief */}
                        <div className='py-10'>
                            <div className="flex gap-5 justify-center">
                                <div className="p-4 px-6 shadow-md text-center text-primary bg-primary/10">
                                    <span className="text-3xl ti ti-timer"></span>
                                    <span className='block text-lg'>30 min</span>
                                </div>
                                <div className="p-4 px-6 shadow-md text-center text-primary bg-primary/10">
                                    <span className="text-3xl font-bold">4</span>
                                    <span className='block text-lg'>Servings</span>
                                </div>
                                <div className="p-4 px-6 shadow-md text-center text-primary bg-primary/10">
                                    <span className="text-3xl font-bold">1000</span>
                                    <span className='block text-lg'>Calories</span>
                                </div>
                            </div>
                        </div>
                        {/* ingredients */}
                        <h3 className='text-2xl font-bold underline my-5'>Ingredients</h3>
                        <ul className='list-disc mx-7'>
                            <li className='mb-2'>
                                Lorem ipsum dolor sit amet, consectetur
                            </li>
                            <li className='mb-2'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                            </li>
                            <li className='mb-2'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            </li>
                            <li className='mb-2'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            </li>
                            <li className='mb-2'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            </li>
                        </ul>

                        <h3 className="text-2xl mb-5 mt-10 font-bold underline">Instructions</h3>

                        <ol className='list-decimal px-7 max-w-[600px]'>
                            <li className='mb-3'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex e
                            </li>

                            <li className='mb-3'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex e
                            </li>
                            <li className='mb-3'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex e
                            </li>
                            <li className='mb-3'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex e
                            </li>
                        </ol>

                        {/* Nutrition facts per serving */}

                        <div id='nutrition' className="my-5">
                            <h3 className='text-2xl mb-5 underline font-bold'>Nutrition Facts (per serving)</h3>
                            <div className="flex justify-center gap-10 text-lg text-center">
                                <div>
                                    <p>32g <br />Calories</p>
                                </div>
                                <div>
                                    <p>21g <br />Fat</p>
                                </div>
                                <div>
                                    <p>10g <br />Carbs</p>
                                </div>
                                <div>
                                    <p>25g <br />Protien</p>
                                </div>
                            </div>
                        </div>

                        {/* author */}

                        <div className='py-4 border-b border-gray-300'>
                            <h4 className='mb-6 text-2xl underline font-bold'>Author</h4>
                            <div className="flex gap-4 items-center">
                                <Image src='/images/avatar.png' height={50} width={50} alt='author avatar' className='rounded-full'/>
                                <div>
                                   <Link href="#" className='text-lg font-bold text-primary'>
                                        Anisha Moer
                                   </Link>
                                   <p className='text-gray-700'>Posted at 12/03/2024</p>
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
                                    <ReviewForm/>
                                    <RatingAnalysis ratings={[4.5, 5, 3, 3, 2, 5, 5]}/>
                                </div>
                            </div>

                            <div>
                                <div className="py-5 px-3 border-b">
                                    <h4 className="text-xl font-bold">130 Reviews</h4>
                                </div>
                                <ReviewItem />
                                <ReviewItem/>
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