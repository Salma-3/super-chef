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

    const totalPages = Math.ceil(count/limit)
    const pageLinks = [];
    const delta = 2;

    const currentPage = Number(searchParams.get('page')) || 1;

    const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start+i);

    if(currentPage > delta + 2) {
        pageLinks.push(1);
        pageLinks.push('...')
    }

    const startPage = Math.max(currentPage - delta, 1)
    const endPage = Math.min(currentPage + delta, totalPages);
    pageLinks.push(...range(startPage, endPage));

    if(currentPage < totalPages - delta - 1) {
        pageLinks.push('...')
        pageLinks.push(totalPages)
    }

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };
    
  return (
    <nav>
        <ul className='text-gray-700'>
            {
                pageLinks.map((page, index) => (
                <li key={index} className={clsx('inline-block me-4 text-xl font-bold', currentPage === page && 'text-primary underline')}>
                    {typeof page === 'number' ? <Link href={createPageURL(page)}>{page}</Link> : <span>{page}</span>}
                    
                </li>
                ))
            }
        </ul>
    </nav>
  )
}

export default Pagination