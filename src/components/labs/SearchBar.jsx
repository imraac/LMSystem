function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search categories..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 pl-12 rounded-xl bg-gray-100 shadow-md focus:outline-none"
      />
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
}

export default SearchBar;