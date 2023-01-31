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
app.use(
	cors({
		origin: ['http://localhost:4000'],
		methods: ['GET', 'POST'],
		credentials: true,
	}),
);
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
	session({
		key: 'userId',
		secret: 'subscribe',
		resave: true,
		saveUninitialized: true,
		cookie: {
			expires: 60 * 60 * 24,
		},
	}),
);

//db
const db = mysql.createConnection({
	user: 'project1',
	host: 'db',
	port: '3306',
	password: 'project1',
	database: 'project1',
	multipleStatements: true,
});

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
});

app.listen(PORT, HOST, () => {
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
