const express = require('express');
const randomstring = require("randomstring");
const StatusCodes = require('http-status-codes').StatusCodes;
const { getMovies, addMovie, getMovieById, partialSearchMovie, deleteMovie } = require('./db-interface/movies');
const { addUser, getUserByEmail, getUserById } = require('./db-interface/users');

async function addMovieAPI(req, res) {
    const movieName = req.body.movieName;
    const img = req.body.img;
    const email = req.body.email;
    const userName = req.body.userName;

    if (!movieName || !img || !email) {
        res.status(StatusCodes.BAD_REQUEST);
        res.json({ error: "missing data" });
        return;
    }

    let secret = randomstring.generate(8);
    let creator = await getUserByEmail(email);

    if (!creator) {
        creator = await addUser(email, userName);
    }

    creator = creator.id;
    let movie = await addMovie({ movieName, img, creator, secret });
    res.json({ movie });
}

async function getMoviesAPI(req, res) {
    const movieName = req.query.movieName;
    let g_movies = [];

    g_movies = movieName ? await partialSearchMovie(movieName) : await getMovies();
    res.json({ g_movies });
}

async function deleteMovieAPI(req, res) {
    const movieId = parseInt(req.params.id);
    const email = req.body.email;
    const secret = req.body.secret;

    if (isNaN(movieId) || !email || !secret) {
        res.status(StatusCodes.BAD_REQUEST);
        res.json({ error: "missing data" });
        return;
    }

    let movie = await getMovieById(movieId);

    if (!movie) {
        res.json({ error: "no movie found" });
        return;
    }

    let user = await getUserById(movie.creator);

    if (user.email !== email || movie.secret !== secret) {
        res.json({ error: "wrong email or secret" });
        return;
    }

    await deleteMovie(movieId);
    res.json({ movie });
}

const router = express.Router();

router.post('/movie', (req, res) => { addMovieAPI(req, res) });
router.get('/movies', (req, res) => { getMoviesAPI(req, res) });
router.delete('/movie/(:id)', (req, res) => { deleteMovieAPI(req, res) });

module.exports = router;