import testy from "../assets/testyOne.png";
import Frame206 from "../assets/Frame 206.png";
import Frame204 from "../assets/Frame 204.png";
import Frame203 from "../assets/Frame 203.png";
import Frame202 from "../assets/Frame 202.png";
import MiniMenu from "../features/menu/MiniMenu";
import { motion } from "motion/react";

export default function PizzaOverlAll() {
  const items = [Frame202, Frame204, Frame203, Frame206];
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: 1,
        delay: 0.5,
      }}
      viewport={{ amount: 0.2 }}
      className="bg-[#EFEEE8] py-20 "
    >
      <div className=" grid md:grid-cols-2 grid-cols-1 container mx-auto  isolate">
        {/* القسم الأول */}
        <div className="p-4 flex justify-center items-center relative">
          <motion.img
            initial={{ y: 0 }}
            animate={{ y: 10 }}
            transition={{
              duration: 0.5,
              // delay: 0.5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            whileDrag={{ scale: 1.1 }}
            drag
            dragElastic={0.2}
            dragConstraints={{ left: 0, right: 100, top: 0, bottom: 100 }}
            src={testy}
            alt="Pizza Image"
            className="w-full"
          />
        </div>
        {/* القسم الثاني */}
        <div className="px-6 text-center">
          <h2 className="md:text-5xl  text-3xl w-full mx-auto  text-[#F54748] uppercase md:max-w-lg max-w-full mb-8 font-bold">
            Feed The bEAST wITH A PIZZALICOUS
          </h2>
          <motion.div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -50 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.3 * index
                  },
                }}
                viewport={{ amount: 0.5 }}
                className="flex justify-center"
              >
                <img
                  src={item}
                  alt={`Pizza Info ${index + 1}`}
                  className="w-3/4"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <MiniMenu />
    </motion.section>
  );
}
