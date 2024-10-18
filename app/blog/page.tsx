import Link from 'next/link'
import React from 'react'
import Pagination from '../ui/Pagination'
import prisma from '../lib/db'
import ArticleCard from '../ui/blog/ArticleCard'
import SearchForm from '../ui/forms/SearchForm'
import Image from 'next/image'

type Props = {
    searchParams: {
        page?: string,
        search?: string,
    }
}

async function BlogIndex({ searchParams: { page, search } }: Props) {
    const limit = 10
    const p = Number(page) || 1;
    const offset = (p-1) * limit;

    const articles = await prisma.article.findMany({
            where: {
                title: { contains: search, mode: 'insensitive' }
            },
            skip: offset,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                image: true,
            },

    });

    const count = await prisma.article.count({
        where: { title: { contains: search, mode: 'insensitive' }}
    })

    const recent = await prisma.article.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { image: true },
    })
        


    return (
        <div className='p-12'>
            <SearchForm className='mb-12 max-w-[500px] mx-auto' />
            <div className="flex flex-col-reverse gap-5 lg:flex-row">
                <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:w-3/4">
                    {/* <!-- Article Cards will go here --> */}
                    
                    {
                        articles.map(arcl => (
                            <ArticleCard key={arcl.slug} article={arcl} />
                        ))
                    }
                </div>
                <div className="lg:w-1/4">
                    {/* <!-- Recent Articles will go here --> */}
                    <div className="bg-white rounded-lg shadow-md p-5">
                        <h3 className="text-lg font-semibold mb-4">Recent Articles</h3>
                        <ul className="space-y-3">
                            {
                                recent.map(arc => (
                                    <li key={`recent-${arc.id}`} className='group relative flex gap-3 h-[80px]'>
                                        <Link href={`/blog/${arc.slug}`} className='absolute inset-0'></Link>
                                        <Image src={arc.image?.url!} height={80} width={100} alt="article" />
                                        <div>
                                            <h6 className='group-hover:text-primary'>{arc.title}</h6>
                                            <span className="text-xs text-gray-500">{arc.createdAt.toDateString()}</span>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex justify-center my-8">
                <Pagination count={count} limit={limit}/>
            </div>

        </div>
    )
}

export default BlogIndex