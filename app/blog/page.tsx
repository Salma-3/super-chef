import Link from 'next/link'
import React, { Suspense } from 'react'
import Pagination from '../ui/Pagination'
import prisma from '../lib/db'
import SearchForm from '../ui/forms/SearchForm'
import Image from 'next/image'
import ArticlesList from '@/app/ui/blog/ArticlesList'
import { Waiting } from '@/app/ui/Waiting'
import Recent from '../ui/blog/Recent'

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
                <Suspense fallback={<Waiting />}>
                    <ArticlesList offset={offset} limit={limit} search={search} />
                </Suspense>
                <div className="lg:w-1/4">
                    {/* <!-- Recent Articles will go here --> */}
                    <Suspense fallback={<span>Loading...</span>}>
                       <Recent />
                    </Suspense>
                </div>
            </div>
            <div className="flex justify-center my-8">
                <Pagination count={count} limit={limit}/>
            </div>

        </div>
    )
}

export default BlogIndex