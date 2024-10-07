import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Rating from '@/app/ui/recipes/Rating'
import { RecipeWithCategory } from '@/app/lib/definitions'

type Props = {
    recipe: RecipeWithCategory,
    editable: boolean
}

function RecipeCard({ recipe, editable }: Props) {
    const url = editable ? `/recipes/edit/${recipe.id}` : `/recipes/${recipe.slug}`
    return (
        <div className="group relative rounded-lg shadow-md overflow-hidden">
            <Link href={url} className='absolute inset-0'></Link>
            <Image src={recipe.image?.url!} alt="Recipe Image" height={100} width={100} className="w-full h-32 object-cover" />
            <div className="p-4">
                <h3 className="text-gray-700 text-lg font-semibold group-hover:text-primary">{recipe.name}</h3>
                <p className="text-sm text-gray-500">Category: {recipe.category.name}</p>
                <div className="flex items-center mt-2">
                    <Rating rate={recipe.rate}/>
                    <span className="ml-2 text-sm text-gray-600">({recipe.rate}/5)</span>
                </div>
            </div>
        </div>
    )
}

export default RecipeCard