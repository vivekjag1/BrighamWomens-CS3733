import { motion } from "framer-motion";

interface breadcrumbProps {
  children: JSX.Element[];
}
function Breadcrumb(props: breadcrumbProps) {
  return (
    <motion.div
      className="flex justify-center items-center gap-4 w-[200px] h-[50px] border border-gray-200 rounded-lg bg-gray-50"
      initial={{ scaleX: 0, transformOrigin: "center" }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
    >
      <motion.div
        className="flex justify-center items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {props.children}
      </motion.div>
    </motion.div>
  );
}

export default Breadcrumb;
