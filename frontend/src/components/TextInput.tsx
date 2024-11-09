import React from 'react';
import { TextInputProps } from '../types';

const TextInput: React.FC<TextInputProps> = ({
  label,
  type = 'text',
  name,
  register,
  error,
}) => (
  <div>
    <label className='block text-sm font-medium'>{label}</label>
    <input
      type={type}
      {...register(name)}
      className={`mt-1 p-2 border rounded w-full ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    {error && <p className='text-red-500 text-sm mt-1'>{error.message}</p>}
  </div>
);

export default TextInput;
