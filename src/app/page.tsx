import Image from 'next/image'
import Link from 'next/link';
import { Movie, Movies } from './types/sharedTypes';

export default async function Home() {
  const apiKey = process.env.TMDB_API_KEY;
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
  const data: Movies = await res.json();

  return (
    <main>
      <h1>Popular Movies</h1>
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
    </main>
  )
}
