import { motion } from "framer-motion";
import ExitButton from "./ExitButton.tsx";

interface BannerProps {
  onClick: () => void;
  children: JSX.Element;
}

function Banner(props: BannerProps) {
  return (
    <motion.div
      className="w-[80vw] h-[5.5vh] flex justify-center items-center gap-8 border-2 border-gray-200 rounded-md shadow-md bg-gray-100"
      initial={{ y: "-10vh" }}
      animate={{ y: 0, transition: { delay: 1.5, duration: 1 } }}
      exit={{ y: "-10vh", transition: { duration: 1 } }}
    >
      {props.children}
      <ExitButton onClick={props.onClick} />
    </motion.div>
  );
}

export default Banner;
