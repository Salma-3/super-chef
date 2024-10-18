import { ArticleWithImage } from '@/app/lib/definitions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    article: ArticleWithImage
}

function ArticleCard({ article  }: Props) {
    return (
        <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
            {article.image && <Image src={article.image.url} alt="Recipe Image" className="w-full h-48 object-cover" height={80} width={100}/>}
            <div className="p-4">
                <h3 className="text-xl text-gray-600 font-semibold mb-2">{article.title}</h3>
                <p>{article.body.substring(0, 100).replaceAll('#', '').replaceAll('*', '')}</p>
                <Link href={`/blog/${article.slug}`} className="block text-center py-2 px-4 bg-primary text-white rounded-md hover:bg-orange-800">Read More</Link>
            </div>
        </div>
    )
}

export default ArticleCard