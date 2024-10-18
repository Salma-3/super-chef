'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import RatingInput from '@/app/ui/forms/RatingInput';
import { useSession } from 'next-auth/react';
import { createReview } from '@/app/lib/actions/reviews';

type Props = {
    recipeId: number;
    slug: string;
}

function ReviewForm({ recipeId, slug }: Props) {

    const { status, data } = useSession()

    const [loading, setLoading] = useState(false)
    const [rate, setRate] = useState(0);
    const [review, setReview] = useState('');
    const [errors, setErrors] = useState<any>({
        fieldErrors: {},
        message: '',
    }) 

    const onReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => setReview(evt.target.value)


    const onSubmit = async (evt: FormEvent) => {
        evt.preventDefault()
        setLoading(true)
        setErrors({ message: '', fieldErrors: {} })

        if(status !== 'authenticated') {
            setErrors({...errors, message: 'You need sign in first'});
            return;
        }
        
        const result = await createReview({
            rate,
            body: review,
            authorId: data.user?.id!,
            recipeId
        }, slug)

        if(!result?.success){
            setErrors({
                message: result?.message || '',
                fieldErrors: result?.errors || {}
            })
        } else {
            setRate(0)
            setReview('')
            document.getElementById('reviewList')?.scrollIntoView({ behavior: 'smooth' })
        }

        setLoading(false);
    }


    
    
    return (
        <form onSubmit={onSubmit}>
            <p className="text-red-500">{errors.message}</p>
            <div className="form-group">
                <label className='text-lg font-bold'>Rating <small className='text-red-500 font-normal'>* required</small></label>
                <div className='px-3 py-2'>
                   <RatingInput onRatingChange={setRate}/>
                   {errors.fieldErrors?.rate && <small className="text-red-500">{errors.fieldErrors.rate.join(',')}</small>}
                </div>
            </div>
            <div className="form-group mt-4">
               <label className='font-bold text-lg' htmlFor="review">My Review</label>
               <textarea className='block mt-3 w-full p-3 border border-gray-300 focus:outline-none ring-primary/30 focus:ring focus:border-primary' name="review" id="review" placeholder='review...' value={review} onChange={onReviewChange}></textarea>
               {errors.fieldErrors?.body && <small className="text-red-500">{errors.fieldErrors.body.join(',')}</small>}
            </div>
            <button type='submit' disabled={loading} className='my-4 py-2 px-4 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:bg-primary/50'>
            {loading ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    )
}

export default ReviewForm