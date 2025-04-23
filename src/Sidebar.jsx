import React from 'react';
import { Link } from "react-router-dom";
import {
  BsColumnsGap,
  BsFileEarmarkSpreadsheetFill,
  BsFillGrid3X3GapFill,
  BsCalendar2PlusFill,
  BsFillRocketFill
} from 'react-icons/bs';
import { IoClose } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import './Sidebar.css'; // Adjust the path as needed

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside className={`sidebar ${openSidebarToggle ? 'sidebar-responsive' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <BsColumnsGap className="icon" />
          <span>Main Menu</span>
        </div>
        <button className="close-btn" onClick={OpenSidebar}>
          <IoClose className="icon" />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
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
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
