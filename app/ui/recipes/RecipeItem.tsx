import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Rating from './Rating'
import { RecipeWithCategory } from '@/app/lib/definitions'


type Props = {
    data: RecipeWithCategory
 }

function RecipeItem({ data }: Props) {
  return (
                <Link href={`/recipes/${data.slug}`} className='group flex flex-row gap-3 pb-4 md:flex-col md:pb-0  w-full border-b md:border'>
                    <div className="relative md:w-full w-[170px] h-[106px] md:h-[200px] border border-gray-200">
                        <Image src={data.image?.url!} fill alt='recipe cover' />
                        <button className='block absolute top-2 right-2 pt-2 w-[40px] h-[40px] rounded-full text-2xl text-white bg-primary hover:bg-darkorange'>
                            <i className='ti ti-heart'></i>
                        </button>
                    </div>
                    <div className='md:px-3 md:pb-4'>
                        <p className="text-gray-500 text-sm uppercase mb-2">
                            {data.category.name}
                        </p>
                        <h6 className="text-lg font-bold group-hover:text-primary">
                            {data.name}
                        </h6>
                        <Rating rate={data.rate}/>
                        <div className='flex h-[20px] flex-wrap'>
                          {
                            data.tags.map((tag, i) => (
                                <span key={`tg-${i}-${tag}`} className='m-1 text-sm bg-primary text-white px-2'>
                                    {tag}
                                </span>
                            ))
                          }
                        </div>
                    </div>
                </Link>
  )
}

export default RecipeItem