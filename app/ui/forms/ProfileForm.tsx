'use client'
import React, { useState } from 'react'
import Collapse from '../Collapse'
import clsx from 'clsx'

type Props = {}

function ProfileForm({ }: Props) {
    const [isOpen, setOpen] = useState(false)

    return (
        <div>
            <button onClick={() => setOpen(!isOpen)} type='button' className='bg-primary/10 rounded-lg p-2 px-4 text-gray-700 font-bold text-xl'>
                Edit social links
                <span className={clsx("ms-4 text-sm ti", isOpen ? 'ti-angle-up' : 'ti-angle-down')}></span>
            </button>
            <Collapse isOpen={isOpen}>
                <div className="py-3 px-4">
                    <form id="socialLinksForm">
                        {/* <!-- Facebook URL --> */}
                        <div className="mb-4">
                            <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">Facebook URL</label>
                            <input type="url" id="facebook" name="facebook" placeholder="https://facebook.com/your-profile"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>

                        {/* <!-- Twitter URL --> */}
                        <div className="mb-4">
                            <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">Twitter URL</label>
                            <input type="url" id="twitter" name="twitter" placeholder="https://twitter.com/your-profile"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>

                        {/* <!-- Instagram URL --> */}
                        <div className="mb-4">
                            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">Instagram URL</label>
                            <input type="url" id="instagram" name="instagram" placeholder="https://instagram.com/your-profile"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>

                        {/* <!-- LinkedIn URL --> */}
                        <div className="mb-4">
                            <label htmlFor="pinterest" className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                            <input type="url" id="pinterest" name="pinterest" placeholder="https://linkedin.com/in/your-profile"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>

                        {/* <!-- Buttons --> */}
                        <div className="flex justify-between">
                            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500" id="cancelButton">
                                Cancel
                            </button>
                            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-darkorange">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </Collapse>
        </div>

    )
}

export default ProfileForm