import React, { useState } from "react";
import { getMembershipById, checkInMember } from "../../utils/firebase";
import Page from "../fragments/Page";
import { useUser } from "../../context/UserContext";

function LogEntry() {
  const [memberNumber, setMemberNumber] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const { user } = useUser();

  const handleLogEntry = async () => {
    setError("");
    setStatus(null);
    try {
      const membershipDoc = await getMembershipById(memberNumber);
      const membershipId = membershipDoc.id;

      try {
        const attendanceId = await checkInMember(membershipId, user, memberNumber);
        setStatus(`Checked in successfully!`);
      } catch (checkInError) {
        setError(checkInError.message);
      }
    } catch (error) {
      setError("No such membership ID!");
    }
  };

  return (
    <Page>
      <h2>Log Entry</h2>
      <div>
        <label>ID:</label>
        <input type="text" value={memberNumber} onChange={(e) => setMemberNumber(e.target.value)} required />
        <button onClick={handleLogEntry}>Log Entry</button>
      </div>
      {status && <p>{status}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Page>
  );
}

export default LogEntry;
