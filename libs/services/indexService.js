const csvFilePath='data.csv';
const csv=require('csvtojson')
const tokenizerUtil = require('../utils/tokenizerUtil');

var users = [];
var ngram_inverted_index = {};

exports.get_indexed_users = function () {

	return users;
}

exports.get_inverted_index = function () {

	return ngram_inverted_index;
} 

exports.index_users_and_tokenize = function() {

	//read data from csv and generate/index ngram tokens
	csv()
	.fromFile(csvFilePath)
	.then((jsonArr)=>{
		for(var i=0; i<jsonArr.length;i++){
			var csvJsonObj = jsonArr[i];
			var user = {};
			user.firstName = csvJsonObj['First Name'];
			user.middleName = csvJsonObj['Middle Name'];
			user.lastName = csvJsonObj['Last Name'];
			users.push(user);
		}
		console.log("data read from csv.");
		//generate inverted index for searching
		tokenize_and_generate_inverted_index();
		console.log("ngram index generated.");
	});
}

function tokenize_and_generate_inverted_index() {

	for(var i=0; i<users.length; i++){

		// get ngram tokens with weights for a user
		var ngram_tokens_with_weights = tokenizerUtil.tokenize_user_ngram(users[i]);

		// separate ngram tokens and weights
		var ngram_tokens = ngram_tokens_with_weights.tokens;
		var weights = ngram_tokens_with_weights.weights;

		// iterate through each token and add it to inverted index with its weight
		for(var j=0; j<ngram_tokens.length; j++){

			//get token and its weight
			var token = ngram_tokens[j];
			var weight = weights[j];

			//if token already exists, push to list else create a new list and push it
			if(!ngram_inverted_index.hasOwnProperty(token)){
				ngram_inverted_index[token]={};
				ngram_inverted_index[token].indices=[];
				ngram_inverted_index[token].weights=[];
			}
			ngram_inverted_index[token].indices.push(i);
			ngram_inverted_index[token].weights.push(weight);
		}
	}
}