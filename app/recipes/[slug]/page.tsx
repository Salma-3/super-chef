import prisma from '@/app/lib/db'
import ReviewForm from '@/app/ui/forms/ReviewForm'
import Providers from '@/app/ui/Providers'
import Buttons from '@/app/ui/recipes/Buttons'
import Rating from '@/app/ui/recipes/Rating'
import RatingAnalysis from '@/app/ui/recipes/RatingAnalysis'
import RecipeContent from '@/app/ui/recipes/RecipeContent'
import ReviewItem from '@/app/ui/recipes/ReviewItem'
import Spinner from '@/app/ui/Spinner'
import { Waiting } from '@/app/ui/Waiting'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'

type Props = {
    params: {
        slug: string
    }
}

async function page({ params }: Props) {

    return (
        <main className=''>
            <Suspense fallback={<Waiting />}>
                <RecipeContent params={params} slug={params.slug}/>
            </Suspense>

        </main>
    )
}

export default page