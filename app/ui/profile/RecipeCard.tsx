import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Rating from '@/app/ui/recipes/Rating'

type Props = {}

function RecipeCard({ }: Props) {
    return (
        <div className="group relative rounded-lg shadow-md overflow-hidden">
            <Link href='#' className='absolute inset-0'></Link>
            <Image src="https://via.placeholder.com/400x300" alt="Recipe Image" height={100} width={100} className="w-full h-32 object-cover" />
            <div className="p-4">
                <h3 className="text-gray-700 text-lg font-semibold group-hover:text-primary">Recipe Title</h3>
                <p className="text-sm text-gray-500">Category: Dessert</p>
                <div className="flex items-center mt-2">
                    <Rating rate={4.5}/>
                    <span className="ml-2 text-sm text-gray-600">(4.5/5)</span>
                </div>
            </div>
        </div>
    )
}

export default RecipeCard