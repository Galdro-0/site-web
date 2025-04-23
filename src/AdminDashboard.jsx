import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('emplois');
  const [emploisPersonnalises, setEmploisPersonnalises] = useState([]);
  const [etudiants, setEtudiants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adminData, setAdminData] = useState(null);

  // États pour la gestion des étudiants
  const [selectedEtudiant, setSelectedEtudiant] = useState(null);
  const [showEtudiantForm, setShowEtudiantForm] = useState(false);
  const [etudiantFormMode, setEtudiantFormMode] = useState('add'); // 'add' ou 'edit'
  const [etudiantFormData, setEtudiantFormData] = useState({
    cin: '',
    apogee: '',
    nom: '',
    prenom: '',
    email: '',
    password: '',
    filiere: '',
    annee: ''
  });

  // État pour le formulaire de création d'emploi personnalisé
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    filiere: '',
    annee: '',
    etudiants: [],
    pourTouteFiliere: true, // Par défaut, l'emploi est pour toute la filière
    emplois: [
      {
        jour: 'Lundi',
        creneaux: []
      },
      {
        jour: 'Mardi',
        creneaux: []
      },
      {
        jour: 'Mercredi',
        creneaux: []
      },
      {
        jour: 'Jeudi',
        creneaux: []
      },
      {
        jour: 'Vendredi',
        creneaux: []
      }
    ]
  });

  // État pour contrôler l'affichage de la sélection d'étudiants spécifiques
  const [showStudentSelection, setShowStudentSelection] = useState(false);

  // Vérifier si l'admin est connecté
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const adminDataStr = localStorage.getItem('adminData');

    if (!adminToken || !adminDataStr) {
      navigate('/admin/login');
      return;
    }

    setAdminData(JSON.parse(adminDataStr));

    // Charger les données
    fetchEmploisPersonnalises();
    fetchEtudiants();
  }, [navigate]);

  // Charger les étudiants lorsque l'onglet est sélectionné
  useEffect(() => {
    if (activeTab === 'etudiants') {
      fetchEtudiants();
    }
  }, [activeTab]);

  // Récupérer les emplois personnalisés
  const fetchEmploisPersonnalises = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');

      const response = await fetch('http://localhost:5000/api/emplois-personnalises', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des emplois personnalisés');
      }

      const data = await response.json();
      setEmploisPersonnalises(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Récupérer la liste des étudiants
  const fetchEtudiants = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');

      const response = await fetch('http://localhost:5000/api/admin/etudiants', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des étudiants');
      }

      const data = await response.json();
      setEtudiants(data);
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la récupération des étudiants: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Ajouter un nouvel étudiant
  const addEtudiant = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('adminToken');

      const response = await fetch('http://localhost:5000/api/admin/etudiants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(etudiantFormData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création de l\'\u00e9tudiant');
      }

      // Réinitialiser le formulaire
      setEtudiantFormData({
        cin: '',
        apogee: '',
        nom: '',
        prenom: '',
        email: '',
        password: '',
        filiere: '',
        annee: ''
      });

      // Fermer le formulaire
      setShowEtudiantForm(false);

      // Rafraîchir la liste des étudiants
      fetchEtudiants();

      alert('Étudiant créé avec succès!');
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour un étudiant existant
  const updateEtudiant = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('adminToken');

      // Créer une copie des données du formulaire sans le mot de passe s'il est vide
      const updateData = { ...etudiantFormData };
      if (!updateData.password) {
        delete updateData.password;
      }

      const response = await fetch(`http://localhost:5000/api/admin/etudiants/${selectedEtudiant._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la mise à jour de l\'\u00e9tudiant');
      }

      // Réinitialiser le formulaire
      setEtudiantFormData({
        cin: '',
        apogee: '',
        nom: '',
        prenom: '',
        email: '',
        password: '',
        filiere: '',
        annee: ''
      });

      // Fermer le formulaire
      setShowEtudiantForm(false);
      setSelectedEtudiant(null);

      // Rafraîchir la liste des étudiants
      fetchEtudiants();

      alert('Étudiant mis à jour avec succès!');
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un étudiant
  const deleteEtudiant = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('adminToken');

      const response = await fetch(`http://localhost:5000/api/admin/etudiants/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la suppression de l\'\u00e9tudiant');
      }

      // Rafraîchir la liste des étudiants
      fetchEtudiants();

      alert('Étudiant supprimé avec succès!');
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Ouvrir le formulaire d'ajout d'étudiant
  const openAddEtudiantForm = () => {
    setEtudiantFormData({
      cin: '',
      apogee: '',
      nom: '',
      prenom: '',
      email: '',
      password: '',
      filiere: '',
      annee: ''
    });
    setEtudiantFormMode('add');
    setShowEtudiantForm(true);
  };

  // Ouvrir le formulaire de modification d'étudiant
  const openEditEtudiantForm = (etudiant) => {
    setSelectedEtudiant(etudiant);
    setEtudiantFormData({
      cin: etudiant.cin,
      apogee: etudiant.apogee,
      nom: etudiant.nom,
      prenom: etudiant.prenom,
      email: etudiant.email,
      password: '', // Laisser vide pour ne pas changer le mot de passe
      filiere: etudiant.filiere,
      annee: etudiant.annee
    });
    setEtudiantFormMode('edit');
    setShowEtudiantForm(true);
  };

  // Gérer les changements dans le formulaire étudiant
  const handleEtudiantFormChange = (e) => {
    const { name, value } = e.target;
    setEtudiantFormData({
      ...etudiantFormData,
      [name]: value
    });
  };

  // Soumettre le formulaire étudiant
  const handleEtudiantFormSubmit = (e) => {
    e.preventDefault();
    if (etudiantFormMode === 'add') {
      addEtudiant();
    } else {
      updateEtudiant();
    }
  };

  // Gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  // Gérer les changements dans le formulaire
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Si la filière ou l'année change, mettre à jour le titre par défaut
    if (name === 'filiere' || name === 'annee') {
      const filiere = name === 'filiere' ? value : formData.filiere;
      const annee = name === 'annee' ? value : formData.annee;

      if (filiere && annee) {
        const filiereMap = {
          'iacs': 'IACS',
          'aa': 'AA',
          'g2er': 'G2ER',
          'tdi': 'TDI',
          'tous': 'Toutes filières'
        };

        const anneeMap = {
          '1': '1ère année',
          '2': '2ème année',
          '3': '3ème année',
          'tous': 'Toutes années'
        };

        const titreAuto = `Emploi du temps - ${filiereMap[filiere]} - ${anneeMap[annee]}`;

        if (!formData.titre || formData.titre.startsWith('Emploi du temps -')) {
          setFormData(prev => ({
            ...prev,
            titre: titreAuto
          }));
        }
      }
    }
  };

  // Gérer le changement du mode d'attribution (toute filière ou étudiants spécifiques)
  const handleAttributionModeChange = (e) => {
    const pourTouteFiliere = e.target.value === 'filiere';
    setFormData({
      ...formData,
      pourTouteFiliere,
      // Réinitialiser la liste des étudiants si on passe en mode "toute filière"
      etudiants: pourTouteFiliere ? [] : formData.etudiants
    });
    setShowStudentSelection(!pourTouteFiliere);
  };

  // Gérer la sélection des étudiants
  const handleEtudiantSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      etudiants: selectedOptions
    });
  };

  // Ajouter un créneau à un jour
  const addCreneau = (jour) => {
    const jourIndex = formData.emplois.findIndex(j => j.jour === jour);
    if (jourIndex !== -1) {
      const newEmplois = [...formData.emplois];
      newEmplois[jourIndex].creneaux.push({
        module: '',
        debut: '',
        fin: '',
        salle: '',
        professeur: ''
      });
      setFormData({
        ...formData,
        emplois: newEmplois
      });
    }
  };

  // Supprimer un créneau
  const removeCreneau = (jour, index) => {
    const jourIndex = formData.emplois.findIndex(j => j.jour === jour);
    if (jourIndex !== -1) {
      const newEmplois = [...formData.emplois];
      newEmplois[jourIndex].creneaux.splice(index, 1);
      setFormData({
        ...formData,
        emplois: newEmplois
      });
    }
  };

  // Gérer les changements dans les créneaux
  const handleCreneauChange = (jour, index, field, value) => {
    const jourIndex = formData.emplois.findIndex(j => j.jour === jour);
    if (jourIndex !== -1) {
      const newEmplois = [...formData.emplois];
      newEmplois[jourIndex].creneaux[index][field] = value;
      setFormData({
        ...formData,
        emplois: newEmplois
      });
    }
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');

      const response = await fetch('http://localhost:5000/api/emplois-personnalises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création de l\'emploi personnalisé');
      }

      // Réinitialiser le formulaire
      setFormData({
        titre: '',
        description: '',
        filiere: '',
        annee: '',
        etudiants: [],
        pourTouteFiliere: true,
        emplois: [
          { jour: 'Lundi', creneaux: [] },
          { jour: 'Mardi', creneaux: [] },
          { jour: 'Mercredi', creneaux: [] },
          { jour: 'Jeudi', creneaux: [] },
          { jour: 'Vendredi', creneaux: [] }
        ]
      });

      // Réinitialiser l'affichage de la sélection d'étudiants
      setShowStudentSelection(false);

      // Rafraîchir la liste des emplois
      fetchEmploisPersonnalises();

      alert('Emploi du temps personnalisé créé avec succès!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un emploi personnalisé
  const deleteEmploiPersonnalise = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet emploi du temps personnalisé?')) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');

      const response = await fetch(`http://localhost:5000/api/emplois-personnalises/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'emploi personnalisé');
      }

      // Rafraîchir la liste des emplois
      fetchEmploisPersonnalises();

      alert('Emploi du temps personnalisé supprimé avec succès!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Tableau de bord administrateur</h1>
        {adminData && (
          <div className="admin-info">
            <span>{adminData.prenom} {adminData.nom}</span>
            <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
          </div>
        )}
      </header>

      <div className="admin-tabs">
        <button
          className={activeTab === 'emplois' ? 'active' : ''}
          onClick={() => setActiveTab('emplois')}
        >
          Emplois personnalisés
        </button>
        <button
          className={activeTab === 'creer' ? 'active' : ''}
          onClick={() => setActiveTab('creer')}
        >
          Créer un emploi personnalisé
        </button>
        <button
          className={activeTab === 'etudiants' ? 'active' : ''}
          onClick={() => setActiveTab('etudiants')}
        >
          Gestion des étudiants
        </button>
      </div>

      <div className="admin-content">
        {error && <div className="error-message">{error}</div>}

        {activeTab === 'emplois' && (
          <div className="emplois-list">
            <h2>Liste des emplois du temps personnalisés</h2>
            {loading ? (
              <p>Chargement...</p>
            ) : emploisPersonnalises.length === 0 ? (
              <p>Aucun emploi du temps personnalisé trouvé.</p>
            ) : (
              <table className="emplois-table">
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Filière</th>
                    <th>Année</th>
                    <th>Nombre d'étudiants</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {emploisPersonnalises.map(emploi => (
                    <tr key={emploi._id}>
                      <td>{emploi.titre}</td>
                      <td>{emploi.filiere}</td>
                      <td>{emploi.annee}</td>
                      <td>{emploi.etudiants.length}</td>
                      <td>
                        <button
                          onClick={() => navigate(`/admin/emplois/${emploi._id}`)}
                          className="view-btn"
                        >
                          Voir
                        </button>
                        <button
                          onClick={() => deleteEmploiPersonnalise(emploi._id)}
                          className="delete-btn"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'creer' && (
          <div className="create-emploi">
            <h2>Créer un emploi du temps personnalisé</h2>
            <form onSubmit={handleSubmit} className="emploi-form">
              <div className="form-group">
                <label>Titre:</label>
                <input
                  type="text"
                  name="titre"
                  value={formData.titre}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Filière:</label>
                  <select
                    name="filiere"
                    value={formData.filiere}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="iacs">IACS</option>
                    <option value="aa">AA</option>
                    <option value="g2er">G2ER</option>
                    <option value="tdi">TDI</option>
                    <option value="tous">Toutes les filières</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Année:</label>
                  <select
                    name="annee"
                    value={formData.annee}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="1">1ère année</option>
                    <option value="2">2ème année</option>
                    <option value="3">3ème année</option>
                    <option value="tous">Toutes les années</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Attribuer à:</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="attributionMode"
                      value="filiere"
                      checked={formData.pourTouteFiliere}
                      onChange={handleAttributionModeChange}
                    />
                    Toute la filière/année sélectionnée
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="attributionMode"
                      value="etudiants"
                      checked={!formData.pourTouteFiliere}
                      onChange={handleAttributionModeChange}
                    />
                    Étudiants spécifiques
                  </label>
                </div>
              </div>

              {showStudentSelection && (
                <div className="form-group">
                  <label>Étudiants:</label>
                  <select
                    multiple
                    name="etudiants"
                    value={formData.etudiants}
                    onChange={handleEtudiantSelection}
                    className="students-select"
                    required={!formData.pourTouteFiliere}
                  >
                    {etudiants
                      .filter(etudiant =>
                        (formData.filiere === 'tous' || etudiant.filiere === formData.filiere) &&
                        (formData.annee === 'tous' || etudiant.annee === formData.annee)
                      )
                      .map(etudiant => (
                        <option key={etudiant._id} value={etudiant._id}>
                          {etudiant.nom} {etudiant.prenom} ({etudiant.filiere} - {etudiant.annee})
                        </option>
                      ))
                    }
                  </select>
                  <small>Maintenez Ctrl (ou Cmd) pour sélectionner plusieurs étudiants</small>
                </div>
              )}

              <h3>Emploi du temps</h3>

              {formData.emplois.map((jour, jourIndex) => (
                <div key={jour.jour} className="jour-section">
                  <h4>{jour.jour}</h4>

                  {jour.creneaux.map((creneau, creneauIndex) => (
                    <div key={creneauIndex} className="creneau-row">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Module:</label>
                          <input
                            type="text"
                            value={creneau.module}
                            onChange={(e) => handleCreneauChange(jour.jour, creneauIndex, 'module', e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>Début:</label>
                          <input
                            type="time"
                            value={creneau.debut}
                            onChange={(e) => handleCreneauChange(jour.jour, creneauIndex, 'debut', e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>Fin:</label>
                          <input
                            type="time"
                            value={creneau.fin}
                            onChange={(e) => handleCreneauChange(jour.jour, creneauIndex, 'fin', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Salle:</label>
                          <input
                            type="text"
                            value={creneau.salle}
                            onChange={(e) => handleCreneauChange(jour.jour, creneauIndex, 'salle', e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>Professeur:</label>
                          <input
                            type="text"
                            value={creneau.professeur}
                            onChange={(e) => handleCreneauChange(jour.jour, creneauIndex, 'professeur', e.target.value)}
                            required
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => removeCreneau(jour.jour, creneauIndex)}
                          className="remove-btn"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addCreneau(jour.jour)}
                    className="add-btn"
                  >
                    + Ajouter un créneau
                  </button>
                </div>
              ))}

              <div className="form-actions">
                <button type="submit" disabled={loading} className="submit-btn">
                  {loading ? 'Création en cours...' : 'Créer l\'emploi du temps'}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'etudiants' && (
          <div className="manage-etudiants">
            <div className="header-actions">
              <h2>Gestion des étudiants</h2>
              <button
                className="add-btn"
                onClick={openAddEtudiantForm}
                disabled={loading}
              >
                + Ajouter un étudiant
              </button>
            </div>

            {showEtudiantForm ? (
              <div className="etudiant-form-container">
                <h3>{etudiantFormMode === 'add' ? 'Ajouter un étudiant' : 'Modifier un étudiant'}</h3>
                <form onSubmit={handleEtudiantFormSubmit} className="etudiant-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>CIN:</label>
                      <input
                        type="text"
                        name="cin"
                        value={etudiantFormData.cin}
                        onChange={handleEtudiantFormChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Numéro Apogée:</label>
                      <input
                        type="text"
                        name="apogee"
                        value={etudiantFormData.apogee}
                        onChange={handleEtudiantFormChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Nom:</label>
                      <input
                        type="text"
                        name="nom"
                        value={etudiantFormData.nom}
                        onChange={handleEtudiantFormChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Prénom:</label>
                      <input
                        type="text"
                        name="prenom"
                        value={etudiantFormData.prenom}
                        onChange={handleEtudiantFormChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={etudiantFormData.email}
                      onChange={handleEtudiantFormChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>{etudiantFormMode === 'add' ? 'Mot de passe:' : 'Nouveau mot de passe (laisser vide pour ne pas changer):'}</label>
                    <input
                      type="password"
                      name="password"
                      value={etudiantFormData.password}
                      onChange={handleEtudiantFormChange}
                      required={etudiantFormMode === 'add'}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Filière:</label>
                      <select
                        name="filiere"
                        value={etudiantFormData.filiere}
                        onChange={handleEtudiantFormChange}
                        required
                      >
                        <option value="">-- Sélectionner --</option>
                        <option value="iacs">IACS</option>
                        <option value="aa">AA</option>
                        <option value="g2er">G2ER</option>
                        <option value="tdi">TDI</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Année:</label>
                      <select
                        name="annee"
                        value={etudiantFormData.annee}
                        onChange={handleEtudiantFormChange}
                        required
                      >
                        <option value="">-- Sélectionner --</option>
                        <option value="1">1ère année</option>
                        <option value="2">2ème année</option>
                        <option value="3">3ème année</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => {
                        setShowEtudiantForm(false);
                        setSelectedEtudiant(null);
                      }}
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="submit-btn"
                      disabled={loading}
                    >
                      {loading ? 'Traitement en cours...' : (etudiantFormMode === 'add' ? 'Ajouter' : 'Mettre à jour')}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="etudiants-list">
                {loading && <p>Chargement...</p>}

                {!loading && etudiants.length === 0 ? (
                  <p>Aucun étudiant trouvé.</p>
                ) : (
                  <table className="etudiants-table">
                    <thead>
                      <tr>
                        <th>CIN</th>
                        <th>Apogée</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Filière</th>
                        <th>Année</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {etudiants.map(etudiant => (
                        <tr key={etudiant._id}>
                          <td>{etudiant.cin}</td>
                          <td>{etudiant.apogee}</td>
                          <td>{etudiant.nom}</td>
                          <td>{etudiant.prenom}</td>
                          <td>{etudiant.email}</td>
                          <td>{etudiant.filiere.toUpperCase()}</td>
                          <td>{etudiant.annee}</td>
                          <td>
                            <button
                              className="edit-btn"
                              onClick={() => openEditEtudiantForm(etudiant)}
                            >
                              Modifier
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => deleteEtudiant(etudiant._id)}
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
