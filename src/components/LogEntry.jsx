import React, { useState } from "react";
import { getMembershipById, checkInMember } from "../utils/firebase";
import Page from "./Page";
function LogEntry() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  const handleLogEntry = async () => {
    setError("");
    setStatus(null);
    try {
      const membershipDoc = await getMembershipById(id);
      const membershipId = membershipDoc.id;

      try {
        const attendanceId = await checkInMember(membershipId);
        setStatus(`Checked in successfully with ID: ${attendanceId}`);
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
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
        <button onClick={handleLogEntry}>Log Entry</button>
      </div>
      {status && <p>{status}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Page>
  );
}

export default LogEntry;
