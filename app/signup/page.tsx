import React from 'react';
import SignupForm from '@/app/ui/forms/SignupForm'; 

const signupPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-2xl w-full">
        <SignupForm />
      </div>
    </div>
  );
};

export default signupPage;
