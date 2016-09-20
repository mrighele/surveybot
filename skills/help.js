"use strict";

module.exports = function(skill, info, message, memory) {
	return { reply: [
		"Ok, here is a detailed list of what you can ask me",
		"1. You can create a *new survey*, don't forget to tell me the *name* (it must be a single word!)",
		"2. Once you have created a survey, you can *add* one or more *options* to vote to it. The option also must be a single word.",
		"3. You can *vote* for it ! Keep in mind that you can vote only once, but if you change your mind just vote again and I will discard your old vote",
		"4. If you want to know about already existing surveys, you can ask me for a *list*",
		"5. You can also ask for the current *results* of a survey (otherwise, what's the point of all of this ? :-D)",
		"At the moment surveys never expires, and you cannot delete them. Too bad !"
	]};
};
