import React from 'react'
import Star from '@/app/ui/Star'
import Image from 'next/image'
import Link from 'next/link'
import Rating from './Rating'


type Props = {}

function RecipeItem({}: Props) {
  return (
                <Link href='/recipes/1' className='flex flex-row gap-3 pb-4 md:flex-col md:pb-0  w-full border-b md:border'>
                    <div className="relative md:w-full w-[170px] h-[106px] md:h-[200px] border border-gray-200">
                        <Image src='/images/dinner.jpg' fill alt='recipe cover' />
                        <button className='block absolute top-2 right-2 pt-2 w-[40px] h-[40px] rounded-full text-2xl text-white bg-primary hover:bg-primary/80'>
                            <i className='ti ti-heart'></i>
                        </button>
                    </div>
                    <div className='md:px-3 md:pb-4'>
                        <p className="text-gray-500 text-sm uppercase mb-2">Roasted Bread</p>
                        <h6 className="text-lg font-bold">
                            Show cooker buffalo chicken sandawiches
                        </h6>
                        <Rating rate={5}/>
                    </div>
                </Link>
  )
}

export default RecipeItem