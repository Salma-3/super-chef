import React from 'react'
import Star from '@/app/ui/Star'

type Props = {
    rate: number;
}

function Rating({ rate }: Props) {

    const fullStars = Math.floor(rate)
    const hasHalfStar = rate % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className='text-yellow-500'>
            {
                [...Array(fullStars)].map((_, index) => (
                    <span key={`star-full-${index}`} className="me-1 inline-block">
                        <Star filled/>
                    </span>
                ))
            }

            {
                hasHalfStar && <span className="me-1 inline-block">
                    <Star half/>
                </span>
            }

            {
                [...Array(emptyStars)].map((_, index) => (
                    <span className='me-1 inline-block' key={`empty-star-${index}`}>
                        <Star />
                    </span>
                ))
            }
        </div>
    )
}

export default Rating