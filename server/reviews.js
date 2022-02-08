const express = require('express');
const StatusCodes = require('http-status-codes').StatusCodes;
const { getMovieById } = require('./db-interface/movies');
const { getReviews, addReview } = require('./db-interface/reviews');
const { addUser, getUserByEmail } = require('./db-interface/users');

async function addReviewAPI(req, res) {
    const rank = parseInt(req.body.rank);
    const text = req.body.text;
    const movieId = parseInt(req.body.movieId);
    const email = req.body.email;
    const userName = req.body.userName;

    if(isNaN(rank) || !text || isNaN(movieId) || !email) {
        res.status(StatusCodes.BAD_REQUEST);
		res.json({ error: "missing data" });
		return;
    }

    if(text.length > 1000) {
        res.status(StatusCodes.BAD_REQUEST);
		res.json({ error: "text limit 1000 letters" });
		return;
    }

    if(rank < 1 || rank > 5) {
        res.status(StatusCodes.BAD_REQUEST);
		res.json({ error: "rank should be between 1 and 5" });
		return;
    }

    let movie = await getMovieById(movieId);

    if(!movie) {
		res.json({ error: "no such movie" });
		return;
    }

    let creator = await getUserByEmail(email);

    if(!creator) {
        creator = await addUser(email, userName);
    }

    creator = creator.id;
    let review = await addReview({rank, text, movieId, creator});
    res.json({review});
}

async function getReviewsAPI(req, res) {
    let g_reviews = await getReviews();
    res.json({g_reviews});
}

const router = express.Router();

router.post('/review', (req, res) => { addReviewAPI(req, res) });
router.get('/reviews', (req, res) => { getReviewsAPI(req, res) });

module.exports = router;