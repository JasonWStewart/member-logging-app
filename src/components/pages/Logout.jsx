import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../utils/firebase";
import { useUser } from "../../context/UserContext";
import Page from "../fragments/Page";

function Logout() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <Page>
      <button onClick={handleLogout}>Logout</button>
    </Page>
  );
}

export default Logout;
