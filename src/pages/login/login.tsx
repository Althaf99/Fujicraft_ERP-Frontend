
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

type LoginProps = {
  onLogin?: () => void;
};


const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin' && password === 'admin') {
      setError('');
      if (onLogin) onLogin();
      navigate('/');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login to ERP</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">Login</button>
          {error && <div style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
