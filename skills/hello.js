"use strict";

module.exports = function(skill, info, message, memory) {
	return { reply: [
		"Hello ! I am surveybot. As you can guess I care about surveys.",
		"You can ask me to list you what surveys are available, get the details for each one or vote for them.",
		"You can even create new surveys if you want :-).",
		"If you need more details, you can ask me for help"
	]};
};
