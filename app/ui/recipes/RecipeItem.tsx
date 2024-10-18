'use client';
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Rating from './Rating'
import { RecipeWithCategory } from '@/app/lib/definitions'
import toast from 'react-hot-toast';
import { favorite, unfavorite } from '@/app/lib/actions/recipes';
import { useSession } from 'next-auth/react';


type Props = {
    data: RecipeWithCategory;
    userId: number | null;
    favorited: boolean;
 }

function 
RecipeItem({ data, userId, favorited }: Props) {

    const [isFavorite, setFavorite] = useState(favorited)
    const { update, data: sessionData } = useSession()

    const onFavorite = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if(!userId) {
            toast.error('You need to sign in')
            return ;
        }
        const recipeId = Number(event.currentTarget.getAttribute('data-recipe'));
        
        if(isFavorite) {
            setFavorite(false);
            const result = await unfavorite(recipeId, userId)
            if(result) {
                toast.success('recipe unsaved')
            }
            sessionData?.user && update({
                user: {
                    ...sessionData?.user,
                    favorites: sessionData?.user.favorites.filter(id => id !== recipeId)
                }
            })

        } else {
            setFavorite(true)
            const saved = await favorite(recipeId, userId)
            if(saved) {
                toast.success('Saved successfully')
            }

            sessionData?.user && update({
                user: {
                    ...sessionData?.user,
                    favorites: [...sessionData?.user.favorites, recipeId]
                }
            })
        }
        
        return false;
    }
  return (
                <Link href={`/recipes/${data.slug}`} className='group flex flex-row gap-3 pb-4 md:flex-col md:pb-0  w-full border-b md:border'>
                    <div className="relative md:w-full w-[170px] h-[106px] md:h-[200px] border border-gray-200">
                        <Image src={data.image?.url!} placeholder='empty' sizes='(max-width: 768px) 50vw' fill alt='recipe cover' />
                        <button data-recipe={data.id} type='button' onClick={onFavorite} className='block absolute top-2 right-2 w-[35px] h-[35px] rounded-full text-xl text-white bg-primary hover:bg-darkorange'>
                            <HeartIcon filled={isFavorite}/>
                        </button>
                    </div>
                    <div className='md:px-3 md:pb-4'>
                        <p className="text-gray-500 text-sm uppercase mb-2">
                            {data.category.name}
                        </p>
                        <h6 className="text-lg font-bold group-hover:text-primary">
                            {data.name}
                        </h6>
                        <Rating rate={data.rate}/>
                        <div className='flex h-[20px] flex-wrap'>
                          {
                            data.tags.map((tag, i) => (
                                <span key={`tg-${i}-${tag}`} className='m-1 text-sm bg-primary text-white px-2'>
                                    {tag}
                                </span>
                            ))
                          }
                        </div>
                    </div>
                </Link>
  )
}

export default RecipeItem


export const HeartIcon = ({ filled }: { filled?: boolean }) => {
    if(filled) return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="inline-block" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
        </svg>
    )

    else return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="inline-block" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
        </svg>
      
    )
}