import React from "react";
import Modal from "react-modal";
import styles from "./ModalComponent.module.css"; // Import CSS module for styling

// Ensure that modals are attached to the root of your app
Modal.setAppElement("#root");

const ModalComponent = ({ isOpen, onRequestClose, contentLabel, children }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel={contentLabel}
    className={styles.modal}
    overlayClassName={styles.overlay}>
    {children}
  </Modal>
);

export default ModalComponent;
