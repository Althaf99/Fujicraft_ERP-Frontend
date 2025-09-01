import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>{label}</label>}
    <input
      {...props}
      style={{
        width: '100%',
        padding: '9px 12px',
        border: '1px solid #d1d5db',
        borderRadius: 6,
        fontSize: 15,
        outline: 'none',
        ...props.style
      }}
    />
  </div>
);

export default Input;
