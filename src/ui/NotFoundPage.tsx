import NotFound from "../assets/NotFound.png";
import Button from "./Button";
import { motion } from "framer-motion";
export default function NotFoundPage() {
  return (
    <motion.div
      initial={{ opacity: 0.5, x: -5000 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        stiffness: 80,
        type: "spring",
        damping: 20,
      }}
      className=" h-screen flex items-center justify-center flex-col "
    >
      <div className="flex">
        <p className="text-[7rem] font-bold text-[#F54748]">4</p>
        <motion.img
          initial={{ rotate: 90 }}
          animate={{ rotate: 0 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          src={NotFound}
          alt="Not Found"
          className="mx-6 w-full"
        />
        <p className="text-[7rem] font-bold text-[#F54748]">4</p>
      </div>
      <div className="text-center mt-6">
        <h3>Whoops... Page Not Found</h3>
        <p className="mb-2">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable
        </p>
        <Button type={"primary"} to={"/"}>
          GO TO HOMEPAGE{" "}
        </Button>
      </div>
    </motion.div>
  );
}
