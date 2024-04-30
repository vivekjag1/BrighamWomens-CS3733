import React from "react";
import { Modal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    transition: {
      duration: 0.15,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          open={isOpen}
          onClose={onClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            style={{ outline: "none" }}
          >
            {children}
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;
