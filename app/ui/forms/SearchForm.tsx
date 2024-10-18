'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import React, { ChangeEvent, FormEvent, useState } from 'react'

type Props = {
  className: string
}

function SearchForm({ className}: Props) {
  const [search, setSearch] = useState('')
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => setSearch(evt.target.value)

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const urlParams = new URLSearchParams(searchParams!)
    if(search) {
      urlParams.set('search', search)
    } else {
      urlParams.delete('search')
    }
    
    urlParams.set('page', '1')
    router.push(`${pathname}?${urlParams.toString()}`)
  }  

  return (
    <form onSubmit={handleSubmit} className={className}>
        <div className="flex gap-2">
            <input type="search" value={search} onChange={handleChange} placeholder='search' className='border w-8/12 w-10/12 px-3 py-1 bg-white rounded-full focus:outline-none focus:border focus:border-primary' />
            <button type="submit" className='w-3/12 md:w-2/12 px-3 text-white bg-primary rounded-full hover:opacity-50'>search</button>
        </div>

    </form>
  )
}

export default SearchForm