import React, { useState, useEffect } from "react";
import { getMembershipById, checkInMember } from "../../utils/firebase";
import Page from "../fragments/Page";
import { useUser } from "../../context/UserContext";
import styles from "./LogEntry.module.css";

function LogEntry() {
  const [memberNumber, setMemberNumber] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [fadeStatus, setFadeStatus] = useState(false);
  const [fadeError, setFadeError] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    let statusTimer, errorTimer;
    if (status) {
      setFadeStatus(false);
      statusTimer = setTimeout(() => {
        setFadeStatus(true);
      }, 1000);

      setTimeout(() => {
        setStatus(null);
      }, 2000);
    }
    if (error) {
      setFadeError(false);
      errorTimer = setTimeout(() => {
        setFadeError(true);
      }, 1000);

      setTimeout(() => {
        setError(null);
      }, 2000);
    }
    return () => {
      clearTimeout(statusTimer);
      clearTimeout(errorTimer);
    };
  }, [status, error]);

  const handleLogEntry = async () => {
    setError("");
    setStatus(null);
    try {
      const membershipDoc = await getMembershipById(memberNumber);
      const membershipId = membershipDoc.id;

      try {
        await checkInMember(membershipId, user, memberNumber);
        setStatus("Checked in successfully!");
      } catch (checkInError) {
        setError(checkInError.message);
      }
    } catch (error) {
      setError("No such membership ID!");
    }
  };

  return (
    <Page>
      <h2>Check-in Card</h2>
      <div className={styles.inputGroup}>
        <input type="text" value={memberNumber} onChange={(e) => setMemberNumber(e.target.value)} required placeholder="Card ID" />
        <div className={styles.buttonGroup}>
          <button onClick={handleLogEntry}>Log Entry</button>
        </div>
      </div>
      {status && <p className={`${styles.status} ${fadeStatus ? styles.fadeOut : ""}`}>{status}</p>}
      {error && (
        <p className={`${styles.error} ${fadeError ? styles.fadeOut : ""}`} style={{ color: "red" }}>
          {error}
        </p>
      )}
    </Page>
  );
}

export default LogEntry;
