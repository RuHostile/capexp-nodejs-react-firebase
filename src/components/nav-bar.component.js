import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "bootstrap/dist/css/bootstrap.min.css";

import AuthDetatils from "./AuthDetatils.component";

import { useState } from "react";
import Modal from "./Modal/index";
import AddProject from "./addProject.component";
import { AnimatePresence } from "framer-motion";

function NavBar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [animated, setAnimated] = useState(false);
  const navigate = useNavigate();
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  function goToLandingpage() {
    navigate("/");
  }
  function goToDashboard() {
    navigate("/dashboard");
  }
  function goToOcrapi() {
    navigate("/ocrapi");
  }

  return (
    <motion.div
      className="d-flex flex-row"
      onHoverStart={() => {
        setAnimated(!animated);
      }}
      onHoverEnd={() => {
        setAnimated(!animated);
      }}
      animate={{ backgroundColor: animated ? "#000000e1" : "#002B5B" }}
    >
      <div className="p-2 text-white">CapExp</div>
      <motion.div
        className="p-2"
        onClick={goToDashboard}
        whileHover={{
          scale: 1.2,
          backgroundColor: "#1A5F7A",
          color: "#ffffff",
        }}
        whileTap={{ scale: 0.9 }}
        animate={{ color: animated ? "#1A5F7A" : "#ffffff" }}
      >
        Dashboard
      </motion.div>
      <motion.div
        className="p-2"
        whileHover={{
          scale: 1.2,
          backgroundColor: "#1A5F7A",
          color: "#ffffff",
        }}
        whileTap={{ scale: 0.9 }}
        animate={{ color: animated ? "#1A5F7A" : "#ffffff" }}
        onClick={() => (modalOpen ? close() : open())}
      >
        New project
      </motion.div>

      <motion.div
        className="p-2"
        onClick={goToOcrapi}
        whileHover={{
          scale: 1.2,
          backgroundColor: "#1A5F7A",
          color: "#ffffff",
        }}
        whileTap={{ scale: 0.9 }}
        animate={{ color: animated ? "#1A5F7A" : "#ffffff" }}
      >
        Upload document
      </motion.div>

      <motion.div className="p-2 text-white">
        <AuthDetatils></AuthDetatils>
      </motion.div>
      <motion.div
        className="p-2"
        onClick={goToLandingpage}
        whileHover={{
          scale: 1.2,
          backgroundColor: "#792323a0",
          color: "#ffffff",
        }}
        whileTap={{ scale: 0.9 }}
        animate={{ color: animated ? "#792323a0" : "#ffffff" }}
      >
        SIGNOUT
      </motion.div>

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {modalOpen && (
          <Modal
            modalOpen={modalOpen}
            handleClose={close}
            text={<AddProject></AddProject>}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default NavBar;
