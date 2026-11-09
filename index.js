const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const db = require('./models/db.js');

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

app.get('/home', function(req,res) {
	res.render('home.hbs');
});

app.post('/login2', function(req,res) {
	var email = req.body.login_email;
	var password = req.body.login_password;

	console.log(email + ' ' + password);

	var userInitials = email[0];
	var username = email.split('@')[0];

	var details = {
		user_initials: userInitials,
		username: username
	}

	res.render('home.hbs', details);
});

app.post('/register', async function(req,res) {
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var password = req.body.password;

	console.log(firstName + ' ' + lastName + ' ' + email + ' ' + password);

	try {
		await db.insertOne('users', { firstName: firstName, lastName: lastName, email: email, password: password });
		console.log('Users inserted successfully');
	} catch (err) {
		console.error('Error inserting user: ', err);
		res.status(500).send('Error registering user');
	}

});

app.listen(port, hostname, function() {
	console.log(`Server running at: `);
	console.log('http://' + hostname + ':' + port);
});