'use client';
import React, { useState } from 'react'
import Star from '@/app/ui/Star'

type Props = {
    onRatingChange?: (val: number) => void;
}

function RatingInput({ onRatingChange }: Props) {

    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (val: number) => {
        setRating(val);
        if(onRatingChange) {
            onRatingChange(val)
        }
    }

    const hanldeMouseEnter = (val: number) => setHoverRating(val)
    const handleMouseLeave = () => setHoverRating(0)


    
  return (
    <div className='text-yellow-500'>
       {
        [...Array(5)].map((_, index) => {
            const starValue = index + 1;

            return (
            <span onClick={() => handleClick(starValue)} onMouseEnter={() => hanldeMouseEnter(starValue)} onMouseLeave={handleMouseLeave} key={`star-input-${starValue}`} className="me-2 inline-block cursor-pointer">
                <Star filled={starValue <= (hoverRating || rating)}/>
            </span>)
        })
       }
    </div>
  )
}

export default RatingInput