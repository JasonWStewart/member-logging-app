import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import styles from "./Navbar.module.css";
import { BsSpeedometer, BsDoorOpen, BsDoorClosed, BsPlusCircle, BsClipboard2Check, BsSearch } from "react-icons/bs";

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
              <h2>
                <BsSpeedometer />
              </h2>
            </Link>
            <Link to="/log-membership" className={styles.navItem}>
              <h2>
                <BsPlusCircle />
              </h2>
            </Link>
            <Link to="/log-entry" className={styles.navItem}>
              <h2>
                <BsClipboard2Check />
              </h2>
            </Link>
            <Link to="/lookup-user" className={styles.navItem}>
              <h2>
                <BsSearch />
              </h2>
            </Link>
            <Link to="/logout" className={styles.navItem}>
              <h2>
                <BsDoorOpen />
              </h2>
            </Link>
          </>
        )}
      </nav>
      {/* {user && <div className={styles.userEmail}>Logged in as: {user.email}</div>} */}
    </div>
  );
}

export default Navbar;
