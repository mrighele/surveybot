"use strict";

let common = require('./common');

module.exports = function(skill, info, message, memory) {
	let surveyName = common.findParameter(message.text, "survey");
	if (!surveyName) {
		return {
			reply: ["Sorry, but I don't understand what survey you want to get the status of"]
		};
	}
	let survey = memory.getSurveyByName(surveyName);
	if (!survey) {
		return {
			reply: [`Sorry, but I don't remember about any survey named *${surveyName}* !`]
		};
	}

	let msg = `This is the current result for the survey *${surveyName}*:\n`;
	let options = survey.getOptions();
	options.sort( function(a,b) {
		return b.nVotes - a.nVotes;
	});
	for (let option of options) {
		msg += `*${option.name}* got *${option.nVotes}* votes\n`;
	}
	return {
		reply: [msg]
	};
};
