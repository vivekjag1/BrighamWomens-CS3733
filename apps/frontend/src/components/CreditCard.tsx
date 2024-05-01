import React from "react";
import { motion } from "framer-motion";

interface CreditCardProps {
  imageSrc: string;
  name: string;
  urls: string;
  urlName: string;
}

function CreditCard({ imageSrc, name, urls }: CreditCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <div className="flex flex-col items-center">
        {/*<div className="rounded-full overflow-hidden border-4 border-400  w-40 h-40 flex items-center justify-center">*/}
        <a
          href={urls}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-center"
        >
          <img
            className="w-25 h-40 object-cover rounded-full"
            src={imageSrc}
            alt={name}
          />
          {name}
        </a>
        {/*<label className="font-semibold">{name}</label>*/}
        {/*<a href={urls} target="_blank" className="font-semibold"rel="noopener noreferrer">*/}
        {/*  {urlName}*/}
        {/*</a>*/}
      </div>
    </motion.div>
  );
}

export default CreditCard;
