'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Collapse from '../Collapse'
import clsx from 'clsx'
import { isEmptyObject, omitUndefined } from '@/app/utils'
import { updateUserProfile } from '@/app/lib/actions/users'

type Props = {
    userId: number;
}

function ProfileForm({ userId }: Props) {
    const [isOpen, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [errors, setErrors] = useState<{message: string, fieldErrors: any}>({ message: '', fieldErrors: {} })
    const [formData, setFormData] = useState({
        facebook: '',
        instagram: '',
        pintrest: '',
        twitter: '',
    })

    const { facebook, instagram, twitter, pintrest } = formData;

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [evt.target.name]: evt.target.value });
    const reset = () => setFormData({ facebook: '', instagram: '', twitter: '', pintrest: '' })

    const handleSubmit = async (evt: FormEvent) => {
        evt.preventDefault();
        setLoading(true);

        const cleanData = omitUndefined(formData)

        if(isEmptyObject(cleanData)) {
            setLoading(false);
            return;
        }

        const result = await updateUserProfile(cleanData, userId);
        console.log(result)

        if(!result?.success) {
            setErrors({ message: result?.message || '', fieldErrors: result?.errors })
            setLoading(false);
            return;
        } else {
            reset();
            window.scroll({ top: 0 })
        }

    }

    return (
        <div>
            <button onClick={() => setOpen(!isOpen)} type='button' className='bg-primary/10 rounded-lg p-2 px-4 text-gray-700 font-bold text-xl'>
                Edit social links
                <span className={clsx("ms-4 text-sm ti", isOpen ? 'ti-angle-up' : 'ti-angle-down')}></span>
            </button>
            <Collapse isOpen={isOpen}>
                <div className="py-3 px-4">
                    <form onSubmit={handleSubmit} id="socialLinksForm">
                        {/* <!-- Facebook URL --> */}
                        <div className="mb-4">
                            <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">Facebook URL</label>
                            <input type="url" id="facebook" name="facebook" placeholder="https://facebook.com/your-profile" value={facebook} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                        </div>

                        {/* <!-- Twitter URL --> */}
                        <div className="mb-4">
                            <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">Twitter URL</label>
                            <input type="url" id="twitter" name="twitter" placeholder="https://twitter.com/your-profile" value={twitter} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                        </div>

                        {/* <!-- Instagram URL --> */}
                        <div className="mb-4">
                            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">Instagram URL</label>
                            <input type="url" id="instagram" name="instagram" placeholder="https://instagram.com/your-profile" value={instagram} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                        </div>

                        {/* <!-- LinkedIn URL --> */}
                        <div className="mb-4">
                            <label htmlFor="pintrest" className="block text-sm font-medium text-gray-700">Pinterest URL</label>
                            <input type="url" id="pintrest" name="pintrest" placeholder="https://pinterest.com/your-profile" value={pintrest} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                        </div>

                        {/* <!-- Buttons --> */}
                        <div className="flex justify-between">
                            <button type="reset" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500" id="cancelButton">
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