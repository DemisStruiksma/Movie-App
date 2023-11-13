import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const apiKey = process.env.TMDB_API_KEY;
    const searchTerm = searchParams.get('query');
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}?&api_key=${apiKey}`);
    const movie = await res.json();
   
    return NextResponse.json(movie);
}