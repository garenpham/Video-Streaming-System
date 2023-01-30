https://bulkan-evcimen.com/using_express_router_instead_of_express_namespace

```javascript
var express = require('express'),
	forumRouter = express.Router(),
	threadRouter = express.Router(),
	app = express();

forumRouter.get('/:id/((view)?)', function (req, res) {
	res.send('GET forum ' + req.params.id);
});

forumRouter.get('/:id/edit', function (req, res) {
	res.send('GET forum ' + req.params.id + ' edit page');
});

forumRouter.delete('/:id', function (req, res) {
	res.send('DELETE forum ' + req.params.id);
});

app.use('/forum', forumRouter);

threadRouter.get('/:id/thread/:tid', function (req, res) {
	res.send('GET forum ' + req.params.id + ' thread ' + req.params.tid);
});

forumRouter.use('/', threadRouter);

app.listen(3333);
```

```javascript
var express = require('express');
var app = express();
var router = express.Router();

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function (req, res, next) {
	console.log('%s %s %s', req.method, req.url, req.path);
	next();
});

// this will only be invoked if the path ends in /bar
router.use('/bar', function (req, res, next) {
	// ... maybe some additional /bar logging ...
	next();
});

// always invoked
router.use(function (req, res, next) {
	res.send('Hello World');
});

app.use('/foo', router);

app.listen(3000);
```
