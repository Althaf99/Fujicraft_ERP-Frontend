import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button
    {...props}
    style={{
      background: '#2563eb',
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      padding: '9px 20px',
      fontSize: 15,
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'background 0.2s',
      marginTop: 8,
      ...props.style
    }}
  >
    {children}
  </button>
);

export default Button;
