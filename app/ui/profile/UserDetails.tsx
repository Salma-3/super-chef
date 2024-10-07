import React from 'react'
import Image from 'next/image'
import { User } from '@prisma/client'

type Props = {
    user: User,
    editable: boolean
}

function UserDetails({ user, editable }: Props) {
    return (
        <>
            <div className="flex flex-col gap-4 items-center space-x-6 mb-6">
                {/* <!-- Avatar and Edit --> */}
                <div className="relative">
                    <Image className="w-24 h-24 rounded-full" src={user.avatar} width={100} height={100} alt="Avatar" />
                   {editable &&
                   <>
                   <label htmlFor="avatarUpload" className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer">
                        <i className='ti ti-pencil-alt'></i>
                    </label>
                    <input type="file" id="avatarUpload" className="hidden" />
                   </>
                   }
                </div>

                {/* <!-- Username --> */}
                <div className="text-2xl font-bold">
                    <h1>{user.username}</h1>
                </div>
            </div>

            {/* <!-- Social Links Section --> */}
            <div className="mb-8">
                <div className="flex justify-center space-x-4">
                   {user.facebook && <a href={user.facebook} className="w-8 h-8 leading-9 text-center bg-blue-500 text-white rounded-full hover:bg-blue-700">
                        <i className="ti ti-facebook"></i>
                    </a>}
                    {user.instagram && <a href={user.instagram} className="w-8 h-8 leading-9 text-center bg-pink-500 text-white rounded-full hover:bg-pink-700">
                        <i className="ti ti-instagram"></i>
                    </a>}
                    {user.pintrest && <a href={user.pintrest} className="w-8 h-8 leading-9 text-center bg-red-600 rounded-full text-white hover:bg-red-900">
                        <i className="ti ti-pinterest"></i>
                    </a>}
                    {user.twitter && <a href={user.twitter} className="w-8 h-8 leading-9 text-center bg-blue-400 text-white rounded-full hover:bg-blue-500">
                        <i className="ti ti-twitter"></i>
                    </a>}
                </div>
            </div>
        </>
    )
}

export default UserDetails