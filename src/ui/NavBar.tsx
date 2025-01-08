import { useState } from "react";
import { IoMenu, IoPizza } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import Logo from "../assets/Logo.png";
import { motion } from "framer-motion";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const ulVariants = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.3,
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };
  return (
    <nav className=" fixed top-0 start-0 end-0 z-50  text-white/90 font-bold cursor-pointer bg-black/60 ">
      <div className="container mx-auto flex justify-center gap-3 sm:justify-between items-center py-2 ">
        {/* Logo */}

        {/* Navigation Links */}
        <ul
          className={`sm:flex hidden space-x-4 items-center transition-transform duration-300  lg:text-[20px] md:text-base`}
        >
          <NavLink to="">Home</NavLink>
          <NavLink to="AboutUs">About Us</NavLink>
          <NavLink to="Menu">Menu</NavLink>
          <NavLink to="Contact">Contact</NavLink>
        </ul>
        <h1 className="xl:text-4xl uppercase text-center flex items-center md:text-3xl gap-3 sm:text-xl lg:gap-2">
          <img src={Logo} className="w-[70px]" />
          <Link to={"/"}>La Pizza Alforno</Link>
        </h1>

        {/* Cart Section */}
        <NavLink to={"cart"} className="hidden sm:flex items-center space-x-2">
          <IoPizza className="text-2xl" />
          <span className="lg:text-[20px] md:text-base">Cart</span>
        </NavLink>

        {/* Menu Button for Small Screens */}
        <button
          className="sm:hidden text-4xl focus:outline-none"
          onClick={toggleMenu}
        >
          <IoMenu />
        </button>
      </div>
      {/* Dropdown Menu for Small Screens */}
      {isMenuOpen && (
        <div className="sm:hidden bg-black/40 py-4">
          <motion.ul
            initial="hidden"
            animate="visible"
            className="space-y-2 text-center"
            variants={ulVariants}
          >
            <motion.li
              onClick={toggleMenu}
              variants={ulVariants}
              className="hover:bg-red-500 p-2 cursor-pointer"
            >
              <Link to={"/"} className="w-full"> Home</Link>
            </motion.li>
            <motion.li
              onClick={toggleMenu}
              variants={ulVariants}
              className="hover:bg-red-500 p-2 cursor-pointer"
            >
              <Link to={"/"}> About Us</Link>
            </motion.li>
            <motion.li
              onClick={toggleMenu}
              variants={ulVariants}
              className="hover:bg-red-500 p-2 cursor-pointer"
            ><Link to={"/menu"} className="w-full"> Menu</Link>
              
            </motion.li>
            <motion.li
              onClick={toggleMenu}
              variants={ulVariants}
              className="hover:bg-red-500 p-2 cursor-pointer"
            >
              Contact
            </motion.li>
            <Link to={"Cart"}>
              <motion.span
                onClick={toggleMenu}
                variants={ulVariants}
                className="flex justify-center items-center space-x-2 mt-4 p-2 hover:bg-red-500"
              >
                <IoPizza className="text-2xl" />
                Cart
              </motion.span>
            </Link>
          </motion.ul>
        </div>
      )}
    </nav>
  );
}
