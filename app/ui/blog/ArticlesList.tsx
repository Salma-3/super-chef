import prisma from '@/app/lib/db';
import React from 'react'
import ArticleCard from './ArticleCard';

type Props = {
    offset: number;
    limit: number;
    search?: string;
}

async function ArticlesList({ limit, offset, search }: Props) {
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
    return (
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:w-3/4">
            {/* <!-- Article Cards will go here --> */}

            {
                articles.map(arcl => (
                    <ArticleCard key={arcl.slug} article={arcl} />
                ))
            }
        </div>
    )
}

export default ArticlesList