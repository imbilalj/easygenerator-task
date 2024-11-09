import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { signupSchema } from '../schemas/signupSchema';
import AuthForm from '../components/AuthForm';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { signup } from '../api/auth';
import { SignupFormValues } from '../types';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(signupSchema),
  });

  const { user, loading } = useAuth();

  const navigate = useNavigate();

  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: SignupFormValues) => {
    setServerError(null);

    try {
      await signup(data);

      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        setServerError(
          error.response?.data?.message || 'An error occurred during signup.'
        );
      } else {
        setServerError('Unknown Error');
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthForm title='Sign Up' onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label='Name'
        type='text'
        name='name'
        register={register}
        error={errors.name}
      />
      <TextInput
        label='Email'
        type='email'
        name='email'
        register={register}
        error={errors.email}
      />
      <TextInput
        label='Password'
        type='password'
        name='password'
        register={register}
        error={errors.password}
      />
      <Button
        text={isSubmitting ? 'Signing Up...' : 'Sign Up'}
        type='submit'
        disabled={isSubmitting}
        className='w-full px-4 py-2 text-white bg-blue-500 rounded-md'
      />

      {serverError && (
        <div className='text-red-500 text-sm mb-4 text-center'>
          {serverError}
        </div>
      )}

      <p className='text-center mt-4'>
        Already registered?{' '}
        <Link to='/' className='text-blue-500 hover:underline'>
          Login
        </Link>
      </p>
    </AuthForm>
  );
};

export default Signup;
