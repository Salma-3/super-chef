'use client'
import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'
import { usePathname, useSearchParams } from 'next/navigation'

type Props = {
    count: number;
    limit: number;
}

function Pagination({ count, limit }: Props) {

    const searchParams = useSearchParams()
    const pathname = usePathname()

    const pages = Math.ceil(count/limit)

    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };
    

    const links = new Array(pages).fill(0).map((_, p) => 
        <li key={p+1} className={clsx('inline-block me-4 text-xl font-bold', currentPage === p+1 && 'text-primary underline')}>
            <Link href={createPageURL(p+1)}>{p+1}</Link>
        </li>
    )
    
  return (
    <nav>
        <ul className='text-gray-700'>
            {links}
        </ul>
    </nav>
  )
}

export default Pagination