import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import logo from '../components/logoo.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const LOGIN_URL = 'http://localhost:8000/api/v1/users/login/2fa/';
      const response = await axios.post(LOGIN_URL, { email, password }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.data.message) {
        setStep(2);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Email or password is incorrect!');
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();

    try {
      const VERIFY_URL = 'http://localhost:8000/api/v1/users/login/verify/';
      const response = await axios.post(VERIFY_URL, { secret_code: verificationCode }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.data.access) {
        localStorage.setItem('accessToken', response.data.access);
        navigate('/home');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setErrorMessage('Verification code is incorrect!');
    }
  };

  const handleResetEmailClick = () => {
    navigate('/send-reset-email');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-logo" style={{ backgroundImage: `url(${logo})` }}></div>
          <h2 className="login-title">Connexion</h2>
          {errorMessage && <div className="login-error">{errorMessage}</div>}

          {step === 1 && (
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button">Connexion</button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerify} className="login-form">
              <div className="form-group">
                <label className="form-label">Verification Code:</label>
                <input
                  type="text"
                  className="form-input"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button">Verify</button>
            </form>
          )}

          <button className="reset-password-button" onClick={handleResetEmailClick}>Reset Password</button>
        </div>
      </div>
      <div className="login-image"></div>
    </div>
  );
};

export default LoginPage;
