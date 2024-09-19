'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import RatingInput from '@/app/ui/forms/RatingInput';

type Props = {}

function ReviewForm({ }: Props) {

    const [rate, setRate] = useState(0);
    const [review, setReview] = useState('');

    const onReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => setReview(evt.target.value)

    const onSubmit = (evt: FormEvent) => {
        evt.preventDefault()
        console.log(rate, review)
    }

    
    
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label className='text-lg font-bold'>Rating <small className='text-red-500 font-normal'>* required</small></label>
                <div className='px-3 py-2'>
                   <RatingInput onRatingChange={setRate}/>
                </div>
            </div>
            <div className="form-group mt-4">
               <label className='font-bold text-lg' htmlFor="review">My Review</label>
               <textarea className='block mt-3 w-full p-3 border border-gray-300 focus:outline-none ring-primary/30 focus:ring focus:border-primary' name="review" id="review" placeholder='review...' value={review} onChange={onReviewChange}></textarea>
            </div>
            <button type='submit' className='my-4 py-2 px-4 rounded-lg bg-primary text-white hover:bg-primary/90'>Submit</button>
        </form>
    )
}

export default ReviewForm