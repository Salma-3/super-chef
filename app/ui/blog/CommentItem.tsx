'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CommentWithAuthor } from '@/app/lib/definitions'
import { deleteComment } from '@/app/lib/actions/blog'


type Props = {
    comment: CommentWithAuthor
    userId?: number;
}

function CommentItem({ comment, userId }: Props) {
    const onDelete = async (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(!userId) return;
        if(!window.confirm('Do you want to delete this comment?')){
            return;
        }
        const id = evt.currentTarget?.getAttribute('data-id')
        await deleteComment(Number(id), userId)
    }
    return (
        <div className="relative flex space-x-4 border-b pb-3">
            <Image src={comment.author.avatar} alt="User Avatar" className="rounded-full h-12 w-12" width={50} height={50} />
            <div>
                <div className="flex items-center space-x-4">
                    <h6 className="text-md font-semibold">{comment.author.username}</h6>
                    <span className="text-sm text-gray-500">October 10, 2024</span>
                </div>
                <p className="text-gray-700">
                    {comment.body}
                </p>
            </div>
            {userId === comment.authorId && <button type="button" data-id={comment.id} onClick={onDelete} className='absolute right-0 top-0'><span className="ti ti-trash"></span></button>}
        </div>
    )
}

export default CommentItem