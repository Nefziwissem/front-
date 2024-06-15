import React, { useState } from 'react';
import axios from 'axios';
import logo from '../components/logoo.png';
import './SendResetEmail.css';

const SendMailForm = () => {
  const [emailData, setEmailData] = useState({
    subject: '',
    message: '',
    email: '',
  });
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:8000/api/v1/users/send-reset-email/', emailData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      setFeedbackMessage(response.data.message);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email', error);
      setFeedbackMessage('Erreur lors de l\'envoi de l\'email.');
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-form-section">
        <div className="reset-password-form-container">
          <div className="login-logo" style={{ backgroundImage: `url(${logo})` }}></div>
          <h2 className="login-title">Réinitialisation du mot de passe</h2>
          <form onSubmit={handleSubmit} className="reset-password-form">
            <div className="form-group">
              <label className="form-label">Veuillez saisir votre adresse email !</label>
              <input
                type="email"
                name="email"
                value={emailData.email}
                onChange={handleChange}
                placeholder="Votre adresse email"
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="login-button">Connexion</button>
            {feedbackMessage && <p>{feedbackMessage}</p>}
          </form>
        </div>
      </div>
      <div className="reset-password-image-section"></div>
    </div>
  );
};

export default SendMailForm;
