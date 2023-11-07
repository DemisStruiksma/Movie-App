"use client"

import MovieOverview from "@/components/organisms/MovieOverview";

export default function FavoritesPage() {
    const storedMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
    const data = { results: storedMovies };

    return (
        <MovieOverview data={data} />
    )
}