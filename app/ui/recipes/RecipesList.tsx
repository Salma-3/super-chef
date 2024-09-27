import React from 'react'
import RecipeItem from './RecipeItem'
import { RecipeWithCategory } from '@/app/lib/definitions';


type Props = {
    recipes: RecipeWithCategory[]
}

function RecipesList({ recipes }: Props) {

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 py-6'>
            {/* recipe item */}
            {
                recipes?.map(rcp => (
                    <RecipeItem key={rcp.id} data={rcp}/>
                ))
            }
        </div>
    )
}

export default RecipesList