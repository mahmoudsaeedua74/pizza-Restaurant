import { motion } from "framer-motion";
import elementor from "../assets/elementor (1).png";
import elementorTow from "../assets/elementor (2).png";
import Button from "./Button";

// Animation variants
const fadeInVariants = {
  hidden: (direction: number | string) => ({
    opacity: 0,
    x: direction === "left" ? -60 : 60,
  }),
  visible: { opacity: 1, x: 0 },
};

export default function Elementor() {
  return (
    <section className="bg-[#efeee8] border-y border-[#f54748]">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <motion.img
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.4, once: true }}
          transition={{ duration: 1 }}
          variants={fadeInVariants}
          custom="left"
          src={elementor}
          alt="The elementor for pizza"
          className="w-full md:w-[50%] h-1/6 object-cover mx-auto mt-4 sm:mt-0 md:order-1 order-5"
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.4, once: true }}
          transition={{ duration: 1 }}
          variants={fadeInVariants}
          custom="right"
          className="flex flex-col justify-center items-center p-6 md:p-10 w-full sm:w-[80%] mx-auto md:order-2 order-2"
        >
          <h2 className="text-4xl sm:text-5xl text-[#f54748] max-w-xs text-center">
            Two Pizzas For The Price Of One
          </h2>
          <p className="max-w-md text-center lg:text-xl md:text-base my-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex flex-col sm:flex-row justify-between sm:w-[70%] md:[w-60%] lg:w-[50%] xl:w-[40%] mx-auto font-bold">
            <ul className="list-disc pl-6 text-red-500">
              <li>Cappriciosa</li>
              <li>Vesuvio</li>
              <li>Quatri</li>
            </ul>
            <ul className="list-disc pl-6 text-red-500">
              <li>Vesuvio</li>
              <li>Quatri</li>
              <li>Stagione</li>
            </ul>
          </div>
        </motion.div>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.4, once: true }}
          transition={{ duration: 1 }}
          variants={fadeInVariants}
          custom="left"
          className="flex flex-col justify-center items-center p-6 sm:p-10 w-full sm:w-[80%] mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl text-[#f54748] max-w-xs text-center">
            Two Pizzas For The Price Of One
          </h2>
          <p className="max-w-md text-center lg:text-xl md:text-base my-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Button type={"primary"} to={"menu"}>
            Order Now
          </Button>
        </motion.div>
        <motion.img
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.4, once: true }}
          transition={{ duration: 1 }}
          variants={fadeInVariants}
          custom="right"
          src={elementorTow}
          alt="The elementor for pizza"
          className="w-full md:w-[50%] h-1/6 object-cover mx-auto mt-4 sm:mt-0"
        />
      </div>
    </section>
  );
}
