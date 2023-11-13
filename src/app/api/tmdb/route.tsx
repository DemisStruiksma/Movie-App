import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.TMDB_API_KEY;
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    const movies = await res.json()
   
    return NextResponse.json(movies);
}