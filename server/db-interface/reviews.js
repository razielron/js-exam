const fsSync = require('fs');
const fs = fsSync.promises;
const config = require('../config');

const reviewsPath = config.reviewsPath;

async function getReviews() {
	let g_reviews = [];

	if (fsSync.existsSync(reviewsPath)) {
		g_reviews = await fs.readFile(reviewsPath, {encoding:'utf8', flag:'r'});
		g_reviews = JSON.parse(g_reviews);
		g_reviews = g_reviews.g_reviews;
	}

    return g_reviews;
}

async function addReview(review) {
    let g_reviews = [];
    let id = await getReviewId();

    review.id = id;
    g_reviews = await getReviews();
    g_reviews.push(review);
	await fs.writeFile(reviewsPath, JSON.stringify({g_reviews}));

    return review;
}

async function getReviewId() {
    let id = -1;
    let g_reviews = await getReviews();

    g_reviews.forEach(review => {
        if(review.id > id) id = review.id;
    });

    return id + 1;
}

module.exports = {
    getReviews,
	addReview,
    getReviewId
}