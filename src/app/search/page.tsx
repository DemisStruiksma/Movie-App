"use client"

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Movies } from '../types/sharedTypes';
import MovieOverview from '@/components/organisms/MovieOverview';

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
        <h1>Search Results for: {searchTerm}</h1>
        
        {data && (
            <MovieOverview data={data} />
        )}
    </div>
  );
}