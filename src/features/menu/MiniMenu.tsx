import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { formatCurrency } from "../../utils/helper";
import Button from "../../ui/Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "motion/react";

// Define the type for the menu item
interface MenuItem {
  name: string;
  ingredients: string[];
  imageUrl: string;
  unitPrice: number;
  soldOut: boolean;
}
export default function MiniMenu() {
  // Loader data will be typed as an array of MenuItem
  const menu = useLoaderData() as MenuItem[];
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Type the state
  const visibleItems: number = 3; // Number of visible items

  // Navigation between menu items
  const handleNext = () => {
    if (currentIndex + visibleItems < menu.length) {
      setCurrentIndex((prevIndex) => prevIndex + visibleItems);
    }
  };
  const handlePrev = () => {
    if (currentIndex - visibleItems >= 0) {
      setCurrentIndex((prevIndex) => prevIndex - visibleItems);
    }
  };
 
  const cardVariants = {
    offscreen: {
      opacity: 0,
      x: -150,
    },
    onscreen: {
      opacity: 1,
      x: 0,
      transition: {
        type: "",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.3 }}
      className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between"
    >
      {/* Intro Text */}
      <div className="lg:w-1/3 lg:text-left mb-8 lg:mb-0  mx-auto text-center self-center">
        <h2 className="text-2xl font-bold text-[#F54748] mx-auto text-center">
          Pizza with Great Taste
        </h2>
        <p className="text-gray-600 mb-4 mx-auto text-center">
          Lorem ipsum dolor sit amet, mauris id vestibulum.
        </p>
        <div className="flex justify-center items-center  space-x-4  s">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-2 bg-gray-200 rounded-full disabled:opacity-50 text-[#F54748]"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex + visibleItems >= menu.length}
            className="p-2 bg-gray-200 rounded-full disabled:opacity-50 text-[#F54748]"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      {/* Carousel display */}
      <div className="lg:w-2/3 flex justify-center ">
        <div className=" block sm:flex space-x-6 overflow-hidden">
          {menu
            .slice(currentIndex, currentIndex + visibleItems)
            .map((item, index) => (
              <div
                key={index}
                className="w-ful m-0 sm:w-1/3 flex flex-col items-center text-center p-4 rounded-lg"
              >
                <div className="w-32 h-32 mb-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className={`rounded-full w-full h-full object-cover ${
                      item.soldOut ? "opacity-70 grayscale" : ""
                    }`}
                  />
                </div>
                <h3 className="text-lg font-bold text-[#F54748]">
                  {item.name}
                </h3>
                <p className="text-sm italic text-gray-500 my-2">
                  {item.ingredients.join(", ")}
                </p>
                <div className="mt-auto">
                  {!item.soldOut ? (
                    <>
                      <p className="text-sm text-[#F54748]">
                        {formatCurrency(item.unitPrice)}
                      </p>
                      <Button type={"add"}>
                        {" "}
                        Available
                      </Button>
                    </>
                  ) : (
                    <p className="text-sm font-medium uppercase text-gray-400 px-4 py-3 md:px-6 md:py-4">
                      Sold out
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}
