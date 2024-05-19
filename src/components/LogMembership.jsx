import React, { useState } from "react";
import { addMembership } from "../utils/firebase";
import styles from "./LogMembership.module.css"; // Import the CSS module for styling
import Page from "./Page";
function LogMembership() {
  const [id, setId] = useState("");
  const [cardType, setCardType] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const membershipData = {
        id,
        cardType,
        fullName,
      };
      await addMembership(membershipData);
      setConfirmationMessage("Member added successfully!");
      setId("");
      setCardType("");
      setFullName("");
    } catch (error) {
      setConfirmationMessage("Error adding member.");
    }
  };

  return (
    <Page>
      <h2>Log Membership</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
        </div>
        <div>
          <label>Full Name:</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div>
          <label>Card Type:</label>
          <select value={cardType} onChange={(e) => setCardType(e.target.value)} required>
            <option value="">Select Card Type</option>
            <option value="Youth">Youth</option>
            <option value="Season Ticket">Season Ticket</option>
            <option value="Member">Member</option>
          </select>
        </div>
        <button type="submit">Log Membership</button>
      </form>
      {confirmationMessage && <p className={styles.confirmationMessage}>{confirmationMessage}</p>}
    </Page>
  );
}

export default LogMembership;
