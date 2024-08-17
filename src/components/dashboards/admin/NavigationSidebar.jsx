import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBook, FaHome } from "react-icons/fa"; // Import FaHome

const NavigationSidebar = () => (
  <aside className="bg-[#FF6247] text-white w-full md:w-64 space-y-6 py-7 px-2">
    <nav>
      <Link
        to="/admin-dashboard"
        className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-[#FF3E3E]"
      >
        <FaTachometerAlt className="mr-3" /> Dashboard
      </Link>
      <Link
        to="/home"
        className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-[#FF3E3E]"
      >
        <FaHome className="mr-3" /> Home
      </Link>
      <Link
        to="/courses"
        className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-[#FF3E3E]"
      >
        <FaBook className="mr-3" /> Course Management
      </Link>
    </nav>
  </aside>
);

export default NavigationSidebar;
