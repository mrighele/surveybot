"use strict";

let common = require('./common');


module.exports = function(skill, info, message, memory) {
	console.log("MESSAGE:", message);
	let surveyName = common.findParameter(message.text, "survey");
	let optionName = common.findParameter(message.text, ["name", "option"]);
	if (!surveyName) {
		return {
			reply: ["Sorry, but I don't understand what survey you want to update" ]
		};
	}
	if (!optionName) {
		return {
			reply: [ "Sorry, but I don't understand what options you want to add to survey " + surveyName ]
		};
	}

	let survey = memory.getSurveyByName(surveyName);
	if (!survey) {
		return {
			reply : [`Sorry, but I don't remember about any survey named *${surveyName}* !`]
		};
	}
	survey.addOption(optionName);

	return {
		reply: [`Ok now the survey *${surveyName}* has a new options named *${optionName}*`]
	};
};
