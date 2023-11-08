import Image from 'next/image'
import { Movie } from '@/app/types/sharedTypes';

export default async function Page({params}: {
    params: {
        id: string;
    }
}) {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const res = await fetch(` https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}`)
    const movie: Movie = await res.json();

    return (
        <div className="flex flex-row items-start justify-center py-8">
            <div className="w-1/2">
                <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                width={500}
                height={500}
                alt={movie.title}
                className="rounded-lg"
                />
            </div>

            <div className="w-1/2 p-4">
                <h1 className="text-2xl font-semibold mb-2">{movie.title}</h1>
                <div className="flex items-center mb-4">
                    <span className="text-gray-500 mr-2">{movie.release_date}</span>
                    
                    <span className="bg-yellow-600 rounded-full text-white px-2 py-1 text-sm font-semibold">
                        {movie.vote_average}
                    </span>
                </div>
                <p className="text-gray-600 text-lg text-justify">{movie.overview}</p>
            </div>
        </div>
    )
}