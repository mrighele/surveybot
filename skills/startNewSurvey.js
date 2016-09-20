"use strict";
let common = require('./common');


module.exports = function(skill, info, message, memory) {
	let name = common.findParameter(message.text, ['name']);
	if (!name) {
		return {
			reply: ["I understand that you want to start a new survey, but not its name!"]
		};
	}
	let existing = memory.getSurveyByName(name);
	if (existing !== null) {
		return {
			reply: [`I'm sorry, but a survey with the name *${name}* already exists`]
		};
	}

	memory.addSurvey( {name: name, author: message.user });
	return {
		reply: [`I created a new survey with name "${name}", don't forget to add options to it!`]
	};
};
