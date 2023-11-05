import Image from 'next/image'
import { Movie } from '@/app/types/sharedTypes';

export default async function Page({params}: {
    params: {
        id: string;
    }
}) {
    const apiKey = process.env.TMDB_API_KEY;
    const res = await fetch(` https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}`)
    const movie: Movie = await res.json();

    return (
        <main>
            <Image 
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                width={500}
                height={500}
                alt={movie.title}
            />

            <h1>{movie.title} - released on {movie.release_date}</h1>
            <span>{movie.vote_average}</span>
            <p>{movie.overview}</p>
        </main>
    )
}