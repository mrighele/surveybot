"use strict";

let moment = require('moment');
let loki = require('lokijs');

module.exports = Memory;

function Memory() {
	let self = this;
	this.db = new loki('memory.db', {
		autosave: true,
		autoload: true,
        autosaveInterval: 10000,
		autoloadCallback: function() {
			self.surveys = self.db.getCollection('surveys') || self.db.addCollection('surveys', {autoupdate: true});
			self.learnedPhrases = self.db.getCollection('learned-phrases') || self.db.addCollection('learned-phrases');
			console.log(`Loaded memory, found ${self.surveys.count()} surveys and ${self.learnedPhrases.count()} phrases`);
		}
	});
	
};

Memory.prototype.getSurveyList = function() {
	return this.surveys.find().map( s => new Survey(this.surveys, s) );
};

Memory.prototype.getSurveyByName = function(name) {
	let existing = this.surveys.where( function(s) { return s.name === name; });
	if (existing.length > 0) {
		return new Survey(this.surveys, existing[0]);
	}
	return null;
};

Memory.prototype.addSurvey = function(survey) {
	if (survey.data) {
		survey = survey.data;
	}
	survey.votes = {};
	survey.options = {};
	this.surveys.insert(survey);
};

Memory.prototype.nSurveys = function() {
	return this.surveys.count();
};

Memory.prototype.getLearnedPhrases = function() {
	let result = {};
	this.learnedPhrases.find().forEach( function(lp) {
		result[lp.topic] = lp.phrases;
	});
	return result;
};


	
function Survey(collection, surveyData) {
	this.collection = collection;
	this.data = surveyData;
};

Survey.prototype.nVotes = function() {
	return Object.keys(this.data.votes).length;
};

Survey.prototype.addOption = function(option) {
	var opt = {
		name: option,
		nVotes: 0
	};
	
	this.data.options[option] = opt;
	this.collection.update(this.data);
};

Survey.prototype.getOptions = function() {
	return Object.keys(this.data.options).map( x =>this.data.options[x] );
};


Survey.prototype.getName = function() {
	return this.data.name;
};

Survey.prototype.getAuthor = function() {
	return this.data.author;
};

Survey.prototype.setVote = function(user, option) {
	let previous = this.data.votes[user];
	if (previous) {
		this.data.options[previous].nVotes -= 1;
	}
	this.data.options[option].nVotes+=1;
	this.data.votes[user] = option;
	this.collection.update(this.data);
	return previous;
	
};

