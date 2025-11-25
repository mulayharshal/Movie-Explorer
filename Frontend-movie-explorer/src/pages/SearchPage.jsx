import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchMovies } from "../services/movieServices";
import { useEffect } from "react";
import logo from "../assets/logo.png"

import MovieGrid from "../components/MovieGrid";
import "../styles/search.css";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading]=useState(false);

  const navigate = useNavigate();
  useEffect(() => {
  const q = localStorage.getItem("lastQuery");
  const r = localStorage.getItem("lastResults");

  if (q) setQuery(q);
  if (r) setMovies(JSON.parse(r));
}, []);


  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a movie title");
      setMovies([]);
      return;
    }

    setError("");

    setLoading(true);
    try {
      const data = await SearchMovies(query);
      if (data.status === "EXCEPTION") {
        setError(data.data);
        setMovies([]);
        setLoading(false);
        return;
      }
      

      if (data.data && data.data.Search) {
        setMovies(data.data.Search);
        localStorage.setItem("lastQuery", query);
        localStorage.setItem("lastResults", JSON.stringify(data.data.Search));
        setLoading(false);
      } else {
        setError("No movies found");
        setMovies([]);
        setLoading(false);
      }
    } catch (err) {
      setError("Something went wrong");
      console.log(err);
      setLoading(false);
    }
  };

  const handleMovieSelect = (movie) => {
    navigate(`/details/${movie.imdbID}`);
  };

  return (
    <div className="search-container">
      <div className="heading">
        <img className="logo" alt="Logo" src={logo}></img>
          <h1 className="search-title">{import.meta.env.VITE_WEBSITE_NAME}</h1>
      </div>

      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          className="search-box"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <button className="search-btn" onClick={handleSearch}>
          {loading?"Searching..":"Search"}
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      <MovieGrid movies={movies} onMovieSelect={handleMovieSelect} />
    </div>
  );
}

export default SearchPage;
