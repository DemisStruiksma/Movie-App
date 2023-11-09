"use client"

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Movies } from '../types/sharedTypes';
import MovieOverview from '@/components/organisms/MovieOverview';
import SearchBar from '@/components/molecules/SearchBar';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q')
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const { data, isLoading } = useQuery<Movies>({
      queryKey: ["searchResults", searchTerm],
      queryFn: () => fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}?&api_key=${apiKey}`).then((res) => res.json()),
  });

  console.log(data)

  if (isLoading) return <div>Loading...</div>;    

  return (
    <div>        
        {data && data.results?.length > 0 ?
          <MovieOverview data={data} searchBar={true} />
        : <><SearchBar /><p>No movies found for {searchTerm}, try another search term.</p></>}
    </div>
  );
}