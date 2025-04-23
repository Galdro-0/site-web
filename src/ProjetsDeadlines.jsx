import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjetsDeadlines.css';

const ProjetsDeadlines = () => {
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [projets, setProjets] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Récupérer les informations de l'étudiant connecté
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setMajor(userData.filiere);
      setYear(userData.annee);
      setSubmitted(true);
      fetchProjets(userData.filiere, userData.annee);
    }
  }, []);

  const fetchProjets = async (filiere, annee) => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('userToken');
      const url = `http://localhost:5000/api/projets/${filiere}/${annee}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erreur de connexion au serveur' }));
        throw new Error(errorData.message || 'Erreur lors de la récupération des projets');
      }

      const data = await response.json();
      setProjets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (major && year) {
      setSubmitted(true);
      fetchProjets(major, year);
    }
  };

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Fonction pour retourner à la page d'accueil
  const handleReturnToHome = () => {
    navigate('/');
  };

  // Fonction pour retourner à la page d'accueil initiale
  const handleReturnToAccueil = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/accueil');
  };

  return (
    <div className="projets-deadlines-container">
      <div className="header-actions">
        <h2>Projets et Deadlines</h2>
        <div className="buttons-container">
          <button className="return-btn" onClick={handleReturnToHome}>
            Retour à l'accueil
          </button>
          <button className="logout-btn" onClick={handleReturnToAccueil}>
            Déconnexion
          </button>
        </div>
      </div>

      <p>Consultez et gérez vos projets et échéances ici.</p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="projets-form">
          <div className="form-group">
            <label>Filière :</label>
            <select value={major} onChange={(e) => setMajor(e.target.value)} required>
              <option value="">-- Choisir la filière --</option>
              <option value="iacs">IACS</option>
              <option value="aa">AA</option>
              <option value="g2er">G2ER</option>
              <option value="tdi">TDI</option>
            </select>
          </div>

          <div className="form-group">
            <label>Année :</label>
            <select value={year} onChange={(e) => setYear(e.target.value)} required>
              <option value="">-- Choisir l'année --</option>
              <option value="1">1ère année</option>
              <option value="2">2ème année</option>
              <option value="3">3ème année</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">Valider</button>
        </form>
      ) : (
        <div className="projets-result">
          {loading ? (
            <p>Chargement des projets...</p>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <p>Veuillez vérifier que :</p>
              <ul>
                <li>Le serveur backend est en cours d'exécution</li>
                <li>Votre filière et année sont correctes</li>
                <li>Vous êtes bien connecté</li>
              </ul>
            </div>
          ) : projets && projets.projets ? (
            <table className="projets-table">
              <thead>
                <tr>
                  <th>Projet</th>
                  <th>Module</th>
                  <th>Description</th>
                  <th>Deadline</th>
                  <th>Professeur</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {projets.projets.map((projet, index) => (
                  <tr key={index}>
                    <td>{projet.nom}</td>
                    <td>{projet.module}</td>
                    <td>{projet.description}</td>
                    <td>{formatDate(projet.deadline)}</td>
                    <td>{projet.professeur}</td>
                    <td>
                      <span className={`statut ${projet.statut.replace(/\s/g, '').toLowerCase()}`}>
                        {projet.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucun projet disponible</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjetsDeadlines;
