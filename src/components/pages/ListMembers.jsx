import React, { useEffect, useState } from "react";
import { getAllMembers, deleteMember } from "../../utils/firebase";
import styles from "./ListMembers.module.css";
import Page from "../fragments/Page";
import { BsTrashFill } from "react-icons/bs";

function ListMembers() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const membersList = await getAllMembers();
      setMembers(membersList);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleDelete = async (memberId) => {
    try {
      await deleteMember(memberId);
      fetchMembers(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return (
    <Page>
      <h2>All Members</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Type</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.memberNumber}</td>
              <td>{member.fullName}</td>
              <td>{member.cardType}</td>
              <td>
                <button onClick={() => handleDelete(member.id)} className={styles.deleteButton}>
                  <BsTrashFill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
}

export default ListMembers;
