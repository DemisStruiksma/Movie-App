import { NextResponse, NextRequest } from 'next/server'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const apiKey = process.env.TMDB_API_KEY;
    const res = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}`);
    const movie = await res.json();
   
    return NextResponse.json(movie);
  }