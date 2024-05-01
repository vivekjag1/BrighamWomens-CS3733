import { motion } from "framer-motion";
import React from "react";

interface EmployeeCardProps {
  imageSrc: string;
  name: string;
  role: string;
  quote: string;
}

function EmployeeCard({ imageSrc, name, role, quote }: EmployeeCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, cursor: "default" }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <div className="flex flex-col items-center relative group">
        <div className="rounded-full overflow-hidden border-4 border-secondary w-40 h-40 relative">
          <img
            className="w-full h-full object-cover rounded-full"
            src={imageSrc}
            alt={name}
          />
          <div className="absolute inset-0 bg-secondary bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3">
            <span className="text-white text-center text-[.8rem] leading-[1.1]">
              {quote}
            </span>
          </div>
        </div>
        <label className="font-semibold mt-3">{name}</label>
        <label>{role}</label>
      </div>
    </motion.div>
  );
}

export default EmployeeCard;
