import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

function Footer({ }: Props) {
    return (
        <footer className='bg-gray-700 py-10'>
            <div className='flex flex-col justify-center md:flex-row md:justify-around'>
                <div className='w-100 md:w-3/12 text-center'>
                    <Image className='mx-auto' src='/logo.png' width={100} height={100} alt='superchef' />
                    <p className='text-secondary'>Superchef is your best delicious food reference.</p>
                    <div className='mt-4'>
                        <Link className='inline-block me-5 text-secondary hover:text-white' href='#'>
                            <span className="ti ti-facebook"></span>
                        </Link>
                        <Link className='inline-block me-5 text-secondary hover:text-white' href='#'>
                            <span className="ti ti-twitter"></span>
                        </Link>
                        <Link className='inline-block me-5 text-secondary hover:text-white' href='#'>
                            <span className="ti ti-instagram"></span>
                        </Link>
                        <Link className='inline-block me-5 text-secondary hover:text-white' href='#'>
                            <span className="ti ti-github"></span>
                        </Link>
                        <Link className='inline-block me-5 text-secondary hover:text-white' href='#'>
                            <span className="ti ti-youtube"></span>
                        </Link>

                    </div>
                </div>
                <div className="w-100 md:w-6/12 flex justify-evenly mt-6 md:justify-center md:gap-10">
                    <div className="">
                        <p className='text-white'>Pages</p>
                        <ul className='mt-3'>
                            <li className='mb-2'><Link href="#" className='text-secondary hover:text-white'>Dinners</Link></li>
                            <li className='mb-2'><Link href="#" className='text-secondary hover:text-white'>Meals</Link></li>
                            <li className='mb-2'><Link href="#" className='text-secondary hover:text-white'>News</Link></li>
                            <li className='mb-2'><Link href="#" className='text-secondary hover:text-white'>About</Link></li>
                        </ul>
                    </div>
                    <div className="">
                        <p className='text-white'>Support</p>
                        <ul className='mt-2'>
                            <li className='mb-2'><Link href="#" className='text-secondary hover:text-white'>Contact us</Link></li>
                            <li className='mb-2'><Link href="#" className='text-secondary hover:text-white'>Advertise</Link></li>
                        </ul>
                    </div>
                    <div className="">
                        <p className='text-white'>Legal</p>
                        <ul className='mt-2'>
                            <li className='mb-2'><Link href="#" className='text-secondary hover:text-white'>Privacy Policy</Link></li>
                            <li className='mb-2'><Link href="#" className='text-secondary hover:text-white'>Terms of service</Link></li>
                            <li className='mb-2'><Link href="#" className='text-secondary hover:text-white'>Careers</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer