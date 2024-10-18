import React from 'react'
import RecipeItem from './RecipeItem'
import { RecipeWithCategory } from '@/app/lib/definitions';
import prisma from '@/app/lib/db';
import Providers from '../Providers';

type SortBy = {
    rate?: 'desc';
    createdAt?: 'desc';
}

type Props = {
    user: { id: number; email: string; username: string; avatar: string } | undefined;
    favorites: number[];
    take: number;
    offset: number;
    where: any;
    sortBy: SortBy
}

async function RecipesList(props: Props) {
    const { user, favorites, take, offset, where, sortBy } = props
    const recipes: RecipeWithCategory[] = await prisma.recipe.findMany({
        where,
        include: { category: true, image: true },
        orderBy: sortBy,
        take,
        skip: offset
    });
    const userId = user?.id || null;

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 py-6'>
            <Providers params={props}>
                {/* recipe item */}
                {
                    recipes?.map(rcp => (
                        <RecipeItem favorited={favorites.includes(rcp.id)} userId={userId} key={rcp.id} data={rcp} />
                    ))
                }
            </Providers>

        </div>
    )
}

export default RecipesList