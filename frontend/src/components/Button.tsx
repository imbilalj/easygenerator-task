import React from 'react';
import { ButtonProps } from '../types';

const Button: React.FC<ButtonProps> = ({
  text,
  type = 'button',
  className,
  disabled = false,
  onClick,
}) => (
  <button
    type={type}
    className={className}
    disabled={disabled}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
