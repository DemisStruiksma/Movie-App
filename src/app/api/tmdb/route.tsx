import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page');
  const apiKey = process.env.TMDB_API_KEY;
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?page=${page ? page : '1'}&api_key=${apiKey}`);
  const movies = await res.json()
  
  return NextResponse.json(movies);
}