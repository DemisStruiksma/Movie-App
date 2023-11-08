"use client"

import MovieOverview from "@/components/organisms/MovieOverview";
import { useSession, getSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function FavoritesPage() {
    const { data: session, status } = useSession();
    // const [favoriteMovies, setFavoriteMovies] = useState([]);
    const storedMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');

    // useEffect(() => {
    //         setFavoriteMovies(storedMovies);
    //   }, [storedMovies]);
      
    if (status === "loading") {
        return <div>Loading...</div>
    }

    if (status === "unauthenticated") {
        return <div>Access Denied</div>
    }

    return (
        <MovieOverview data={{results: storedMovies}} searchBar={false} />
    )
}