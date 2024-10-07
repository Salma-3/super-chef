'use client'
import { deleteRecipe } from '@/app/lib/actions/recipes'
import React from 'react'
import { useRouter } from 'next/navigation'

type Props = {
    recipeId: number,
    imageId: number,
}

function DeleteBtn({ recipeId, imageId }: Props) {
    const router = useRouter();

    const onClick = async () => {
        if(window.confirm('Are you sure that you want to delete this recipe?')){
            await deleteRecipe(recipeId, imageId)
            router.push('/profile')
        }else
            return
    }
    return (
        <button onClick={onClick} type="button" className='block my-3 px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-700'>
            <span className="ti ti-trash"></span> Delete
        </button>
    )
}

export default DeleteBtn