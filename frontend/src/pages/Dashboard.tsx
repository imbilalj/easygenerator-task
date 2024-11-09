import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { getUser } from '../api/user';
import Loader from '../components/Loader';
import { logout } from '../api/auth';

const Dashboard: React.FC = () => {
  const { user, setUserData, removeUserData } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    removeUserData();
    navigate('/');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();

        setUserData(response);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          handleLogout();
        }
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <Loader />;
  }

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6'>
        <h1 className='text-3xl font-semibold text-blue-500 mb-4'>
          Welcome, {user.name}!
        </h1>
        <p className='text-gray-700 mb-6'>Welcome to the application.</p>

        <div className='flex justify-end'>
          <Button
            text={'Logout'}
            onClick={handleLogout}
            className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200'
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
