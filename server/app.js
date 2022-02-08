const express = require('express');
const config = require('./config');
const moviesRoute = require('./movies');
const reviewsRoute = require('./reviews');

const app = express();
const port = config.port;

// General app settings
const set_content_type = function (req, res, next) 
{
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	next()
}

app.use( set_content_type );
app.use(express.json());  // to support JSON-encoded bodies
app.use(express.urlencoded( // to support URL-encoded bodies
{  
  extended: true
}));

app.use('/', moviesRoute);
app.use('/', reviewsRoute);

let msg = `listening at port ${port}`
app.listen(port, () => console.log(msg));