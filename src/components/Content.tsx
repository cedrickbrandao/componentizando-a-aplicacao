import { useApp } from "../AppContext";
import { Header } from "./Header";
import { MovieCard } from "./MovieCard";

export function Content() {
  const { movies, selectedGenre } = useApp();
  return (
    <div className="container">

      <Header title={selectedGenre.title} />

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={Math.random()} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>

    </div>

  )
}