import Image from 'next/image'
import React from 'react'
import Star from '../Star'
import RecipeItem from './RecipeItem'

type Props = {}

function RecipesList({ }: Props) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 py-6'>
            {/* recipe item */}
            <RecipeItem/>
            <RecipeItem/>
            <RecipeItem/>
            <RecipeItem/>
            <RecipeItem/>
        </div>
    )
}

export default RecipesList