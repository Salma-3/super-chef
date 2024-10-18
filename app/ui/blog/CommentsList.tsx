import React from 'react'
import CommentItem from './CommentItem'
import prisma from '@/app/lib/db'
import { CommentWithAuthor } from '@/app/lib/definitions';

type Props = {
    userId?: number;
    articleId: number;
}

async function CommentsList({ userId, articleId }: Props) {

   const comments = await prisma.comment.findMany({ where: { articleId }, include: { author: true }}) as CommentWithAuthor[];
    return (
        <div id='commentsList' className="space-y-6 pt-5 border-t ">
            <h6 className='underline'>{comments.length} comments</h6>
            {
                comments.map(comment => (
                    <CommentItem key={`comment-${comment.id}`} comment={comment} userId={userId}/>
                ))
            }
        </div>
    )
}

export default CommentsList