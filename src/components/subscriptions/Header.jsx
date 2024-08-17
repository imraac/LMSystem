import React from "react";

const Header = () => {
  return (
    <div className="text-center mb-6 mt-12">
      <h1 className="text-5xl font-bold text-gray-700 mb-4">
        Pick the price{" "}
        <span className="text-red-500">that's right for you</span>
      </h1>
      <p className="text-gray-700">
        Join millions of other customers on this platform
      </p>
    </div>
  );
};

export default Header;
