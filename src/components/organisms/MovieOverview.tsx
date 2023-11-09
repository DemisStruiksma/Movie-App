"use client"

import { Movie, Movies } from "@/app/types/sharedTypes";
import SearchBar from "../molecules/SearchBar";
import { useSession } from "next-auth/react"
import MovieCard from "../molecules/MovieCard";

interface Props {
    data: Movies
    searchBar: boolean;
    onRemoveFromFavorites?: (movieId: number) => void;
}

export default function MovieOverview({data, searchBar, onRemoveFromFavorites}: Props) {
    const { data: session, status } = useSession();

    const handleAddToFavorites = (movie: Movie) => {
        const storedMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
        const existingMovieIndex = storedMovies.findIndex((storedMovie: Movie) => storedMovie.id === movie.id);;

        if (existingMovieIndex === -1) {
            storedMovies.push(movie);
        } else {
            if(onRemoveFromFavorites) {
                onRemoveFromFavorites(movie.id);
            }

            storedMovies.splice(existingMovieIndex, 1);
        }

        localStorage.setItem('favoriteMovies', JSON.stringify(storedMovies));
    }

    return(
        <div>
            {searchBar && <SearchBar />}
            
             <ul className="grid grid-cols-4 gap-4">
                {data.results.map((movie: Movie) => (
                    <MovieCard 
                        key={movie.id} 
                        movie={movie}
                        addToFavorites={() => handleAddToFavorites(movie)} 
                        status={status} 
                    />
                ))}
            </ul>
        </div>
    );
}
