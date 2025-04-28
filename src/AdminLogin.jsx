import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { FaArrowLeft } from 'react-icons/fa';
=======
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
import './Login.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

<<<<<<< HEAD
  // Fonction pour retourner à l'accueil
  const handleReturnToHome = () => {
    navigate('/accueil');
  };

=======
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }

      // Stocker le token et les données admin
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminData', JSON.stringify({
        id: data._id,
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        username: data.username,
        role: data.role
      }));

      // Rediriger vers le tableau de bord admin
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
<<<<<<< HEAD
        <div className="login-header">
          <button
            className="return-button"
            onClick={handleReturnToHome}
            title="Retour à l'accueil"
          >
            <FaArrowLeft /> Retour à l'accueil
          </button>
          <h2>Administration - Connexion</h2>
        </div>
=======
        <h2>Administration - Connexion</h2>
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom d'utilisateur:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Mot de passe:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
