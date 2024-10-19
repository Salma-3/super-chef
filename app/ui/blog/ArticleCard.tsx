'use client'
import { deleteArticle } from '@/app/lib/actions/blog'
import { ArticleWithImage } from '@/app/lib/definitions'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {
    article: ArticleWithImage;
    editable?: boolean;
    userId?: number;
}

function ArticleCard({ article, editable, userId  }: Props) {
    const url = editable ? `/blog/${article.slug}/edit` : `/blog/${article.slug}`
    const [deleteDisabled, setDisabled] = useState(false);
    const [visible, setVisible] = useState(true)

    const onDelete = async () => {
        if(!window.confirm('Are you sure that you want to delete this?')) return;
        setDisabled(true)
        if(!userId) return;
        const result = await deleteArticle(article.id, userId)
        if(result.success){
            setVisible(false)
        }
        setDisabled(false)
    }
    return (
        <div className={clsx("relative bg-white rounded-lg shadow-md overflow-hidden", !visible && 'hidden')}>
            {article.image && <Image src={article.image.url} alt="Recipe Image" className="w-full h-48 object-cover" height={80} width={100}/>}
            <div className="p-4">
                <h3 className="text-xl text-gray-600 font-semibold mb-2">{article.title}</h3>
                <p>{article.body.substring(0, 100).replaceAll('#', '').replaceAll('*', '')}</p>
                {
                    !editable ?
                    <Link href={url} className="block text-center py-2 px-4 bg-primary text-white rounded-md hover:bg-orange-800">
                       Read more
                    </Link>
                    : (
                        <div className='flex gap-3 mt-4'>
                            <Link href={`/blog/${article.slug}`} className="text-center py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                               <span className='md:hidden'>View</span> <span className="ti ti-eye"></span>
                            </Link>
                            <Link href={url} className="text-center py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                            <span className='md:hidden'>Edit</span> <span className="ti ti-pencil-alt"></span>
                            </Link>
                            <button disabled={deleteDisabled} onClick={onDelete} className="text-center py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300">
                            <span className='md:hidden'>Delete</span> <span className="ti ti-trash"></span>
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ArticleCard