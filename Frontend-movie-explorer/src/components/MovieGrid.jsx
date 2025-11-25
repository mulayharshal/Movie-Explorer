import MovieCard from "./MovieCard";
import "../styles/grid.css";

function MovieGrid({ movies, onMovieSelect }) {
  if (!movies || movies.length === 0) {
    return <p className="no-results">No movies found</p>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie, index) => (
        <MovieCard
          key={index}
          movie={movie}
          onClick={() => onMovieSelect(movie)}
        />
      ))}
    </div>
  );
}

export default MovieGrid;
