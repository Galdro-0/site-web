import React, { useState } from "react";
import Image from "../assets/images.png";
import Logo from "../assets/ENSA-BENI-MELLAL-LOGO.png";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [apogee, setApogee] = useState("");
  const [cin, setCin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fermer le formulaire lorsque l'utilisateur clique en dehors
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apogee, cin }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur de connexion");
      }

      // Stocker le token et les informations de l'utilisateur
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userData", JSON.stringify({
        id: data._id,
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        filiere: data.filiere,
        annee: data.annee
      }));

      // Appeler la fonction de succès qui gérera la redirection
      if (onLoginSuccess) {
        onLoginSuccess(data);
      }
      // La redirection est maintenant gérée par le composant parent
    } catch (err) {
      setError(err.message || "Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.loginMain}>
        <div style={styles.loginLeft}>
          <img src={Image} alt="Login Illustration" style={styles.loginImage} />
        </div>
        <div style={styles.loginRight}>
          <div style={styles.loginRightContainer}>
            <div style={styles.loginLogo}>
              <img src={Logo} alt="ENSA Beni Mellal Logo" style={styles.logoImage} />
            </div>
            <div style={styles.loginCenter}>
              <h2 style={styles.welcomeText}>Welcome back!</h2>
              <p style={styles.subText}>Please enter your details</p>
              {error && <p style={styles.errorText}>{error}</p>}
              <form style={styles.loginForm} onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="Appogée"
                  style={styles.inputField}
                  value={apogee}
                  onChange={(e) => setApogee(e.target.value)}
                  required
                />
                <div style={styles.passInputDiv}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="CIN"
                    style={styles.inputField}
                    value={cin}
                    onChange={(e) => setCin(e.target.value)}
                    required
                  />
                  <span
                    style={styles.eyeIcon}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <div style={styles.loginCenterOptions}>
                  <div style={styles.rememberDiv}>
                    <input
                      type="checkbox"
                      id="remember-checkbox"
                      style={styles.checkbox}
                    />
                    <label htmlFor="remember-checkbox" style={styles.checkboxLabel}>
                      Remember for 30 days
                    </label>
                  </div>
                </div>
                <div style={styles.loginCenterButtons}>
                  <button
                    type="submit"
                    style={styles.loginButton}
                    disabled={loading}
                  >
                    {loading ? "Connexion en cours..." : "Log In"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles JSX
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loginMain: {
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  loginLeft: {
    flex: 1,
    backgroundImage: "url('src/assets/Rectangle 4.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginImage: {
    maxWidth: '80%',
    height: 'auto',
  },
  loginRight: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  loginRightContainer: {
    width: '100%',
    maxWidth: '400px',
  },
  loginLogo: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  logoImage: {
    width: '100px',
    height: 'auto',
  },
  loginCenter: {
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subText: {
    fontSize: '14px',
    color: '#718096',
    marginBottom: '20px',
  },
  errorText: {
    color: 'red',
    marginBottom: '15px',
    fontSize: '14px',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputField: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #cbd5e0',
    fontSize: '14px',
  },
  passInputDiv: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#718096',
  },
  loginCenterOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  rememberDiv: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  checkbox: {
    cursor: 'pointer',
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#4a5568',
  },
  loginCenterButtons: {
    display: 'flex',
    justifyContent: 'center',
  },
  loginButton: {
    padding: '10px 20px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default Login;