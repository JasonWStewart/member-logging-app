import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Dashboard from "./components/Dashboard";
import LogMembership from "./components/LogMembership";
import LookupUser from "./components/LookupUser";
import ListMembers from "./components/ListMembers";
import LogEntry from "./components/LogEntry";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserProvider, useUser } from "./context/UserContext";

function App() {
  const { user } = useUser();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/log-membership" element={user ? <LogMembership /> : <Navigate to="/" />} />
        <Route path="/lookup-user" element={user ? <LookupUser /> : <Navigate to="/" />} />
        <Route path="/log-entry" element={user ? <LogEntry /> : <Navigate to="/" />} />
        <Route path="/list-members" element={user ? <ListMembers /> : <Navigate to="/" />} />
        <Route path="/logout" element={user ? <Logout /> : <Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}
