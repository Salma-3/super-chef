'use client';
import React, { useState } from 'react'
import Collapse from '@/app/ui/Collapse';

type Props = {}

function Filter({ }: Props) {
    const [isOpen, setOpen] = useState(true);
    const handleCollapse = () => setOpen(!isOpen);

    return (
        <div className="w-full lg:w-3/12 h-fit bg-gray-100 shadow pt-4 px-8">
            <button onClick={handleCollapse} className='block w-full relative border-b'>
                <h4 className='text-left bg-gray-100 mx-auto text-2xl font-bold mb-3 text-gray-800'>Filter</h4>
                {!isOpen && <span className='absolute top-2 right-2 ti ti-angle-down'></span>}
                {
                    isOpen && <span className='absolute top-2 right-2 ti ti-angle-up'></span>
                }
            </button>

            <Collapse isOpen={isOpen}>
                <form className='my-6'>
                    <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input id="category1" name="category" type="checkbox" className="h-4 w-4 rounded border-primary text-primary accent-primary focus:ring-primary" />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="category1" className="font-meduim text-lg text-gray-900">Dinners</label>
                        </div>
                    </div>
                    <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input id="category2" name="category" type="checkbox" className="h-4 w-4 rounded border-primary text-primary accent-primary focus:ring-primary" />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="category2" className="font-meduim text-lg text-gray-900">Healthy</label>
                        </div>
                    </div>
                    <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input id="category3" name="category" type="checkbox" className="h-4 w-4 rounded border-primary text-primary accent-primary focus:ring-primary" />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="category3" className="font-meduim text-lg text-gray-900">Desserts</label>
                        </div>
                    </div>
                    <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input id="category4" name="category" type="checkbox" className="h-4 w-4 rounded border-primary text-primary accent-primary focus:ring-primary" />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="category4" className="font-meduim text-lg text-gray-900">Vegan</label>
                        </div>
                    </div>
                </form>
            </Collapse>
        </div>
    )
}

export default Filter