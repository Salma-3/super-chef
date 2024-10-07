'use client'
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [errors, setError] = useState({
    message: '',
    fieldErrors: {}
  })

  const router = useRouter()
 
  const onSubmit = async (evt: FormEvent) => {
    evt.preventDefault()
    

    const result = await signIn('credentials', { email, password, redirect: false })
      
    if(!result?.ok) {
      setError({ ...errors, message: result?.error! })
    } else {
      router.push('/profile')

    }
    
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h1 className="text-4xl font-bold text-gray-700 text-center mb-8">Sign In</h1>
      <form onSubmit={onSubmit} className="space-y-4">
          {errors.message && <p className='text-red-500'>* {errors.message}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <LoginButton />
        </form>
        <p className='mt-4'>You don&apos;t have account? <Link className='text-primary hover:underline' href='/auth/signup'>signup</Link></p>
      </div>
    </div>
  );
};

export default LoginForm;

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type='submit'
      className="w-full bg-primary text-white py-2 rounded-md hover:bg-darkorange focus:outline-none disabled:opacity-75"
      disabled={pending}>
      {pending ? 'submitting...': 'Log in'}
    </button>
  );
}
