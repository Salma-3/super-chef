import Image from 'next/image'
import React from 'react'
import Rating from './Rating'
import { ReviewWithAuthor } from '@/app/lib/definitions'

type Props = {
  review: ReviewWithAuthor
}

function ReviewItem({ review }: Props) {
  return (
    <div className='py-3 border-b'>
        <div className='flex gap-5 items-center'>
            <Image src={review.author.avatar} className='rounded-full' width={50} height={50} alt='avatar' />
            <h4 className='text-lg'>{review.author.username}</h4>
        </div>
        <div className='flex gap-3 mt-2'>
            <Rating rate={review.rate}/>
            <span className='font-thin text-gray-400'>{review.createdAt.toLocaleDateString('en-AU')}</span>
        </div>
        <p className='mt-3'>
          {review.body}
        </p>
    </div>
  )
}

export default ReviewItem