exports.tokenize_user_ngram = function (user) {

	var ngrams_with_weights = {};

	//ngram for first name, middle name and last name with weights
	var first_name_tokens = generate_ngram_tokens(user.firstName);
	var middle_name_tokens = generate_ngram_tokens(user.middleName);
	var last_name_tokens = generate_ngram_tokens(user.lastName);

	var tokens = [];
	pushArray(tokens, first_name_tokens.tokens);
	pushArray(tokens, middle_name_tokens.tokens);
	pushArray(tokens, last_name_tokens.tokens);

	var weights = [];
	pushArray(weights, first_name_tokens.weights);
	pushArray(weights, middle_name_tokens.weights);
	pushArray(weights, last_name_tokens.weights);

	ngrams_with_weights.tokens=tokens;
	ngrams_with_weights.weights=weights;

	return ngrams_with_weights;
}

exports.tokenize_query_ngram = function (query) {

	return generate_query_ngram_tokens(query);
}

function pushArray(arr, arr2) {
	arr.push.apply(arr, arr2);
}

function generate_ngram_tokens(str, type) {
	
	// create all possible substrings with min length 3
	// weight for string starting at 0 will be more than others
	// substring's weight will depend on length of the main string too
	// ex - firstname='ankit' will be split into 'ank' - 1.216, 'anki' - 1.512, 'ankit' - 2, 'nki' - 0.716, 'nkit' - 1.012, 'kit' - 0.716
	// ex - firstname='kit' will have only one substring 'kit' - 2

	var tokens = [];
	var weights = [];
	var formattedStr = str.toLowerCase().trim();

	for(var i=0; i<=formattedStr.length-3; i++){

		var weight=0;

		for(var j=i; j<=formattedStr.length-3; j++){
			
			var token = formattedStr.substring(i, j+3);
			weight+= Math.pow(token.length/formattedStr.length, 3);
			weight+= i==0 ? 1:0.5;

			tokens.push(token);
			weights.push(weight);
		}
	}

	var ngrams_with_weights = {};
	ngrams_with_weights.tokens=tokens;
	ngrams_with_weights.weights=weights;

	return ngrams_with_weights;
}

function generate_query_ngram_tokens(str, type) {
	
	// break query into ngram tokens of min length 3
	var tokens = [];
	var formattedStr = str.toLowerCase().trim();

	for(var i=0; i<=formattedStr.length-3; i++){

		for(var j=i; j<=formattedStr.length-3; j++){
			
			var token = formattedStr.substring(i, j+3);
			tokens.push(token);
		}
	}

	return tokens;
}