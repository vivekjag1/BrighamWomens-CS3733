import { motion } from "framer-motion";

interface breadcrumbProps {
  children: JSX.Element[];
}
function Breadcrumb(props: breadcrumbProps) {
  return (
    <motion.div
      className="flex justify-center items-center h-[2.5vw] border border-gray-200 rounded-lg bg-gray-50 p-6 drop-shadow-lg"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
    >
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.5 } }}
        exit={{ opacity: 0, transition: { duration: 1 } }}
      >
        {props.children}
      </motion.div>
    </motion.div>
  );
}

export default Breadcrumb;
