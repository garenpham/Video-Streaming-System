'use strict';

const express = require('express');

// Constants
const PORT = 3004;
const HOST = '0.0.0.0';

//Router
var router = express.Router();

// App
const app = express();
app.get('/', (req, res) => {
	res.send('Hello World');
});

app.use('/', router);

app.listen(PORT, HOST, () => {
	console.log(`Running on http://${HOST}:${PORT}`);
});
