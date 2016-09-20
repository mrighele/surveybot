"use strict";

var fs = require('fs');

var Train = require('./src/train');
var Brain = require('./src/brain');
var Ears = require('./src/ears');
var Memory = require('./src/memory');

console.log("Waiting for memory to load (hopefully)");



let memory = new Memory();

setTimeout( function() {

	var surveybot = {
		brain: new Brain(),
		ears: new Ears(process.env.SLACK_TOKEN),
		memory: memory
	};

	const NO_CONVERSATION = "no-conversation";
	const WAITING_CONFIRMATION = "waiting-confirmation";


	console.log('surveybot is learning...');
	surveybot.Teach = surveybot.brain.teach.bind(surveybot.brain);

	const builtinPhrases = require('./builtins');
	const learnedPhrases = surveybot.memory.getLearnedPhrases();
	const phrases = mergePhrases(builtinPhrases, learnedPhrases);

	eachKey(phrases, surveybot.Teach);


	surveybot.brain.think();
	console.log('surveybot finished learning, time to listen...');
	surveybot.ears
		.listen()
		.hear('.*', function(speech, message) {
			const interpretation = surveybot.brain.interpret(message.text);
			const response = surveybot.brain.reason(message, interpretation, speech, surveybot.memory);
			console.log(__filename, "response is", response);
			for (const text of response.reply) {
				speech.reply(message, text);
			}
		});


	function mergePhrases(obj1, obj2) {
		let result = {};
		eachKey(obj1, function(key) {
			if (!result[key]) {
				result[key] = [];
			}
			result[key] = result[key].concat(obj1[key]);
		});
		eachKey(obj2, function(key) {
			if (!result[key]) {
				result[key] = [];
			}
			result[key] = result[key].concat(obj2[key]);
		});

		return result;
	};



	function eachKey(object, callback) {
		Object.keys(object).forEach(function(key) {
			callback(key, object[key]);
		});
	}
}, 2000);
