import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

function Footer({ }: Props) {
    return (
        <footer className='bg-gray-700 py-10'>
            <div className='flex flex-col justify-center md:flex-row md:justify-around'>
                <div className='w-100 md:w-3/12 text-center'>
                    <Image className='mx-auto' src='/logo.png' width={50} height={50} alt='superchef' />
                    <p className='text-secondary'>Superchef is your best delicious food reference.</p>
                    <div className='mt-4'>
                        <Link className='inline-block me-5 text-secondary hover:text-white' href='#'>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17">
                                <path d="M12.461 5.57l-0.309 2.93h-2.342v8.5h-3.518v-8.5h-1.753v-2.93h1.753v-1.764c0-2.383 0.991-3.806 3.808-3.806h2.341v2.93h-1.465c-1.093 0-1.166 0.413-1.166 1.176v1.464h2.651z" fill="currentColor" />
                            </svg>
                        </Link>
                        <Link className='inline-block me-5 text-secondary hover:text-white' href='#'>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17">
                                <g>
                                </g>
                                <path d="M17 3.236c-0.626 0.27-1.305 0.464-2.007 0.539 0.723-0.431 1.273-1.11 1.532-1.919-0.669 0.399-1.424 0.69-2.211 0.841-0.636-0.68-1.542-1.1-2.545-1.1-1.931 0-3.484 1.564-3.484 3.483 0 0.27 0.033 0.54 0.086 0.799-2.891-0.15-5.469-1.531-7.184-3.646-0.302 0.517-0.475 1.111-0.475 1.759 0 1.208 0.615 2.275 1.553 2.901-0.571-0.022-1.111-0.184-1.575-0.442 0 0.010 0 0.032 0 0.043 0 1.692 1.197 3.095 2.794 3.419-0.291 0.075-0.604 0.118-0.917 0.118-0.226 0-0.442-0.021-0.657-0.054 0.442 1.381 1.726 2.384 3.257 2.417-1.198 0.938-2.697 1.488-4.326 1.488-0.291 0-0.561-0.010-0.841-0.042 1.543 0.992 3.376 1.564 5.351 1.564 6.407 0 9.913-5.307 9.913-9.912 0-0.152 0-0.302-0.010-0.454 0.678-0.496 1.271-1.112 1.746-1.802zM14.263 5.491c0 3.701-2.765 8.912-8.913 8.912-0.492 0-0.979-0.040-1.458-0.118 0.67-0.276 1.305-0.646 1.891-1.104 0.333-0.26 0.466-0.702 0.332-1.103-0.134-0.401-0.505-0.675-0.928-0.684-0.545-0.011-1.055-0.197-1.467-0.509 0.004-0.001 0.008-0.002 0.012-0.003 0.452-0.116 0.763-0.528 0.751-0.994-0.011-0.467-0.343-0.862-0.8-0.955-0.652-0.132-1.203-0.516-1.559-1.046 0.035 0.002 0.069 0.004 0.104 0.005 0.013 0 0.025 0 0.038 0 0.432 0 0.817-0.278 0.951-0.692 0.138-0.426-0.024-0.891-0.397-1.14-0.63-0.42-1.030-1.096-1.098-1.841 1.824 1.582 4.146 2.531 6.597 2.658 0.017 0.001 0.035 0.001 0.052 0.001 0.291 0 0.568-0.127 0.759-0.349 0.202-0.235 0.283-0.551 0.22-0.854-0.044-0.209-0.066-0.41-0.066-0.595 0-1.369 1.114-2.483 2.484-2.483 0.698 0 1.342 0.278 1.815 0.784 0.116 0.124 0.261 0.215 0.417 0.266-0.019 0.146-0.006 0.297 0.043 0.444 0.063 0.191 0.18 0.352 0.33 0.47-0.089 0.164-0.132 0.353-0.119 0.544 0.010 0.129 0.009 0.257 0.009 0.386z" fill="currentColor" />
                            </svg>
                        </Link>
                        <Link className='inline-block me-5 text-secondary hover:text-white' href='#'>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17">
                                <g>
                                </g>
                                <path d="M13 0h-9c-2.2 0-4 1.8-4 4v9c0 2.2 1.8 4 4 4h9c2.2 0 4-1.8 4-4v-9c0-2.2-1.8-4-4-4zM16 13c0 1.654-1.346 3-3 3h-9c-1.654 0-3-1.346-3-3v-6h3.207c-0.286 0.61-0.457 1.283-0.457 2 0 2.619 2.131 4.75 4.75 4.75s4.75-2.131 4.75-4.75c0-0.717-0.171-1.39-0.457-2h3.207v6zM12.25 9c0 2.068-1.682 3.75-3.75 3.75s-3.75-1.682-3.75-3.75 1.682-3.75 3.75-3.75 3.75 1.682 3.75 3.75zM12.152 6c-0.872-1.059-2.176-1.75-3.652-1.75s-2.78 0.691-3.652 1.75h-3.848v-2c0-1.654 1.346-3 3-3h9c1.654 0 3 1.346 3 3v2h-3.848zM14.454 2.722v1.298c0 0.299-0.244 0.543-0.542 0.543h-1.368c-0.3-0.001-0.544-0.245-0.544-0.543v-1.298c0-0.299 0.244-0.543 0.544-0.543h1.368c0.298 0 0.542 0.244 0.542 0.543z" fill="currentColor" />
                            </svg>
                        </Link>
                        <Link className='inline-block me-5 text-secondary hover:text-white' href='#'>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17">
                                <g>
                                </g>
                                <path d="M13.077 11.115c0 0.746-0.389 1.962-1.308 1.962-0.92 0-1.309-1.216-1.309-1.962 0-0.745 0.389-1.962 1.309-1.962 0.919 0 1.308 1.217 1.308 1.962zM5.231 9.153c-0.919 0-1.308 1.217-1.308 1.962 0 0.746 0.389 1.962 1.308 1.962 0.919 0 1.308-1.216 1.308-1.962 0-0.745-0.389-1.962-1.308-1.962zM17 9.317c0 1.135-0.112 2.34-0.623 3.382-1.349 2.728-5.057 2.993-7.713 2.993-2.697 0-6.63-0.234-8.030-2.993-0.522-1.032-0.634-2.247-0.634-3.382 0-1.492 0.409-2.901 1.39-4.045-0.184-0.562-0.276-1.155-0.276-1.738 0-0.766 0.173-1.531 0.521-2.227 1.614 0 2.646 0.705 3.872 1.665 1.032-0.245 2.094-0.357 3.157-0.357 0.96 0 1.931 0.103 2.861 0.327 1.216-0.95 2.247-1.635 3.841-1.635 0.348 0.695 0.521 1.461 0.521 2.227 0 0.583-0.092 1.165-0.276 1.717 0.981 1.154 1.389 2.574 1.389 4.066zM14.711 11.115c0-1.563-0.949-2.942-2.615-2.942-0.674 0-1.317 0.123-1.992 0.215-0.531 0.082-1.062 0.112-1.604 0.112s-1.073-0.030-1.604-0.112c-0.664-0.092-1.318-0.215-1.992-0.215-1.665 0-2.615 1.379-2.615 2.942 0 3.126 2.86 3.606 5.353 3.606h1.717c2.493 0.001 5.352-0.48 5.352-3.606z" fill="currentColor" />
                            </svg>

                        </Link>
                        <Link className='inline-block me-5 text-secondary hover:text-white' href='#'>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17">
                                <g>
                                </g>
                                <path d="M8.301 6.422c0.437 0 0.769-0.161 1.006-0.484 0.181-0.237 0.265-0.617 0.265-1.12v-1.66c0-0.503-0.084-0.873-0.265-1.11-0.238-0.321-0.57-0.483-1.006-0.483-0.428 0-0.76 0.161-0.995 0.483-0.181 0.238-0.266 0.608-0.266 1.111v1.66c0 0.503 0.085 0.873 0.266 1.12 0.235 0.322 0.567 0.483 0.995 0.483zM7.893 2.988c0-0.436 0.133-0.654 0.408-0.654 0.285 0 0.408 0.218 0.408 0.654v1.992c0 0.437-0.123 0.664-0.408 0.664-0.275 0-0.408-0.228-0.408-0.664v-1.992zM10.35 6.071c-0.048-0.143-0.075-0.37-0.075-0.711v-3.738h0.863v3.481c0 0.2 0 0.313 0.010 0.333 0.019 0.133 0.085 0.208 0.199 0.208 0.17 0 0.35-0.133 0.54-0.408v-3.614h0.863v4.734h-0.863v-0.522c-0.341 0.398-0.663 0.588-0.978 0.588-0.275 0-0.474-0.113-0.559-0.351zM13.633 11.811v0.436h-0.854v-0.436c0-0.427 0.143-0.646 0.427-0.646 0.284 0.001 0.427 0.219 0.427 0.646zM4.354 1.774c-0.208-0.588-0.416-1.186-0.617-1.774h1.007l0.673 2.495 0.645-2.495h0.968l-1.148 3.785v2.571h-0.948v-2.571c-0.086-0.465-0.276-1.129-0.58-2.011zM15.283 8.785c-0.171-0.75-0.788-1.3-1.518-1.385-1.746-0.19-3.511-0.19-5.266-0.19s-3.52 0-5.256 0.19c-0.738 0.085-1.346 0.635-1.526 1.385-0.237 1.062-0.247 2.22-0.247 3.32 0 1.091 0 2.257 0.247 3.32 0.171 0.75 0.788 1.3 1.518 1.376 1.745 0.199 3.51 0.199 5.265 0.199s3.52 0 5.266-0.199c0.729-0.076 1.337-0.626 1.518-1.376 0.237-1.062 0.247-2.229 0.247-3.32-0.001-1.1-0.001-2.258-0.248-3.32zM5.483 9.743h-1.014v5.398h-0.949v-5.398h-0.997v-0.892h2.96v0.892zM8.045 15.141h-0.845v-0.512c-0.342 0.389-0.664 0.579-0.968 0.579-0.274 0-0.474-0.114-0.55-0.351-0.048-0.142-0.076-0.361-0.076-0.692v-3.709h0.845v3.453c0 0.2 0 0.304 0.009 0.333 0.020 0.132 0.086 0.199 0.199 0.199 0.172 0 0.352-0.132 0.541-0.398v-3.586h0.845v4.684zM11.271 13.737c0 0.437-0.020 0.749-0.086 0.948-0.104 0.342-0.342 0.522-0.674 0.522-0.303 0-0.598-0.171-0.883-0.522v0.456h-0.843v-6.29h0.843v2.059c0.275-0.342 0.57-0.512 0.883-0.512 0.332 0 0.57 0.18 0.674 0.531 0.066 0.19 0.086 0.502 0.086 0.939v1.869zM14.477 12.959h-1.698v0.825c0 0.437 0.143 0.654 0.437 0.654 0.209 0 0.332-0.113 0.38-0.341 0.009-0.047 0.019-0.237 0.019-0.579h0.863v0.124c0 0.275 0 0.465-0.019 0.55-0.020 0.189-0.096 0.36-0.199 0.512-0.229 0.332-0.579 0.503-1.024 0.503-0.446 0-0.779-0.161-1.025-0.484-0.18-0.228-0.275-0.598-0.275-1.101v-1.641c0-0.503 0.086-0.863 0.266-1.101 0.247-0.323 0.579-0.484 1.016-0.484 0.428 0 0.759 0.161 1.005 0.484 0.172 0.237 0.257 0.597 0.257 1.101v0.978zM10.426 11.801v2.002c0 0.427-0.124 0.635-0.37 0.635-0.143 0-0.285-0.066-0.428-0.208v-2.855c0.143-0.143 0.285-0.209 0.428-0.209 0.246 0 0.37 0.218 0.37 0.635z" fill="currentColor" />
                            </svg>

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
                            <li><Link href="#" className='text-secondary hover:text-white'>Contact us</Link></li>
                            <li><Link href="#" className='text-secondary hover:text-white'>Advertise</Link></li>
                        </ul>
                    </div>
                    <div className="">
                        <p className='text-white'>Legal</p>
                        <ul className='mt-2'>
                            <li><Link href="#" className='text-secondary hover:text-white'>Privacy Policy</Link></li>
                            <li><Link href="#" className='text-secondary hover:text-white'>Terms of service</Link></li>
                            <li><Link href="#" className='text-secondary hover:text-white'>Careers</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer