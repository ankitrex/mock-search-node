var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var cors = require('cors')
app.use(cors()) //allow cross domain requests

var routes = require('./libs/routes/searchRoutes'); //importing route
routes(app); //register the route

var indexService = require('./libs/services/indexService');
indexService.index_users_and_tokenize(); // index users and ngram tokens

app.listen(port);

console.log('Search RESTful API server started on: ' + port);