'use client';
import React, { useEffect, useState } from 'react'
import Rating from './Rating'

type Props = {
    ratings: number[];
    totalRating: number;
}

function RatingAnalysis({ ratings, totalRating }: Props) {
   const starsPercent = {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0};

    
    for(let i=0; i<ratings.length; i++){
        let key = `${Math.floor(ratings[i])}`
        // @ts-ignore
        starsPercent[key]= starsPercent[key]+1 
    }
    
    const ratingBars = Object.entries(starsPercent).sort(([key1], [key2]) => Number(key1) > Number(key2) ? -1 : 1 ).map(([k, val]) => {
        const per = Math.floor(val/ratings.length *100)
        return (
            <div key={`bars-${k}`} className='flex justify-center mb-5 gap-5'>
                <div>{k} star</div>
                <div className='relative w-[200px] h-[20px] bg-gray-100'>
                    <div style={{ width: per+'%'}} className='absolute top-0 bottom-0 right-0 left-0 bg-yellow-500'></div>
                </div>
            </div>
        )
    })
 
    
    
  return (
      <div>
          <div className="text-center">
              <Rating rate={totalRating} />
              <h4 className='text-lg'>{ratings.length} Rates</h4>
              <div className="my-10">
                
                 {ratingBars}
              </div>
          </div>
      </div>
  )
}

export default RatingAnalysis