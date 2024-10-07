import React from 'react';
import LoginForm from '@/app/ui/forms/LoginForm';

const loginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-2xl w-full">
        
        <LoginForm />
      </div>
    </div>
  );
};

export default loginPage;
