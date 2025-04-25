import { useState } from 'react';
import Image from "next/image";

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search ..."
        className="pl-10 pr-4 py-2 border-none rounded-lg w-full focus:outline-none focus:border-gold1 text-gray-700 bg-gray-100"
        aria-label="Search"
      />
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <Image src="/search.svg" width={15} height={15} alt="Search icon" />
      </span>
    </div>
  );
}



import { Search } from 'lucide-react';

export function SearchComponent({searchValue}) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    searchValue(searchQuery);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-sm bg-white border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-dashboardButtons focus:border-transparent"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 my-3 text-sm font-medium text-white bg-dashboardButtons rounded-r-lg hover:bg-dashboardButtons focus:outline-none focus:ring-2 focus:ring-dashboardButtons focus:ring-offset-2"
        >
          Search
        </button>
      </form>
    </div>
  );
}