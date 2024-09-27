'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Collapse from '@/app/ui/Collapse';
import { Category } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
    tags: {tag: string}[];
    categories: Category[]
}

function Filter({ categories, tags }: Props) {
    const [isOpen, setOpen] = useState(true);
    const handleCollapse = () => setOpen(!isOpen);
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const [selectedCategories, setCategories] = useState<string[]>([])
    const [selectedTags, setTags] = useState<string[]>([])

    
    const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = evt.target;
        console.log(name, evt.target.value, evt.target.checked)
        
       
        if(name === 'category') {
            
            if(checked) {
                setCategories([...selectedCategories, value])
            } else {
                let tmpCat = selectedCategories.filter(ct => ct !== value)
                setCategories(tmpCat)
            }
        } else if(name === 'tag') {
            if(checked) {
                setTags([...selectedTags, value])
            } else {
                let tmpTags = selectedTags.filter(tg => tg !== value)
                setTags(tmpTags)
            }
        }
     }



    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault()
        const params = new URLSearchParams(searchParams)
        params.delete('categories')
        params.delete('tags');
        
        selectedCategories.forEach(ct => params.append('categories', ct))
        selectedTags.forEach(tg => params.append('tags', tg))

        const url = pathname + '?' + params.toString()
        router.push(url);
    }

    return (
        <div className="w-full lg:w-3/12 h-fit  bg-gray-100 shadow pt-4 px-8">
            <button onClick={handleCollapse} className='block w-full relative border-b'>
                <h4 className='text-left bg-gray-100 mx-auto text-2xl font-bold mb-3 text-gray-800'>Filter</h4>
                {!isOpen && <span className='absolute top-2 right-2 ti ti-angle-down'></span>}
                {
                    isOpen && <span className='absolute top-2 right-2 ti ti-angle-up'></span>
                }
            </button>

            <Collapse isOpen={isOpen}>
                <form onSubmit={handleSubmit} className='my-3'> 
                    <h6 className='text-lg mb-3 underline'>Categories</h6>   
                    {
                        categories.map(cat => (
                            <div key={`filter-cat-${cat.id}`} className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input id={`f-cat-${cat.id}`} name="category" type="checkbox" value={cat.id} onChange={onChange} className="h-4 w-4 rounded border-primary text-primary accent-primary focus:ring-primary" />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor={`f-cat-${cat.id}`} className="font-meduim text-lg text-gray-900">{cat.name}</label>
                                </div>
                            </div>
                        ))
                    }

                    <h6 className="text-lg my-3 underline">Tags</h6>
                    <div className="grid grid-cols-2">
                    {
                        tags.map(tag => (
                                <div key={`filter-tags-${tag.tag}`} className="flex gap-3 h-6 items-center">
                                    <input id={`f-tg-${tag.tag}`} name="tag" value={tag.tag} onChange={onChange} type="checkbox" className="h-4 w-4 rounded border-primary text-primary accent-primary focus:ring-primary" />
                                    <label htmlFor={`f-tg-${tag.tag}`} className="font-meduim text-lg text-gray-900">{tag.tag}</label>
                                </div>
                        ))
                    }
                    </div>
                    
                    <button type='submit' className='my-3 p-1 px-2 rounded-lg border border-primary text-white bg-primary'>submit</button>
                </form>
            </Collapse>
        </div>
    )
}

export default Filter