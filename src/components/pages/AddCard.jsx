import React, { useState } from "react";
import { addMembership } from "../../utils/firebase";
import styles from "./AddCard.module.css"; // Import the CSS module for styling
import Page from "../fragments/Page";

function LogMembership() {
  const [memberNumber, setMemberNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleCardTypeSelection = (type) => {
    setCardType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const membershipData = {
        memberNumber,
        cardType,
        fullName,
      };
      console.log(membershipData);
      await addMembership(membershipData);
      setConfirmationMessage("Member added successfully!");
      setMemberNumber("");
      setCardType("");
      setFullName("");
    } catch (error) {
      console.error(error);
      setConfirmationMessage("Error adding member.");
    }
  };

  return (
    <Page>
      <h2>Add New Card</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <div>
            <input type="number" value={memberNumber} onChange={(e) => setMemberNumber(e.target.value)} required placeholder="ID" />
          </div>
          <div>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="Full Name" />
          </div>
        </div>
        <div>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={cardType === "Youth" ? styles.activeButton : styles.inactiveButton}
              onClick={() => handleCardTypeSelection("Youth")}>
              Youth
            </button>
            <button
              type="button"
              className={cardType === "Season Ticket" ? styles.activeButton : styles.inactiveButton}
              onClick={() => handleCardTypeSelection("Season Ticket")}>
              Season
            </button>
            <button
              type="button"
              className={cardType === "Member" ? styles.activeButton : styles.inactiveButton}
              onClick={() => handleCardTypeSelection("Member")}>
              Member
            </button>
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>
          Add New Card
        </button>
      </form>
      {confirmationMessage && <p className={styles.confirmationMessage}>{confirmationMessage}</p>}
    </Page>
  );
}

export default LogMembership;
