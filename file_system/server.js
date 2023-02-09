'use strict';

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const fileUpload = require('express-fileupload');

// Constants
const PORT = 3010;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.json());
app.use(
	cors({
		origin: [
			'http://localhost:4010',
			'http://localhost:4000',
			'http://localhost:4004',
			'http://localhost:3000',
		],
		methods: ['GET', 'POST'],
		credentials: true,
	}),
);
app.use(fileUpload());

const db = mysql.createConnection({
	user: 'project1',
	host: 'db',
	port: '3306',
	password: 'project1',
	database: 'project1',
	multipleStatements: true,
});
app.get('/', (req, res) => {
	res.send('File System Service');
});

/**
 * POST request /upload
 * Move video file into shared volume - project1-uploads
 * Save the file path for accessing videos to shared volume.
 * Then access it from video streaming web
 */
app.post('/upload', (req, res) => {
	if (req.files === null) {
		return res.status(400).json({ msg: 'No file selected' });
	}
	console.log(req.files);
	const file = req.files.file;

	file.mv(`${__dirname}/public/videos/${file.name}`, (err) => {
		if (err) {
			console.log(err);
			return res.status(500).send(err);
		}

		const filename = file.name;
		const filePath = `./videos/${filename}`;

		db.query(
			'INSERT INTO uploads (filename,path) VALUES (?,?)',
			[filename, filePath],
			(err, result) => {
				if (err) {
					res.send({ err: err });
				}
				if (result) {
					res.status(201).send(file);
				}
			},
		);
	});
});

/**
 * Retrieve list of videos from mysql-db
 */
app.get('/view', (req, res) => {
	db.query('SELECT * FROM uploads', (err, result) => {
		if (err) {
			return res.send({ err: err });
		}
		if (result.length > 0) {
			res.send(result);
		} else {
			res.send(null);
		}
	});
});

app.listen(PORT, HOST, () => {
	let createFileSystem = `
CREATE TABLE IF NOT EXISTS uploads
(id INT NOT NULL AUTO_INCREMENT,
filename VARCHAR(250) NOT NULL,
path VARCHAR(250) NOT NULL,
CONSTRAINT path_pk PRIMARY KEY (id))`;

	db.query(createFileSystem, (err, result) => {
		console.log(err);
	});
	console.log(`Running Server on http://${HOST}:${PORT}`);
});
