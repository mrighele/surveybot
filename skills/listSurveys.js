"use strict";

module.exports = function(skill, info, message, memory) {
	if (memory.getSurveyList().length === 0 ) {
		return {
			reply: ["There are currently no surveys"]
		};
	} else {
		let msg = "This is a list of the current surveys:";
		for (let survey of memory.getSurveyList()) {
			msg += `\n*${survey.getName()}* by *${survey.getAuthor()}*, with currently *${survey.nVotes()}* votes`;
		}
		return {
			reply: [msg]
		};
	}			
};
