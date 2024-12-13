import React from "react";
import styles from "./styles/navbar.module.css";
import { CiSearch } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import "../App.css"
const Navbar = () => {
  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <h2>Profile-MapApp</h2>
        <div className={styles.navContainer}>
          <ul className={styles.nav}>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/admin">Admin</NavLink></li>    
          </ul>
        </div>
      </div>
    </div>
  );    
};

export default Navbar;
