import React, { useState } from "react";
import { getMembershipById } from "../utils/firebase";
import Page from "./Page";
import { Link } from "react-router-dom";
function LookupUser() {
  const [id, setId] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const handleLookup = async () => {
    setError("");
    setUserData(null);
    try {
      const membershipDoc = await getMembershipById(id);
      const membershipData = membershipDoc.data();
      setUserData(membershipData);
    } catch (error) {
      setError("No such membership ID!");
    }
  };

  return (
    <Page>
      <h2>Lookup Card ID</h2>
      <Link to="/list-members">View All</Link>
      <div>
        <label>ID:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
        <button onClick={handleLookup}>Lookup</button>
      </div>
      {userData && (
        <div>
          <h3>User Info</h3>
          <p>Name: {userData.fullName}</p>
          <p>Card Type: {userData.cardType}</p>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Page>
  );
}

export default LookupUser;
