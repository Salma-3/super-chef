'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent } from 'react'
import { SORT_CRIT } from '@/app/lib/definitions'

type Props = {}


function Sort({ }: Props) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value  = event.target.value as SORT_CRIT ;

        const urlParams = new URLSearchParams(searchParams!)
        urlParams.set('sort', value)
        urlParams.set('page', '1')

        const url = pathname + '?' + urlParams.toString()
        router.push(url)

    }

    return (
        <select onChange={onChange} defaultValue={SORT_CRIT.NEW} name="sort" id="sort" className='px-2 border border-gray-300'>
            <option value={SORT_CRIT.NEW}>Sort</option>
            <option value={SORT_CRIT.RATE}>By Rate</option>
            <option value={SORT_CRIT.NEW}>Newest</option>
        </select>
    )
}

export default Sort