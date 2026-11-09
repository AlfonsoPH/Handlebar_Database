const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // Tells us that we're using this framework to encode the data in the body of the request.
app.use(express.static('public')); // Tells us that we're using this framework to serve static files from the public directory.

app.set('view engine', 'hbs'); // Use handlebars as templating language

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.get('/', function(req, res) {
	res.render('register.hbs');
});

app.get('/register', function(req,res) {
	res.render('register.hbs');
});

app.get('/login', function(req,res) {
	res.render('login.hbs');
});


app.listen(port, hostname, function() {
	console.log(`Server running at: `);
	console.log('http://' + hostname + ':' + port);
});