var url = require('url');

exports.fetch_results = function (req, res) {

	//fetch request params
	var params = url.parse(req.url, true).query;
	var searchQuery = params.searchQuery;
	var maxResults = params.maxResults == undefined || params.maxResults.length < 1 ? 20 : params.maxResults;
 	
 	//query min length validation
	if(searchQuery == undefined || searchQuery.length < 3){
		res.status(422);
		res.json({'error': 'Search query must be atleast 3 characters long.'});
	}
	else{
		var searchService = require('../services/searchService');

		// search, score, filter, rank and return json
		console.time("search-score-filter-rank");
		var results = searchService.search_on_index(searchQuery, maxResults);
		res.json(results);
		console.timeEnd("search-score-filter-rank");
	}
}