import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'

type Props = {
    count: number;
    limit: number;
}

function Pagination({ count, limit }: Props) {

    const pages = Math.ceil(count/limit)
    
  return (
    <nav>
        <ul className='text-gray-700'>
            <li className={clsx('inline-block me-4 text-xl font-bold', false && 'text-primary underline')}>
                <Link href='#'>1</Link>
            </li>
            <li className={clsx('inline-block me-4 text-xl font-bold', true && 'text-primary underline')}>
                <Link href='#'>2</Link>
            </li>
            <li className={clsx('inline-block me-4 text-xl font-bold', false && 'text-primary underline')}>
                <Link href='#'>3</Link>
            </li>
            <li className={clsx('inline-block me-4 text-xl font-bold', false && 'text-primary underline')}>
                <Link href='#'>4</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Pagination