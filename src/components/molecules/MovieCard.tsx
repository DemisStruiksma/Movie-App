import Link from "next/link";
import Image from "next/image";
import Button from "../atoms/Button";
import { Movie } from "@/app/types/sharedTypes";
import { FaHeart } from 'react-icons/fa';
import { useEffect, useState } from "react";

interface Props {
    movie: Movie;
    status: string;
    addToFavorites: (movie: Movie) => void;
}

export default function MovieCard({movie, status, addToFavorites}: Props) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
        const isMovieInFavorites = storedMovies.some((storedMovie: Movie) => storedMovie.id === movie.id);
        setIsFavorite(isMovieInFavorites);
      }, [movie.id]); 


    const handleAddToFavorites = () => {
        addToFavorites(movie);
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    };

    return(
        <li key={movie.id} className="bg-white shadow-md rounded-md p-4 max-w-xs flex flex-col transition-transform hover:scale-105">
            <Link href={`/movie/${movie.id}`} className="block">
                <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    width={400}
                    height={400}
                    alt={movie.title}
                    className="rounded-lg"
                />
                
                <h2 className="mt-2 text-xl font-semibold">{movie.title}</h2>
                
                <p className="text-gray-600 text-sm">
                    Released on {movie.release_date} - Rating: {movie.vote_average}
                </p>
            </Link>
            
            {status === "authenticated" && (
                <div className="mt-auto">
                    <Button
                    type="button"
                    onClick={handleAddToFavorites}
                    >
                    <FaHeart className={isFavorite ? 'text-yellow-400' : ''} />
                    </Button>
                </div>  
            )}
        </li>
    )
}