"use client"

import { useRouter } from 'next/navigation';
import { FormEvent } from "react";

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get('search') as string;
    router.push(`/search?q=${searchTerm}`);
  };

  return (
    <form onSubmit={handleSearch}>
        <input
            className="text-black"
            type="text" 
            name="search" 
            placeholder="Search..."
        />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;