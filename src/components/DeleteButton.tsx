import React from 'react';

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => (
  <button
    style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, verticalAlign: 'middle' }}
    title="Delete"
    onClick={onClick}
  >
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 8a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1zm4 1a1 1 0 0 0-2 0v6a1 1 0 1 0 2 0V9zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1z" fill="#dc2626"/>
        <path d="M4 6V5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v1h1a1 1 0 1 1 0 2h-1v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8H3a1 1 0 1 1 0-2h1zm2-1v1h8V5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" fill="#dc2626"/>
      </svg>
    </span>
  </button>
);

export default DeleteButton;
