module.exports = function(app) {

	var search = require('../controllers/searchController');

	//route search endpoint
	app.route('/search')
	.get(search.fetch_results);

	//serving static html page
	app.route('/')
	.get(function(req, res){
		res.sendFile('index.html', {root: './public/views/'});
	});

};