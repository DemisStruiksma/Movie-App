"use client"

import Link from "next/link";
import Image from 'next/image'
import { Movie, Movies } from "@/app/types/sharedTypes";
import SearchBar from "../molecules/SearchBar";
import Button from "../atoms/Button";
import { useSession, getSession } from "next-auth/react"

interface Props {
    data: Movies
}

export default function MovieOverview({data}: Props) {
    const { data: session, status } = useSession();

    const handleAddToFavorites = (movie: Movie) => {
        const storedMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
        const existingMovieIndex = storedMovies.findIndex((storedMovie: Movie) => storedMovie.id === movie.id);;

        if (existingMovieIndex === -1) {
            storedMovies.push(movie);
        } else {
            storedMovies.splice(existingMovieIndex, 1);
        }

        localStorage.setItem('favoriteMovies', JSON.stringify(storedMovies));
        console.log(storedMovies)
    }

    return(
        <div>
            <SearchBar />
            
             <ul>
                {data.results.map((movie: Movie) => (
                    <li key={movie.id}>
                        <Link href={`/movie/${movie.id}`}>
                            <Image 
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                width={200}
                                height={200}
                                alt={movie.title}
                            />
                            <h2>{movie.title}</h2>

                            <span>Released on {movie.release_date} - {movie.vote_average}</span>
                        </Link>

                        {status === "authenticated" && <Button text="Favorite" type="button" onClick={() => handleAddToFavorites(movie)} />}
                    </li>
                ))}
            </ul>
        </div>
    );
}
