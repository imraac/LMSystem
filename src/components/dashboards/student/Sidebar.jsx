import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBook,
  faMoneyBill,
  faChartLine,
  faChalkboardTeacher,
  faHome,
} from "@fortawesome/free-solid-svg-icons"; 

const Sidebar = () => (
  <aside className="bg-[#FF6247] text-white w-64 min-h-screen p-4">
    <nav className="space-y-2">
      <Link
        to="/student-dashboard"
        className="flex items-center py-2.5 px-4 rounded transition-colors hover:bg-[#FF3E3E]"
      >
        <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
        Dashboard
      </Link>
      <Link
        to="/home"
        className="flex items-center py-2.5 px-4 rounded transition-colors hover:bg-[#FF3E3E]"
      >
        <FontAwesomeIcon icon={faHome} className="mr-3" />{" "}
        Home
      </Link>
      <Link
        to="/courses"
        className="flex items-center py-2.5 px-4 rounded transition-colors hover:bg-[#FF3E3E]"
      >
        <FontAwesomeIcon icon={faBook} className="mr-3" />
        Courses
      </Link>
      <Link
        to="/finance"
        className="flex items-center py-2.5 px-4 rounded transition-colors hover:bg-[#FF3E3E]"
      >
        <FontAwesomeIcon icon={faMoneyBill} className="mr-3" />
        Finance
      </Link>
      <Link
        to="/results"
        className="flex items-center py-2.5 px-4 rounded transition-colors hover:bg-[#FF3E3E]"
      >
        <FontAwesomeIcon icon={faChartLine} className="mr-3" />
        Results
      </Link>
      <Link
        to="/instructors"
        className="flex items-center py-2.5 px-4 rounded transition-colors hover:bg-[#FF3E3E]"
      >
        <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-3" />
        Instructors
      </Link>
    </nav>
  </aside>
);

export default Sidebar;
