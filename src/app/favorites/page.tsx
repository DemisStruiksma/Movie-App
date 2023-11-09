"use client"

import MovieOverview from "@/components/organisms/MovieOverview";
import { useSession } from "next-auth/react"
import Link from "next/link";
import { useState } from "react";
import { Movie } from "../types/sharedTypes";

export default function FavoritesPage() {
    const { data: session, status } = useSession();
    const [favoriteMovies, setFavoriteMovies] = useState(() => {
        const storedMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
        return storedMovies;
    });

    const handleRemoveFromFavorites = (movieId: number) => {
        const updatedMovies = favoriteMovies.filter((movie: Movie) => movie.id !== movieId);
        setFavoriteMovies(updatedMovies);
    };
  
    if (status === "loading") {
        return <div>Loading...</div>
    }

    if (status === "unauthenticated") {
        return <div>Access Denied, please <Link href="api/auth/signin" className="text-blue-500 hover:text-blue-600">login</Link> to access this page.</div>
    }

    return (
        <div>
            {session?.user && 
                <h2 className="mb-6">
                    Hi, {session.user?.name}! {favoriteMovies.length > 0 ? `Here is a list of your favorite movie(s):` : `You haven't added any movie to your favorites yet.`}
                </h2>}
            <MovieOverview data={{ results: favoriteMovies }} searchBar={false} onRemoveFromFavorites={handleRemoveFromFavorites} />
        </div>
    )
}