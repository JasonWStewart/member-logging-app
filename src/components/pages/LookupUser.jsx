import React, { useState } from "react";
import { getMembershipById } from "../../utils/firebase";
import Page from "../fragments/Page";
import { Link } from "react-router-dom";
import ModalComponent from "../modals/ModalComponent";
import styles from "./LookupUser.module.css";

function LookupUser() {
  const [id, setId] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLookup = async () => {
    setError("");
    setUserData(null);
    try {
      const membershipDoc = await getMembershipById(id);
      const membershipData = membershipDoc.data();
      setUserData(membershipData);
      setIsModalOpen(true);
    } catch (error) {
      setError("No such membership ID!");
      setIsModalOpen(true);
    }
  };

  return (
    <Page>
      <h2>Lookup Card ID</h2>

      <div className={styles.inputGroup}>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} required placeholder="Card ID" />
        <div className={styles.buttonGroup}>
          <button onClick={handleLookup}>Lookup</button>
          <Link to="/list-members">
            <button>Show All</button>
          </Link>
        </div>
      </div>
      <ModalComponent isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} contentLabel="User Lookup Result">
        {userData ? (
          <div>
            <h3>User Info</h3>
            <p>Name: {userData.fullName}</p>
            <p>Card Type: {userData.cardType}</p>
          </div>
        ) : (
          <p style={{ color: "red" }}>{error}</p>
        )}
      </ModalComponent>
    </Page>
  );
}

export default LookupUser;
