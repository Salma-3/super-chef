'use client'
import { createUser } from '@/app/lib/actions/users';
import { createUserSchema } from '@/app/lib/validations';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<{
    message: string;
    fieldErrors: { email?: string[], username?: string[], password?: string[]};
  }>({
    message: '',
    fieldErrors: {}
  })
  
  const [loading, setLoading] = useState(false)

  const {username, email, password, confirmPassword} = formData;

  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true)
    setErrors({ message: '', fieldErrors: {} })

    if(password !== confirmPassword) {
      setErrors({ ...errors, fieldErrors: { password: ['Passwords don\'t match']}})
      setLoading(false)
      return;
    }
    console.log('Form Data Submitted:', formData);

    const result = await createUser(formData)
    console.log(result)

    if(!result.success) {
      setErrors({ 
        ...errors, 
        message: result.message || '', 
        fieldErrors: result.errors || {} 
      });
      setLoading(false);
      return;
    } else {
      await signIn('credentials', { email, password })
      // router.push('/profile')
    }

  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h1 className="text-4xl font-bold text-gray-700 text-center mb-8">Signup</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
          {errors.message && <p className="text-red-500">* {errors.message}</p>}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
            <small className="text-red-500">{errors.fieldErrors.username?.join(',')}</small>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
            <small className="text-red-500">{errors.fieldErrors.email?.join(',')}</small>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
            <small className="text-red-500">{errors.fieldErrors.password?.join(',')}</small>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-darkorange focus:outline-none disabled:bg-primary/50"
            disabled={loading} 
          >
            {!loading ? 'Sign Up' : 'Submitting...'}
          </button>
        </form>
        <p className='mt-4'>do you have an account? <Link className='text-primary hover:underline' href='/auth/login'>login</Link></p>
      </div>
    </div>
  );
};

export default SignupForm;
