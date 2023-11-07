"use client"

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { Movies } from './types/sharedTypes';
import MovieOverview from '@/components/organisms/MovieOverview';

export default function Home() {
  const { data: session, status } = useSession();
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const { data, isLoading } = useQuery<Movies>({
    queryKey: ["movies"],
    queryFn: () => fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`).then((res) => res.json()),
  });

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div>
      {status}
      
      {status === 'authenticated' && session.user?.name}
      <MovieOverview data={data} />
    </div>
  )
}
