import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../components/logoo.png';
import './ResetPasswordForm.css';

const BACKEND_DOMAIN = 'http://localhost:8000';

const ResetPasswordForm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetPasswordConfirm = async ({ uid, token, newPassword, confirmPassword }) => {
    const RESET_PASSWORD_CONFIRM_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password_confirm/`;
    const data = {
      uid: uid,
      token: token,
      new_password: newPassword,
      re_new_password: confirmPassword,
    };

    const response = await axios.post(RESET_PASSWORD_CONFIRM_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    try {
      const response = await resetPasswordConfirm({ uid, token, newPassword, confirmPassword });
      alert('Votre mot de passe a été réinitialisé avec succès.');
      alert(response.message);
      navigate('/');
    } catch (error) {
      console.error('Échec de la réinitialisation du mot de passe', error);
      alert('Échec de la réinitialisation du mot de passe.');
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
              <label className="form-label">Nouveau mot de passe</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nouveau mot de passe"
                  required
                  className="form-input"
                />
                <i onClick={() => setShowPassword(!showPassword)} className="fa fa-eye password-icon"></i>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirmez le mot de passe</label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmez le mot de passe"
                  required
                  className="form-input"
                />
                <i onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="fa fa-eye password-icon"></i>
              </div>
            </div>

            <button type="submit" className="login-button">Réinitialiser</button>
          </form>
        </div>
      </div>
      <div className="reset-password-image-section"></div>
    </div>
  );
};

export default ResetPasswordForm;
