const indexService = require('./indexService');
const tokenizerUtil = require('../utils/tokenizerUtil');

exports.search_on_index = function(searchQuery, maxResults) {

	//get indexed users
	var users = indexService.get_indexed_users();

	//perform search and fetch users index with score
	var searchScores = get_indexed_search_scores(searchQuery);

	var results = [];

	//iterate through map fetch users and push it to results array with score
	for(var k in searchScores){
		if(searchScores.hasOwnProperty(k)){
			var record = {};
			record.user=users[k];
			record.score=searchScores[k];
			results.push(record);
		}
	}

	//sort the new result array based on score
	results.sort((a, b) => b.score - a.score);

	//slice array based on max results
	return results.slice(0, maxResults);
}

function get_indexed_search_scores(searchQuery) {
	
	//get indexed inverted index
	var inverted_index = indexService.get_inverted_index();
	//ngram tokenize the search query
	var queryTokens = tokenizerUtil.tokenize_query_ngram(searchQuery);
	
	var searchScores = {};

	//iterate through each token
	for(var i=0; i<queryTokens.length; i++){

		var token = queryTokens[i];

		if(inverted_index.hasOwnProperty(token)){

			//get matched key from inverted index
			var indices_with_weight = inverted_index[token];
			var indices = indices_with_weight.indices;
			var weights = indices_with_weight.weights;

			//iterate through list of documents that contain the key
			for(var j=0; j<indices.length; j++){
				var index = indices[j];
				var score = weights[j];
				//update score of each index based on weight
				if(!searchScores.hasOwnProperty(index)){
					searchScores[index]=0;
				}
				searchScores[index]=searchScores[index]+score;
			}
		}
	}
	//return map of user index against weights
	return searchScores;
}