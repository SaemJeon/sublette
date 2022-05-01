import React from "react";
import { Link } from "react-router-dom";
import LogOut from "../components/LogOut.js";
import styles from "../css/Navigation.module.css"

function Navigation() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div  className={styles.items}>
          <Link style={{"textDecoration": "none", "color" :"inherit"}}to="/">Home</Link>
        </div>
        <div className={styles.items}>
          <Link style={{"textDecoration": "none", "color" :"inherit"}} to="/profile">Profile</Link>
        </div>
        <div className={styles.items}>
          <Link style={{"textDecoration": "none", "color" :"inherit"}} to="/add_listing">Add listing</Link>
        </div>
        <div className={styles.items}>
            <Link style={{"textDecoration": "none", "color" :"inherit"}} to="/get_listing">Get listing</Link>
        </div>
        <div className={styles.items}>
          <LogOut />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
