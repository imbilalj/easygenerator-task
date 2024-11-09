import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import AuthForm from '../components/AuthForm';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { loginSchema } from '../schemas/loginSchema';
import { useAuth } from '../context/AuthContext';
import { login } from '../api/auth';
import { LoginFormValues } from '../types';
import Loader from '../components/Loader';

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const [serverError, setServerError] = useState<string | null>(null);

  const { user, setUserData, loading } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);

    try {
      const response = await login(data);

      setUserData(response);

      navigate('/dashboard');
    } catch (error) {
      if (error instanceof AxiosError) {
        setServerError(
          error.response?.data?.message || 'An error occurred during login.'
        );
      } else {
        setServerError('Uknown error occured.');
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
    <AuthForm title='Login' onSubmit={handleSubmit(onSubmit)}>
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
        text={isSubmitting ? 'Logging In...' : 'Login'}
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
        New here?{' '}
        <Link to='/signup' className='text-blue-500 hover:underline'>
          Sign Up
        </Link>
      </p>
    </AuthForm>
  );
};

export default Login;
