"use client"

import MovieOverview from "@/components/organisms/MovieOverview";
import { useSession, getSession } from "next-auth/react"
import Link from "next/link";
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
        return <div>Access Denied, please <Link href="api/auth/signin" className="text-blue-500 hover:text-blue-600">login</Link> to access this page.</div>
    }

    return (
        <div>
            {session?.user && <h2 className="mb-6">Hi, {session.user?.name}! Here is a list of your favorite movie(s):</h2>}
            <MovieOverview data={{results: storedMovies}} searchBar={false} />
        </div>
    )
}