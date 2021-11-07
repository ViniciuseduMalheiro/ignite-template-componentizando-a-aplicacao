import { useMovies } from "../MovieContext"
import { MovieCard } from "./MovieCard"

export function Content() {

  const { genres, movies, selectedGenre}  = useMovies();


  return (
      <div className="container">
        <header>
          <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
        </header>

        <main>
          <div className="movies-list">
            {movies.map(movies => (
              <MovieCard key ={movies.Title} title={movies.Title} poster={movies.Poster} runtime={movies.Runtime} rating={movies.Ratings[0].Value} />
            ))}
          </div>
        </main>
      </div>
  )
}