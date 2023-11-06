"use client"

import { useQuery } from '@tanstack/react-query';
import { Movies } from './types/sharedTypes';
import MovieOverview from '@/components/organisms/MovieOverview';

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const { data, isLoading } = useQuery<Movies>({
    queryKey: ["movies"],
    queryFn: () => fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`).then((res) => res.json()),
  });

  if (isLoading || !data) return <div>Loading...</div>;

  return <MovieOverview data={data} />
}
