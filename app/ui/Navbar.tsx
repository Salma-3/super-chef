'use client';
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { signOut, useSession } from 'next-auth/react';

type Props = {}

function Navbar({ }: Props) {
    const [mobileMenuOpen, setMobileMenu] = useState(false)
    const [dropdownOpen, setDropdown] = useState(false);
    const pathname = usePathname()

    const isCurrentPath = (href: string) => {
        return pathname === href;
    }

    const session = useSession()
    
    return (
        <nav className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* <!-- Mobile menu button--> */}
                        <button onClick={() => setMobileMenu(!mobileMenuOpen)} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            {/* Icon when menu is closed. Menu open: "hidden", Menu closed: "block" */}
                            {!mobileMenuOpen && <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>}
                            {/* Icon when menu is open. Menu open: "block", Menu closed: "hidden" */}
                            {mobileMenuOpen && <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>}
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <Link href='/' className="flex flex-shrink-0 items-center">
                            <Image className="h-8 w-auto" src='/logo.png' width={80} height={80} alt="Super chef" />
                        </Link>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link href="/" className={clsx("rounded-md px-3 py-2 text-md font-medium hover:text-primary", isCurrentPath('/') && 'text-primary')} aria-current="page">Home</Link>
                                <Link href="/recipes" className={clsx("rounded-md px-3 py-2 text-md font-medium hover:text-primary", isCurrentPath('/recipes') && 'text-primary')}>Recipes</Link>
                                {
                                    !session.data?.user && <Link href="/auth/login" className={clsx("rounded-md px-3 py-2 text-md font-medium hover:text-primary", isCurrentPath('/auth/login') && 'text-primary')}>Login</Link>
                                }
                                <Link href="/blog" className={clsx("rounded-md px-3 py-2 text-md font-medium hover:text-primary", isCurrentPath('/blog') && 'text-primary')}>Blog</Link>
                                <Link href="/ai-generator" className={clsx("rounded-md px-3 py-2 text-md font-medium hover:text-primary", isCurrentPath('/ai-generator') && 'text-primary')}>AI Recipes <span className='ti ti-wand'></span></Link>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button type="button" className="relative rounded-full p-1 text-gray-600 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                            <span className="absolute -inset-1.5"></span>
                            <span className="sr-only">View notifications</span>
                            <span className="ti ti-bell"></span>
                        </button>

                        {/* <!-- Profile dropdown --> */}
                        {session && session.data && 
                        <div className="relative ml-3">
                            {dropdownOpen && <button onMouseOver={() => setDropdown(false)} className="fixed top-0 left-0 bottom-0 right-0"></button>}
                            <div>
                                <button onClick={() => setDropdown(!dropdownOpen)} onMouseOver={() => setDropdown(true)} type="button" className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    {session.data?.user && session.data?.user.avatar && <Image className="h-8 w-8 rounded-full" height={50} width={50} src={session.data?.user.avatar} alt="avatar" />}
                                </button>
                            </div>

                            {dropdownOpen && <div className="absolute right-0 z-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white" role="menuitem" tabIndex={-1} id="user-menu-item-0">Your Profile</Link>
                                <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white" role="menuitem" tabIndex={-1} id="user-menu-item-1">Settings</Link>
                                <button onClick={() => signOut()} className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-primary hover:text-white" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</button>
                            </div>}
                        </div>}
                    </div>
                </div>
            </div>

            {/* <!-- Mobile menu, show/hide based on menu state. --> */}
            {mobileMenuOpen && <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <Link href="/" className={clsx("block rounded-md px-3 py-2 text-base font-medium text-gray-800", isCurrentPath('/') && "bg-primary text-white")} aria-current="page">Home</Link>
                    <Link href="/recipes" className={clsx("block rounded-md px-3 py-2 text-base font-medium text-gray-800", isCurrentPath('/recipes') && "bg-primary text-white")}>Recipes</Link>
                    <Link href="/auth/login" className={clsx("block rounded-md px-3 py-2 text-base font-medium text-gray-800", isCurrentPath('/auth/login') && "bg-primary text-white")}>Login</Link>
                    <Link href="/blog" className={clsx("block rounded-md px-3 py-2 text-base font-medium text-gray-800", isCurrentPath('/blog') && "bg-primary text-white")}>Blog</Link>
                    <Link href="/ai-generator" className={clsx("block rounded-md px-3 py-2 text-base font-medium text-gray-800", isCurrentPath('/ai-generator') && "bg-primary text-white")}>AI Recipes <span className='ti ti-wand'></span></Link>
                </div>
            </div>}
        </nav>

    )
}

export default Navbar