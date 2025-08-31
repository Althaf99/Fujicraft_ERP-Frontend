import React from 'react';

interface DialogProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, title, onClose, children }) => {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.18)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 12,
        minWidth: 340,
        maxWidth: '90vw',
        boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
        padding: 32,
        position: 'relative'
      }}>
        {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
        <button onClick={onClose} style={{
          position: 'absolute',
          top: 16,
          right: 16,
          background: 'none',
          border: 'none',
          fontSize: 20,
          cursor: 'pointer',
          color: '#888'
        }}>&times;</button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
