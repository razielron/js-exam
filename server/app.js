const express = require('express');
const path = require('path');
const config = require('./config');
const moviesRoute = require('./movies');
const reviewsRoute = require('./reviews');

const app = express();
const port = config.port;

const reExt = /\.([a-z]+)/i;

function content_type_from_extension(url) {
    const m = url.match(reExt);
    if (!m) return 'application/json'
    const ext = m[1].toLowerCase();

    switch (ext) {
        case 'js': return 'text/javascript';
        case 'css': return 'text/css';
        case 'html': return 'text/html';
    }

    return 'text/plain'
}

// General app settings
const set_content_type = function (req, res, next) {
    const contetnt_type = req.baseUrl == '/api' ? "application/json; charset=utf-8" : content_type_from_extension(req.url);
    res.setHeader("Content-Type", contetnt_type);
    next()
}

app.use(express.static(path.join(__dirname, 'site')));
app.use(set_content_type);
app.use(express.json());  // to support JSON-encoded bodies
app.use(express.urlencoded( // to support URL-encoded bodies
    {
        extended: true
    }));

app.use('/api', moviesRoute);
app.use('/api', reviewsRoute);

let msg = `listening at port ${port}`
app.listen(port, () => console.log(msg));