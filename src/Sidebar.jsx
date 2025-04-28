import React from 'react';
<<<<<<< HEAD
import { Link, useLocation } from "react-router-dom";
=======
import { Link } from "react-router-dom";
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
import {
  BsColumnsGap,
  BsFileEarmarkSpreadsheetFill,
  BsFillGrid3X3GapFill,
<<<<<<< HEAD
  BsFillRocketFill
} from 'react-icons/bs';
import { IoClose } from "react-icons/io5";
import { FaCalendarAlt, FaGraduationCap } from "react-icons/fa";
import './Sidebar.css';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Liste des routes pour vérifier l'élément actif
  const menuItems = [
    { path: '/', icon: <BsColumnsGap className="icon" />, label: 'Tableau de bord' },
    { path: '/EmploisDuTemps', icon: <FaCalendarAlt className="icon" />, label: 'Emplois du temps' },
    { path: '/PlanningExams', icon: <BsFileEarmarkSpreadsheetFill className="icon" />, label: 'Planning des exams' },
    { path: '/Evenement', icon: <BsFillGrid3X3GapFill className="icon" />, label: 'Évènements' },
    { path: '/FormationsInscrites', icon: <FaGraduationCap className="icon" />, label: 'Formations inscrites' },
    { path: '/ProjetsDeadlines', icon: <BsFillRocketFill className="icon" />, label: 'Projets & deadlines' },
  ];

  // Vérifier si l'utilisateur est sur la page d'accueil (dashboard)
  const isHomePage = currentPath === '/' || currentPath === '';

=======
  BsCalendar2PlusFill,
  BsFillRocketFill
} from 'react-icons/bs';
import { IoClose } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import './Sidebar.css'; // Adjust the path as needed

function Sidebar({ openSidebarToggle, OpenSidebar }) {
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
  return (
    <aside className={`sidebar ${openSidebarToggle ? 'sidebar-responsive' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <BsColumnsGap className="icon" />
<<<<<<< HEAD
          <span>Menu Principal</span>
=======
          <span>Main Menu</span>
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
        </div>
        <button className="close-btn" onClick={OpenSidebar}>
          <IoClose className="icon" />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
<<<<<<< HEAD
          {menuItems.map((item, index) => (
            <li key={index} className={currentPath.toLowerCase() === item.path.toLowerCase() ? 'active' : ''}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
=======
          <li>
            <Link to="/EmploisDuTemps">
              <FaCalendarAlt className="icon" />
              <span>Emplois du temps</span>
            </Link>
          </li>
          <li>
            <Link to="/PlanningExams">
              <BsFileEarmarkSpreadsheetFill className="icon" />
              <span>Planning des exams</span>
            </Link>
          </li>
          <li>
            <Link to="/Evenement">
              <BsFillGrid3X3GapFill className="icon" />
              <span>Évènements</span>
            </Link>
          </li>
          <li>
            <Link to="/EmploisPersonnalises">
              <BsCalendar2PlusFill className="icon" />
              <span>Emplois personnalisés</span>
            </Link>
          </li>
          <li>
            <Link to="/ProjetsDeadlines">
              <BsFillRocketFill className="icon" />
              <span>Projets & deadlines</span>
            </Link>
          </li>
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
