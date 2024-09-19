import Image from 'next/image'
import React from 'react'
import Rating from './Rating'

type Props = {}

function ReviewItem({}: Props) {
  return (
    <div className='py-3 border-b'>
        <div className='flex gap-5 items-center'>
            <Image src='/images/avatar.png' className='rounded-full' width={50} height={50} alt='avatar' />
            <h4 className='text-lg'>Noah Harington</h4>
        </div>
        <div className='flex gap-3 mt-2'>
            <Rating rate={4.5}/>
            <span className='font-thin text-gray-400'>3/05/2024</span>
        </div>
        <p className='mt-3'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex e
        </p>
    </div>
  )
}

export default ReviewItem