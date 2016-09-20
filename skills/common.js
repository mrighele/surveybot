"use strict";

let natural = require("natural");


module.exports = {
	findParameter: findParameter
};

let tokenizer = new natural.TreebankWordTokenizer();
let stemmer = natural.PorterStemmer;

function findParameter(message, parameters) {
	if (typeof(parameters) === 'string') {
		parameters = [parameters];
	}
	parameters = parameters.map( stemmer.stem );
//	let tokens = tokenizer.tokenize(message);
	let tokens = tokenizer.tokenize(message);
	let stemmed = tokens.map( stemmer.stem );
	for (let parameter of parameters) {
		for (let i=0; i<tokens.length; ++i) {
			let token = stemmed[i];
			if (token == parameter && i < tokens.length-1) {
				return tokens[i+1];
			}
		}
	}
	return null;
};
