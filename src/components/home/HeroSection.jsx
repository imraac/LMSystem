import React from 'react';
import SearchBar from '../labs/SearchBar';

function HeroSection({ searchTerm, setSearchTerm, handleSearch }) {
  return (
    <div className="bg-gradient-to-r from-[#FF6247] to-[#FF8C7A] py-20 px-4 sm:px-6 lg:px-8 rounded-xl shadow-xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Start your learning</span>
            <span className="block text-[#FFF0ED]">journey today</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-[#FFF0ED] sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover courses, expand your skills, and unlock your potential with our cutting-edge learning platform.
          </p>
        </div>

        <div className="mt-10 max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;