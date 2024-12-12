import React, { useState } from 'react';
import '../styles.css';
import MovieCard from './MovieCard';

export default function MoviesGrid({ watchlist, movies, toggleWatchlist }) {

    const [searchTerm, setSearchTerm] = useState('');
    const [genre, setGenre] = useState('All Genres');
    const [rating, setRating] = useState('All');


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const matchesGenre = (movie, genre) => {
        return genre === 'All Genres' || movie.genre.toLowerCase() === genre.toLowerCase();
    }

    const matchesSearchTerm = (movie, searchTerm) => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    }

    const matchesRating = (movie, rating) => {
        switch (rating) {
            case 'All':
                return true;
            case 'Good':
                return movie.rating >= 8;
            case 'Ok':
                return movie.rating >= 5 && movie.rating < 8;
            case 'Bad':
                return movie.rating < 5;
            default:
                return false;
        }
    }

    const filteredMovies = movies.filter((movie) =>
        matchesGenre(movie, genre) &&
        matchesRating(movie, rating) &&
        matchesSearchTerm(movie, searchTerm)
    )

    return (
        <div className="movies-grid-container">
            <input
                type="text"
                className='search-input'
                placeholder="Search movies..."
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <div className="filter-bar">
                <div className="filter-slot">
                    <label htmlFor="genre">Genre</label>
                    <select className="filter-dropdown" name="genre" id="genre" value={genre} onChange={handleGenreChange}>
                        <option value="All Genres">All Genres</option>
                        <option value="Action">Action</option>
                        <option value="Drama">Drama</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Horror">All</option>
                    </select>
                </div>
                <div className="filter-slot">
                    <label htmlFor="rating">Rating</label>
                    <select className="filter-dropdown" name="rating" id="rating" value={rating} onChange={handleRatingChange}>
                        <option value="All">All</option>
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Bad">Bad</option>
                    </select>
                </div>
            </div>

            <div className="movies-grid">
                {
                    filteredMovies.map(movie => (
                        <MovieCard
                            movie={movie}
                            toggleWatchlist={toggleWatchlist}
                            isWatchlisted={watchlist.includes(movie.id)} />
                    ))
                }
            </div>
        </div>
    );
}