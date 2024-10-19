import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import prisma from '@/app/lib/db'

type Props = {}

async function Recent({ }: Props) {
    const recent = await prisma.article.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { image: true },
    })

    return (
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
    )
}

export default Recent