import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import styles from "./Navbar.module.css";
import { BsSpeedometer, BsDoorOpen, BsDoorClosed } from "react-icons/bs";

function Navbar() {
  const { user } = useUser();

  return (
    <div>
      <nav className={styles.navbar}>
        {!user && (
          <Link to="/" className={styles.navItem}>
            <BsDoorClosed />
          </Link>
        )}
        {user && (
          <>
            <Link to="/dashboard" className={styles.navItem}>
              <BsSpeedometer />
            </Link>
            <Link to="/log-membership" className={styles.navItem}>
              Add
            </Link>
            <Link to="/log-entry" className={styles.navItem}>
              CheckIn
            </Link>
            <Link to="/lookup-user" className={styles.navItem}>
              Lookup
            </Link>
            <Link to="/logout" className={styles.navItem}>
              <BsDoorOpen />
            </Link>
          </>
        )}
      </nav>
      {user && <div className={styles.userEmail}>Logged in as: {user.email}</div>}
    </div>
  );
}

export default Navbar;
