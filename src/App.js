import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?apikey=5d739798";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchMovies = async (title) => {
    setIsLoading(true);
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
    setIsLoading(false);
  };

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="app">
      <h1>Movie Land</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {!isLoading && movies.length > 0 && (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={Date.now() + Math.random()} movie={movie} />
          ))}
        </div>
      )}
      {!isLoading && movies.length === 0 && (
        <div className="empty">
          <h2> No movies found </h2>
        </div>
      )}
      {isLoading && (
        <div className="empty">
          <h2> Loading... </h2>
        </div>
      )}
    </div>
  );
};

export default App;
