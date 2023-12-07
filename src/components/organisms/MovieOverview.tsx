"use client"

import { Movie, Movies } from "@/app/types/sharedTypes";
import SearchBar from "../molecules/SearchBar";
import { useSession } from "next-auth/react"
import MovieCard from "../molecules/MovieCard";
import { useState } from "react";
import Button from "../atoms/Button";

interface Props {
    data: Movies
    searchBar: boolean;
    onRemoveFromFavorites?: (movieId: number) => void;
}

export default function MovieOverview({data, searchBar, onRemoveFromFavorites}: Props) {
    const { data: session, status } = useSession();
    const [currentPage, setCurrentPage] = useState(1);

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

    const handleNextPage = () => {
        if (currentPage < data.total_pages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

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

            <Button 
                type="button" 
                text="Previous page" 
                customClassNames={`bg-blue-500 px-4 py-2 rounded ${currentPage === 1 && 'disabled:opacity-50'}`} 
                onClick={handlePrevPage}
            />

            <span>Page {currentPage} of {data.total_pages}</span>

            <Button 
                type="button" 
                text="Next page"  
                customClassNames={`bg-blue-500 px-4 py-2 rounded ${currentPage === data.total_pages && 'disabled:opacity-50'}`}
                onClick={handleNextPage}
            />
        </div>
    );
}
