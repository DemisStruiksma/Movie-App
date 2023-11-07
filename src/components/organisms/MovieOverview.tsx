"use client"

import Link from "next/link";
import Image from 'next/image'
import { Movie, Movies } from "@/app/types/sharedTypes";
import SearchBar from "../molecules/SearchBar";

interface Props {
    data: Movies
}

export default function MovieOverview({data}: Props) {
    return(
        <div>
            <h1>Popular movies</h1>

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
                    </li>
                ))}
            </ul>
        </div>
    );
}
