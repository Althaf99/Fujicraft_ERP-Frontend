import React from 'react';

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => (
  <button
    style={{ marginRight: 10, color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, verticalAlign: 'middle' }}
    title="Edit"
    onClick={onClick}
  >
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.7 2.29a1 1 0 0 1 1.42 0l1.59 1.59a1 1 0 0 1 0 1.42l-9.3 9.3-3.3.71a1 1 0 0 1-1.18-1.18l.71-3.3 9.3-9.3zM3 17a1 1 0 0 0 1 1h12a1 1 0 1 0 0-2H4a1 1 0 0 0-1 1z" fill="#2563eb"/>
      </svg>
    </span>
  </button>
);

export default EditButton;
