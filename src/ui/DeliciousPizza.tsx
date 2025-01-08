import pizza from "../assets/qodef (1).png";
import pizzaTow from "../assets/qodef (2).png";
import pizzaThree from "../assets/qodef (3).png";
import pizzaFour from "../assets/qodef (4).png";
import { motion } from "motion/react";

export default function DeliciousPizza() {
  const image = [pizza, pizzaTow, pizzaThree, pizzaFour];
  const imageVariants = {
    hidden: {
      opacity: 0,
      x: 150,
    },
    visibale: {
      opacity: 1,
      x: 0,
      transition: {
        type: "",
        bounce: 0.4,
        duration: 0.5,
        staggerChildren: .2,
      },
    },
  };
  return (
    <section className="my-10">
      <motion.div
        variants={imageVariants}
        initial="hidden"
        whileInView="visibale"
        viewport={{amount:.5}}
        className="flex justify-center gap-5 "
      >
        {image.map((image, index) => (
          <motion.div variants={imageVariants} key={index}>
            {" "}
            <img src={image} className="" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
