import React, { useEffect, useState } from "react";
import { getCheckedInMembers } from "../utils/firebase";
import Page from "./Page";

function Dashboard() {
  const [categoryCounts, setCategoryCounts] = useState({
    Youth: 0,
    "Season Ticket": 0,
    Member: 0,
  });

  useEffect(() => {
    const fetchCheckedInMembers = async () => {
      try {
        const counts = await getCheckedInMembers();
        setCategoryCounts(counts);
      } catch (error) {
        console.error("Error fetching checked-in members:", error);
      }
    };

    fetchCheckedInMembers();
  }, []);

  return (
    <Page>
      <h2>Dashboard</h2>
      <p>Welcome to the dashboard!</p>
      <h3>Today's Check-Ins</h3>
      <p>Youth: {categoryCounts.Youth}</p>
      <p>Season Ticket: {categoryCounts["Season Ticket"]}</p>
      <p>Member: {categoryCounts.Member}</p>
      <p>Total: {categoryCounts.Youth + categoryCounts["Season Ticket"] + categoryCounts.Member}</p>
    </Page>
  );
}

export default Dashboard;
