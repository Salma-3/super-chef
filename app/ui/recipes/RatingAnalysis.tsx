'use client';
import React, { useEffect, useState } from 'react'
import Rating from './Rating'

type Props = {
    ratings: number[]
}

function RatingAnalysis({ ratings }: Props) {
   const starsPercent = {'5': 0, '4': 0, '3': 0, '2': 0, '1': 0};

    
    for(let i=0; i<ratings.length; i++){
        let key = `${Math.floor(ratings[i])}`
        // @ts-ignore
        starsPercent[key]= starsPercent[key]+1 
    }
    
    const ratingBars = Object.entries(starsPercent).map(([k, val]) => {
        const per = Math.floor(val/ratings.length *100)
        const w = per > 0 ? `w-[${per}%]` : 'w-[0px]'
        const clx = `absolute top-0 bottom-0 right-0 left-0 bg-yellow-500 ${w}`
        return (
            <div key={`bars-${k}`} className='flex justify-center mb-5 gap-5'>
                <div>{k} star</div>
                <div className='relative w-[200px] h-[20px] bg-gray-100'>
                    <div className={clx}></div>
                </div>
            </div>
        )
    })
 
    
    
  return (
      <div>
          <div className="text-center">
              <Rating rate={4.5} />
              <h4 className='text-lg'>128 Rates</h4>
              <div className="my-10">
                
                 {ratingBars}
              </div>
          </div>
      </div>
  )
}

export default RatingAnalysis