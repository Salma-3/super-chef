'use client'
import { createComment } from '@/app/lib/actions/blog';
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {
    authorId?: number;
    articleId: number;
}

function CommentForm({ authorId, articleId }: Props) {
    const [body, setBody] = useState('')
    const [error, setError] = useState<{fieldErrors: any; message: string }>({ message: '', fieldErrors: {} })
    const [loading, setLoading] = useState(false)
    
    const onSubmit = async (event: FormEvent) => {
        event.preventDefault()
        setLoading(true)

        if(!authorId) {
            setError({...error, message: 'You need to login to comment'})
            setLoading(false)
            return;
        }

        const result = await createComment({ body, authorId, articleId })
        if(!result.success){
            setError({
                fieldErrors: result.errors,
                message: result.message || ''
            })
            setLoading(false);
            return;
        } else {
            setBody('')
            toast.success('Your comment posted successfully')
            document.getElementById('commentsList')?.scrollIntoView({ behavior: 'smooth' })
        }
        setLoading(false)
    }

    return (
        <form onSubmit={onSubmit}>
            <p className='text-red-500 my-3'>{error.message}</p>
            <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">Write a Comment:</label>
                <textarea id="comment" value={body} onChange={e => setBody(e.target.value)} rows={4} className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Share your thoughts..."></textarea>
                {error.fieldErrors?.body && <small className="text-red-500">{error.fieldErrors.body.join(',')}</small>}
            </div>
            <button type="submit" disabled={loading} className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:bg-orange-400">
                { loading ? 'Submitting' : 'Submit'}
            </button>
        </form>
    )
}

export default CommentForm