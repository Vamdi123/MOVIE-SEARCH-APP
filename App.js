
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const apiKey = "381ffec3"; 

  const searchMovies = async () => {
    if (!searchTerm) return;

    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`
      );
      if (res.data.Search) setMovies(res.data.Search);
      else setMovies([]);
    } catch (err) {
      console.error(err);
    }
  };

  const addToFavorites = (movie) => {
    const updated = [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const removeFavorite = (id) => {
    const updated = favorites.filter((movie) => movie.imdbID !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="app">
      <h1>🎬 MovieVerse</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      <div className="movie-section">
        <h2>🔍 Results</h2>
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.Poster} alt={movie.Title} />
              <h4>{movie.Title}</h4>
              <p>{movie.Year}</p>
              <button onClick={() => addToFavorites(movie)}>❤️ Favorite</button>
            </div>
          ))}
        </div>
      </div>

      <div className="movie-section">
        <h2>⭐ Favorites</h2>
        <div className="movie-list">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.Poster} alt={movie.Title} />
              <h4>{movie.Title}</h4>
              <p>{movie.Year}</p>
              <button onClick={() => removeFavorite(movie.imdbID)}>🗑 Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
