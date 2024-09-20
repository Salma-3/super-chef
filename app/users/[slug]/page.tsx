import ProfileForm from '@/app/ui/forms/ProfileForm'
import RecipeCard from '@/app/ui/profile/RecipeCard'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

function profilePage({}: Props) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        
        {/* <!-- Header Section --> */}
        <div className="flex flex-col gap-4 items-center space-x-6 mb-6">
            {/* <!-- Avatar and Edit --> */}
            <div className="relative">
                <Image className="w-24 h-24 rounded-full" src="/images/avatar.png" width={100} height={100} alt="Avatar"/>
                <label htmlFor="avatarUpload" className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer">
                    <i className='ti ti-pencil-alt'></i>
                </label>
                <input type="file" id="avatarUpload" className="hidden"/>
            </div>
            
            {/* <!-- Username --> */}
            <div className="text-2xl font-bold">
                <h1>User&apos;s Name</h1>
            </div>
        </div>

        {/* <!-- Social Links Section --> */}
        <div className="mb-8">
            <div className="flex justify-center space-x-4">
                <a href="#" className="w-8 h-8 leading-9 text-center bg-blue-500 text-white rounded-full hover:bg-blue-700">
                    <i className="ti ti-facebook"></i>
                </a>
                <a href="#" className="w-8 h-8 leading-9 text-center bg-pink-500 text-white rounded-full hover:bg-pink-700">
                    <i className="ti ti-instagram"></i>
                </a>
                <a href="#" className="w-8 h-8 leading-9 text-center bg-red-600 rounded-full text-white hover:bg-red-900">
                    <i className="ti ti-pinterest"></i>
                </a>
                <a href="#" className="w-8 h-8 leading-9 text-center bg-blue-400 text-white rounded-full hover:bg-blue-500">
                    <i className="ti ti-twitter"></i>
                </a>
            </div>
        </div>

        {/* <!-- Recipes Section --> */}
        <div>
            <h2 className="text-gray-700 text-xl font-semibold mb-4">My Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* <!-- Recipe Card --> */}
                
                <RecipeCard /> 

            </div>
        </div>

        {/* <!-- Add New Recipe Button --> */}
        <div className="mt-8 pb-12 border-b">
            <Link href='#' className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-darkorange">
                Add New Recipe
            </Link>
        </div>

      {/*TODO: hide this from public and show it only to owner */}
        <div className="my-10">
            <ProfileForm />
        </div>
    </div>
  )
}

export default profilePage