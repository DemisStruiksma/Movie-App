"use client"

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Movies } from '../types/sharedTypes';
import MovieOverview from '@/components/organisms/MovieOverview';
import SearchBar from '@/components/molecules/SearchBar';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q')

  const { data, isLoading } = useQuery<Movies>({
      queryKey: ["searchResults", searchTerm],
      queryFn: () => fetch(`http://localhost:3000/api/tmdb/search?query=${searchTerm}`).then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;    

  return (
    <div>        
        {data && data.results?.length > 0 ?
          <MovieOverview data={data} searchBar={true} />
        : <><SearchBar /><p>No movies found for {searchTerm}, try another search term.</p></>}
    </div>
  );
}