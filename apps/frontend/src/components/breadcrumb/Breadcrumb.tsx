import { motion } from "framer-motion";

interface breadcrumbProps {
  children: JSX.Element[];
}
function Breadcrumb(props: breadcrumbProps) {
  return (
    <motion.div
      className="min-h-[2.5vw] max-h-[5vw] flex items-center border border-gray-200 rounded-lg bg-gray-50  drop-shadow-lg"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
    >
      <motion.div
        className="flex justify-center max-w-[30vw] flex-wrap gap-2 p-3"
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
