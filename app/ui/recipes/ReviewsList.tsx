import React from 'react'
import RatingAnalysis from './RatingAnalysis'
import Providers from '../Providers'
import ReviewForm from '../forms/ReviewForm'
import ReviewItem from './ReviewItem'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import Link from 'next/link'
import prisma from '@/app/lib/db'

type Props = {
    slug: string;
    id: number;
    rate: number;
}

async function ReviewsList({ slug, id, rate }: Props) {
    const session = await getServerSession(authOptions);

    const reviews = await prisma.review.findMany({
        where: {
            recipeId: id
        },
        include: {
            author: true
        }
    })
    const reviewsWithComment = reviews.filter(rv => !!rv.body);
    const rateNumbers = reviews.map(rv => rv.rate);

    return (
        <div id='reviews' className='my-10'>
            <h4 className="text-2xl mb-3 font-bold underline">
                Reviews
            </h4>
            <p className='mb-10'>checkout our community <Link className='text-primary' href='#'>guidelines</Link> about reviews</p>

            <div className="p-6 bg-gray-100">
                <div className="py-4 px-4 bg-white md:px-8">
                    <ReviewForm slug={slug} recipeId={id} userId={session?.user.id} />
                    <RatingAnalysis totalRating={rate} ratings={rateNumbers} />
                </div>
            </div>

            <div id='reviewList'>
                <div className="py-5 px-3 border-b">
                    <h4 className="text-xl font-bold">{reviewsWithComment.length} Reviews</h4>
                </div>
                {
                    reviewsWithComment.map(rv => (
                        // @ts-ignore
                        <ReviewItem key={rv.id} review={rv} />
                    ))
                }
            </div>

        </div>
    )
}

export default ReviewsList