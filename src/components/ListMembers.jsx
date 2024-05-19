import React, { useEffect, useState } from "react";
import { getAllMembers } from "../utils/firebase";
import styles from "./ListMembers.module.css"; // Import CSS module for styling

function ListMembers() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersList = await getAllMembers();
        setMembers(membersList);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className={styles.container}>
      <h2>All Members</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Card Type</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id + member.cardType}>
              <td>{member.id}</td>
              <td>{member.fullName}</td>
              <td>{member.cardType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListMembers;
