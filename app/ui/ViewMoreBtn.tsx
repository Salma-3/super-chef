'use client'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'


type Props = {
    initLimit: number
}

function ViewMoreBtn({ initLimit }: Props) {
    const [limit, setLimit] = useState(initLimit)
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    

    const onClick = () => {
        let tmp = limit + 6
        setLimit(tmp)
        
        const urlParams = new URLSearchParams(searchParams?.toString())
        urlParams.set('limit', String(tmp));

        router.push(`${pathname}?${urlParams.toString()}`)

    }

  return (
    <button type='button' onClick={onClick} className='block mx-auto my-8 px-8 uppercase py-2 bg-primary text-white hover:bg-darkorange'>
                view more
    </button>
  )
}

export default ViewMoreBtn