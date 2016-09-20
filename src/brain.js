
var NLP = require('natural');

module.exports = Brain; 

function Brain() {
	this.classifier = new NLP.LogisticRegressionClassifier();

	this.minConfidence = 0.7;

	// Keep track of the current topic for each interacting user
	this.topic = {};
	
}

Brain.prototype.teach = function(label, phrases) {
	phrases.forEach(function(phrase) {
		console.log('Ingesting example for ' + label + ': ' + phrase);
		this.classifier.addDocument(phrase.toLowerCase(), label);
	}.bind(this));
	return this;
};

Brain.prototype.think = function() {
	this.classifier.train();
	return this;
};

Brain.prototype.interpret = function(phrase) {
	var guesses = this.classifier.getClassifications(phrase.toLowerCase());
	var guess = guesses.reduce(toMaxValue);
	return {
		probabilities: guesses,
		guess: guess.value > this.minConfidence ? guess.label : null
	};
};

Brain.prototype.invoke = function(skill, info, message, memory) {
	var skillCode;
	console.log('Grabbing code for skill: ' + skill);
	try {
		skillCode = require('../skills/' + skill);
		console.log('Running skill code for ' + skill + '...');
		return skillCode(skill, info, message, memory);
		
	} catch (err) {
		console.log("Error:", err.stack);
		return {
			reply: ["Whops: something went wrong :-): " + err ]
		};
	}
};

function toMaxValue(x, y) {
	return x && x.value > y.value ? x : y;
}

const topics = {
	initial: {}
};
Brain.prototype.reason = function(message, interpretation, speech, memory) {
	var topic = this.topic[message.user];
	if (!topic) {
		topic = topics['initial'];
	}
	
	console.log("Current topic is", topic);
	console.log('surveybot heard: ' + message.text);
	console.log('surveybot interpretation: ', interpretation);
	if (!interpretation.guess) {
		return {
			reply: [
			'Hmm... I couldn\'t tell what you said...',
			'```\n' + JSON.stringify(interpretation) + '\n```'
			]
		};
	} else  {
		console.log('Invoking skill: ' + interpretation.guess);
		return this.invoke(interpretation.guess, speech, message, memory);
	}
}
