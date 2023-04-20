import "../index.css";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { render } from "react-dom";
import Modal from "./Modal/index";

export default function Landingpage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [move, setMove] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  function goToLogin() {
    setLogin(true);
  }
  

  return (
    <div className="landingpage-container">
      {login && <Navigate to="/login" replace={true} />}
      <form onSubmit={goToLogin}>
        <div className="lp-button-container">
          <motion.div
            className="lp-animated-1-container"
            onHoverStart={() => {
               setRotate(!rotate);
               setMove(!move);
            }}
            drag
            animate={{ rotate: rotate ? 360 : 0, x: move ? 1000 : 0, y: move ? 1000 : 0}}
            initial={{}}
            transition={{type: "tween", duration: 8}}
          ></motion.div>
          <motion.div className="lp-animated-2-container"
          animate={{ rotate: [0, 360]}}
          transition = {{duration: 30, repeat: Infinity}}
          ></motion.div>
          <motion.div className="lp-animated-3-container"
          animate={{rotate: [45], x:[0, 400, 400, 0], y:[0, 400, 400, 0]}}
          transition={{duration:10, repeat: Infinity}}
          ></motion.div>
          <div className="lp-animated-4-container"></div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn btn-primary"
            to="/login"
          >
            Launch Capexp Tracker
          </motion.button>
        </div>

      </form>
    </div>
  );
}
