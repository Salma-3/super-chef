import React from 'react'
import Image from 'next/image';
import prisma from '../lib/db';
import Link from 'next/link';

type Props = {}

async function FoodNews({}: Props) {
    const news = await prisma.article.findMany({ 
        orderBy: { createdAt: 'desc'}, 
        take: 3, 
        include: { image: true } 
    })

  return (
    <div className="news md:w-6/12 lg:w-4/12">
            <div className="w-100 py-4 px-6 bg-gray-100">
              <h3 className='text-2xl font-bold text-center'>Food News</h3>
              <ul className='mt-3'>
                {
                      news.map(article => (
                          <li key={article.slug} className='mb-6'>
                              <div className='flex gap-5'>
                                  <Image className='block' src={article.image?.url!} width={100} height={80} alt='news' />
                                  <div>
                                      <h5 className='text-lg font-bold hover:underline md:text-xl'>
                                          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                                      </h5>
                                      <p className='text-gray-600'>{article.createdAt.toDateString()}</p>
                                  </div>
                              </div>
                          </li>
                      ))
                }
              </ul>
            </div>
          </div>
  )
}

export default FoodNews