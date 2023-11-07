"use client"

import MovieOverview from "@/components/organisms/MovieOverview";
import { useSession, getSession } from "next-auth/react"

export default function FavoritesPage() {
    const { data: session, status } = useSession();
    const storedMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
    const data = { results: storedMovies };

    if (status === "loading") {
        return <div>Loading...</div>
    }

    if (status === "unauthenticated") {
        return <div>Access Denied</div>
    }

    return (
        <MovieOverview data={data} />
    )
}