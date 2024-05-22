import React, { useEffect, useState } from "react";
import { getCheckedInMembers } from "../../utils/firebase";
import Page from "../fragments/Page";
import styles from "./Dashboard.module.css";

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
      <div className={styles.checkedInContainer}>
        <h2>Today's Check-Ins</h2>
        <div className={styles.boxesContainer}>
          <div className={styles.box}>
            <div className={styles.categoryTitle}>Youth</div>
            <div className={styles.amount}>{categoryCounts.Youth}</div>
          </div>
          <div className={styles.box}>
            <div className={styles.categoryTitle}>Season Ticket</div>
            <div className={styles.amount}>{categoryCounts["Season Ticket"]}</div>
          </div>
          <div className={styles.box}>
            <div className={styles.categoryTitle}>Member</div>
            <div className={styles.amount}>{categoryCounts.Member}</div>
          </div>
          <div className={styles.box}>
            <div className={styles.categoryTitle}>Total</div>
            <div className={styles.amount}>{categoryCounts.Youth + categoryCounts["Season Ticket"] + categoryCounts.Member}</div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default Dashboard;
