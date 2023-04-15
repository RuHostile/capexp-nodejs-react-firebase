import "../index.css";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal/index";

export default function Landingpage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [login, setLogin] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  function goToLogin() {
    setLogin(true);
  }

  return (
    <div>
      {login && <Navigate to="/login" replace={true} />}
      <form onSubmit={goToLogin}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="save-button"
          to={"/login"}
          onClick={() => (modalOpen ? close() : open())}
        >
          Launch Capexp Tracker
        </motion.button>

        {/* <AnimatePresence
          initial={false}
          wait={true}
          onExitComplete={() => null}
        >
          {modalOpen && (
            <Modal modalOpen={modalOpen} handleClose={close}></Modal>
          )}
        </AnimatePresence> */}
      </form>
    </div>
  );
}
