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

    const { image, body, title } = article ;

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
       <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-[400px]">
      {/* Header Image */}
      <div className="relative w-full h-48">
        {image && <Image
          src={image.url}
          alt="Card Header Image"
          fill
          className="object-cover"
        />}
      </div>

      {/* Text Content */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600">{body.substring(0, 100).replaceAll('*', '').replaceAll('#', '').concat('...')}</p>
        </div>
        <div className="mt-4">
          { !editable ? <Link
            href={url}
            className="block text-center py-2 px-4 bg-primary text-white rounded-md hover:bg-orange-800"
          >
            Read more
          </Link>  : (
            <div className='flex w-full gap-3'>
                <Link
                    href={`/blog/${article.slug}`}
                    className="text-center py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                    <span className='md:hidden'>View</span> <span className="ti ti-eye"></span>
                </Link>
                <Link
                    href={url}
                    className="text-center py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                    <span className='md:hidden'>Edit</span> <span className="ti ti-pencil-alt"></span>
                </Link>
                <button
                    disabled={deleteDisabled}
                    onClick={onDelete}
                    className="text-center py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300"
                >
                    <span className='md:hidden'>Delete</span> <span className="ti ti-trash"></span>
                </button>
            </div>
          )
         }
        </div>

      </div>
    </div> 
    )
}

export default ArticleCard