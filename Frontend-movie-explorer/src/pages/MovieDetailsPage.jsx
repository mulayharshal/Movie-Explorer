import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movieDetails } from "../services/movieServices";
import "../styles/details.css";

function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await movieDetails(id);

      if (data.status === "EXCEPTION") {
        setError(data.data);
        return;
      }

      setMovie(data.data);
    };

    fetchMovie();
  }, [id]);

  if (error) {
    return <div className="details-container"><p className="error-text">{error}</p></div>;
  }

  if (!movie) {
    return <div className="details-container"><p>Loading...</p></div>;
  }

  return (
    <div className="details-container">

      <button className="back-btn" onClick={() => navigate("/")}>⬅ Back</button>

      <div className="details-main">

        <img
          className="details-poster"
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
          alt={movie.Title}
        />

        <div className="info-section">

          
          <h1 className="movie-title-large">
            {movie.Title} <span>({movie.Year})</span>
          </h1>

          <div className="tag-row">
            <span className="tag">{movie.Type}</span>
            <span className="tag">{movie.Rated}</span>
            <span className="tag">{movie.Runtime}</span>
            <span className="tag">{movie.Genre}</span>
          </div>

          <p className="movie-plot">{movie.Plot}</p>

          <div className="info-grid">
            <p><strong>Released:</strong> {movie.Released}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Writer:</strong> {movie.Writer}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Language:</strong> {movie.Language}</p>
            <p><strong>Country:</strong> {movie.Country}</p>
            <p><strong>Awards:</strong> {movie.Awards}</p>
            <p><strong>Box Office:</strong> {movie.BoxOffice}</p>
          </div>

          <h3 className="section-title">Ratings</h3>
          <div className="rating-box">
            <p><strong>IMDB:</strong> {movie.imdbRating} ({movie.imdbVotes} votes)</p>

            <ul className="ratings-list">
              {movie.Ratings && movie.Ratings.map((r, i) => (
                <li key={i} className="rating-item">
                  {r.Source}: {r.Value}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}

export default MovieDetailsPage;
