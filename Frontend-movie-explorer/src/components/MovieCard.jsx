import "../styles/card.css";

function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
      <div className="poster-wrapper">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
          className="poster-img"
          alt={movie.Title}
        />
      </div>

      <h3 className="movie-title">{movie.Title}</h3>

      <div className="movie-info-row">
        <p className="movie-year">{movie.Year}</p>
        <span className="movie-type">{movie.Type}</span>
      </div>
    </div>
  );
}

export default MovieCard;
