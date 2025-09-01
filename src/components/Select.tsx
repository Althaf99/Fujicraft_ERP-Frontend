import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({ label, options, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>{label}</label>}
    <select
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
    >
      <option value="">Select...</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export default Select;
