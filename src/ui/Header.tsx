import backGroundPizza from "../assets/Rectangle.jpg";
import Button from "./Button";
import { motion } from "motion/react";

export default function Header() {
  const text = `Ensure Your  Food is Delivered with Speed`;

  const hVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  const spanVariants = {
    hidden: {
      opacity: 0,
    },
    visible: { opacity: 1 },
  };
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${backGroundPizza})` }}
        className="relative bg-no-repeat bg-cover  h-[70vh]  bg-center"
      >
        <div className="absolute  inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white text-center flex  items-center h-full  m-0 sm:ms-10 justify-center sm:justify-start ">
          <div className="contain  m-0 sm:ms-10 ">
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={hVariants}
              className="md:text-5xl text-4xl md:max-w-lg max-w-sm mb-4 font-bold "
            >
              {text.split("").map((word, index) => (
                <motion.span variants={spanVariants} key={index} >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
            <Button type={"primary"} to="menu"> Order Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
