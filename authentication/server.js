'use strict';

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Constants
const PORT = 3004;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.json());
/**
 * Set CORS to allow other services to communicate
 */
app.use(
	cors({
		origin: [process.env.CLIENT_URL],
		methods: ['GET', 'POST'],
		credentials: true,
	}),
);

/**
 * Set cookie to save login session
 */
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
	session({
		key: 'userId',
		secret: 'project1',
		resave: false,
		// prevent empty session objects
		saveUninitialized: false,
		cookie: {
			// Fri Dec 31 9999 23:59:59 GMT+0000
			// httpOnly: true,
			// sameSite: none,
			maxAge: 1000 * 60 * 60 * 24 * 10,
			secure: false,
		},
	}),
);

/**
 * Initialize connection with mysql-db service
 */
const db = mysql.createConnection({
	user: 'project1',
	host: 'db',
	port: '3306',
	password: 'project1',
	database: 'project1',
	multipleStatements: true,
});

app.get('/', (req, res) => {
	res.send({ clientIP: req.ip, clientHost: req.hostname });
});

/**
 * Handle POST request on /register and /login.
 * Both take in username and password inputs from the user.
 */
app.post('/register', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	db.query(
		'SELECT * FROM users WHERE username = ? AND password = ?',
		[username, password],
		(err, result) => {
			if (err) {
				res.send({ err: err });
			}
			if (result.length > 0) {
				res.send({ message: 'User Exist' });
			} else {
				db.query(
					'INSERT INTO users (username,password) VALUES (?,?)',
					[username, password],
					(err, result) => {
						if (err) {
							res.send({ err: err });
						}
						if (result) {
							res.status(201).send(result);
						}
					},
				);
			}
		},
	);
});

app.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	db.query(
		'SELECT * FROM users WHERE username = ? AND password = ?',
		[username, password],
		(err, result) => {
			if (err) {
				res.send({ err: err });
			}
			if (result.length > 0) {
				req.session.user = result;
				res.send(result);
			} else {
				res.send({ message: 'Wrong username/password combination!' });
			}
		},
	);
});
app.get('/login', (req, res) => {
	if (req.session.user) {
		res.send({ loggedIn: true, user: req.session.user });
	} else {
		res.send({ loggedIn: false });
	}
	console.log(process.env.LOCAL_URL);
});

app.get('/logout', (req, res) => {
	req.session.user = null;
	res.send({ loggedIn: false });
});

app.listen(PORT, HOST, () => {
	/**
	 * Create table storing users
	 * while initializing the service
	 */
	let createUsers = `
	CREATE TABLE IF NOT EXISTS users
	(id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(250) NOT NULL,
	password VARCHAR(250) NOT NULL,
	CONSTRAINT login_pk PRIMARY KEY (id))`;

	db.query(createUsers, (err, result) => {
		console.log(err);
	});
	console.log(`Running Server on http://${HOST}:${PORT}`);
});
