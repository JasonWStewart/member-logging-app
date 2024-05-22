import React from "react";
import styles from "./Page.module.css";

const Page = ({ children }) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Page;
