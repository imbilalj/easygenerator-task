import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthFormProps {
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export interface TextInputProps {
  label: string;
  type?: string;
  name: string;
  register: any;
  error?: FieldError;
}

export interface ButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}
