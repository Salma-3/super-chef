import React from 'react'
import Star from '@/app/ui/Star'
import Image from 'next/image'
import Link from 'next/link'


type Props = {}

function RecipeItem({}: Props) {
  return (
                <Link href='#' className='flex flex-row gap-3 max-w-[300px] md:flex-col  w-full border-b md:border'>
                    <div className="relative w-full h-[106px] md:h-[200px] border border-gray-200">
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
                        <p>
                            <span className="me-1 text-yellow-500"><Star/></span>
                            <span className="me-1 text-yellow-500"><Star/></span>
                            <span className="me-1 text-yellow-500"><Star/></span>
                            <span className="me-1 text-yellow-500"><Star/></span>
                            <span className="me-1 text-yellow-500"><Star/></span>
                            <span className='ms-2 text-gray-600 text-sm'>(218)</span>
                        </p>
                    </div>
                </Link>
  )
}

export default RecipeItem