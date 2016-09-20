"use strict";

let common = require('./common');

module.exports = function(skill, info, message, memory) {
	let surveyName = common.findParameter(message.text, "survey");
	if (!surveyName) {
		return {
			reply: ["Sorry, but I don't understand what survey you want to vote"]
		};
	}
	let optionName = common.findParameter(message.text, ["is", "vote"]);
	if (!optionName) {
		return {
			reply : ["Sorry, but it seems that you forgot to tell me what your vote is"]
		};
	}
	
	let survey = memory.getSurveyByName(surveyName);
	if (!survey) {
		return {
			reply: [`Sorry, but I don't remember about any survey named *${surveyName}* !`]
		};
	}

	let choice = survey.getOptions().filter( o => o.name === optionName);
	if (choice.length ===0 ) {
		return {
			reply: [`Sorry, but *${optionName}* is an invalid option for survey *${surveyName}*`]
		};		
	}

	let previous = survey.setVote(message.user, optionName);

	let msg = `Congratulations ! You voted for survey *${surveyName}*`;
	if (previous) {
		msg += "\nYour previous vote has been discarded";
	}
	return {
		reply: [msg]
	};
};
