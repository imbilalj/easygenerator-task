import React, { useEffect } from 'react';
import { ToastProps } from '../types';

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeStyles =
    type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';

  return (
    <div
      className={`fixed bottom-5 right-5 p-4 rounded-lg shadow-lg ${typeStyles} flex items-center justify-between max-w-xs`}
    >
      <span>{message}</span>
      <button onClick={onClose} className='ml-4 text-xl font-bold'>
        &times;
      </button>
    </div>
  );
};

export default Toast;
