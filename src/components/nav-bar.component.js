import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "bootstrap/dist/css/bootstrap.min.css";

import AuthDetatils from "./AuthDetatils.component";

import { useState } from "react";
import Modal from "./Modal/index";
import AddProject from "./addProject.component";
import { AnimatePresence } from "framer-motion";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function NavBar() {
  let accountant = ["djb3501@gmail.com", "k39bapt@gmail.com"]
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
  function goToProjectList() {
    navigate("/project-list")
  }
  const userSignOut = () => {
    signOut(auth)
      .then(() => console.log("sign out successful"))
      .catch((error) => console.log(error));
      goToLandingpage()
  };

  return (
    <motion.div
      className="d-flex align-items-end"
      onHoverStart={() => {
        setAnimated(!animated);
      }}
      onHoverEnd={() => {
        setAnimated(!animated);
      }}
      animate={{ backgroundColor: animated ? "#000000e1" : "#002B5B" }}
    >
      <div className="p-2 text-white"><h1 className="display-5">CapExp</h1></div>
      <motion.div
        className="p-2"
        style={{}}
        onClick={goToDashboard}
        whileHover={{
          scale: 1.2,
          backgroundColor: "#1A5F7A",
          color: "#ffffff",
        }}
        whileTap={{ scale: 0.9 }}
        animate={{ color: animated ? "#00a8e8" : "#ffffff" }}
      >
        <p className="lead">Dashboard</p>
        
      </motion.div>
      <motion.div
        className="p-2"
        onClick={goToProjectList}
        whileHover={{
          scale: 1.2,
          backgroundColor: "#1A5F7A",
          color: "#ffffff",
        }}
        whileTap={{ scale: 0.9 }}
        animate={{ color: animated ? "#00a8e8" : "#ffffff" }}
      >
        <p className="lead">Project List</p>
      </motion.div>
      { accountant.includes(auth.currentUser.email) && (
      <motion.div
        className="p-2"
        whileHover={{
          scale: 1.2,
          backgroundColor: "#1A5F7A",
          color: "#ffffff",
        }}
        whileTap={{ scale: 0.9 }}
        animate={{ color: animated ? "#00a8e8" : "#ffffff" }}
        onClick={() => (modalOpen ? close() : open())}
      >
        <p className="lead">New Project</p>
      </motion.div>
)}
      <motion.div
        className="p-2"
        onClick={goToOcrapi}
        whileHover={{
          scale: 1.2,
          backgroundColor: "#1A5F7A",
          color: "#ffffff",
        }}
        whileTap={{ scale: 0.9 }}
        animate={{ color: animated ? "#00a8e8" : "#ffffff" }}
      >
      <p className="lead">Upload Document</p>

      </motion.div>

      <motion.div className="p-2 text-white">
        <AuthDetatils></AuthDetatils>
      </motion.div>
      <motion.div
        className="mr-auto p-2"
        onClick={userSignOut}
        whileHover={{
          scale: 1.2,
          backgroundColor: "#792323a0",
          color: "#ffffff",
        }}
        whileTap={{ scale: 0.9 }}
        animate={{ color: animated ? "red" : "#ffffff" }}
      >
      <p className="lead">SIGN OUT</p>
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
