const fsSync = require('fs');
const fs = fsSync.promises;
const config = require('../config');

const moviesPath = config.moviesPath;

async function getMovies() {
	let g_movies = [];

	if (fsSync.existsSync(moviesPath)) {
		g_movies = await fs.readFile(moviesPath, {encoding:'utf8', flag:'r'});
		g_movies = JSON.parse(g_movies);
		g_movies = g_movies.g_movies;
	}

    return g_movies;
}

async function addMovie(movie) {
    let g_movies = [];
    let id = await getMovieId();

    movie.id = id;
    g_movies = await getMovies();
    g_movies.push(movie);
	await fs.writeFile(moviesPath, JSON.stringify({g_movies}));

    return movie;
}

async function getMovieId() {
    let id = -1;
    let g_movies = await getMovies();

    g_movies.forEach(movie => {
        if(movie.id > id) id = movie.id;
    });

    return id + 1;
}

async function getMovieById(id) {
    let g_movies = await getMovies();
    let filteredMovies = [];

    filteredMovies = g_movies.filter(movie => movie.id === id);

    return filteredMovies[0];
}

async function partialSearchMovie(movieName) {
    let g_movies = await getMovies();
    let filteredMovies = [];

    if(g_movies.length) {
        filteredMovies = g_movies.filter(movie => movie.movieName.includes(movieName));
    }

    return filteredMovies;
}

async function deleteMovie(movieId) {
    let g_movies = await getMovies();
    let new_g_movies = [];

    if(g_movies.length) {
        new_g_movies = g_movies.filter(movie => movie.id !== movieId);
    }

    await fs.writeFile(moviesPath, JSON.stringify({g_movies: new_g_movies}));

    return new_g_movies;
}

module.exports = {
    getMovies,
	addMovie,
    getMovieId,
    getMovieById,
    partialSearchMovie,
    deleteMovie
}