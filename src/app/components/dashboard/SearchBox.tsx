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