import React, { useState } from "react";
import { addMembership } from "../../utils/firebase";
import styles from "./AddCard.module.css"; // Import the CSS module for styling
import Page from "../fragments/Page";
import ModalComponent from "../modals/ModalComponent";

function LogMembership() {
  const [memberNumber, setMemberNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [fullName, setFullName] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setModalMessage("Member added successfully!");
      setIsModalOpen(true);
      setMemberNumber("");
      setCardType("");
      setFullName("");
    } catch (error) {
      console.error(error);
      setModalMessage("Error adding member.");
      setIsModalOpen(true);
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
      <ModalComponent isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} contentLabel="Membership Status">
        <p>{modalMessage}</p>
      </ModalComponent>
    </Page>
  );
}

export default LogMembership;
