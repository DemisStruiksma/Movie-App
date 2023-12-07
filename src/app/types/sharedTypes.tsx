export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
}

export interface Movies {
    results: Movie[];
    total_pages: number;
    page: number;
}