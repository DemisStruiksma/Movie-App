"use client"

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { Movies } from './types/sharedTypes';
import MovieOverview from '@/components/organisms/MovieOverview';

export default function Home() {
  const { data, isLoading } = useQuery<Movies>({
    queryKey: ["movies"],
    queryFn: () => fetch(`http://localhost:3000/api/tmdb`).then((res) => res.json()),
  });

  if (isLoading || !data) return <div>Loading...</div>;

  return <MovieOverview data={data} searchBar={true} />;
}
