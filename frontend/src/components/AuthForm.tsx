import React from 'react';
import { AuthFormProps } from '../types';

const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit, children }) => (
  <div className='flex items-center justify-center h-screen bg-gray-100'>
    <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold text-center'>{title}</h2>
      <form onSubmit={onSubmit} noValidate className='space-y-4'>
        {children}
      </form>
    </div>
  </div>
);

export default AuthForm;
