var fs = require('fs');

var mapOfWordsThatHaveBeenLookedUp = {};
mapOfWordsThatHaveBeenLookedUp.getWord = function (w) {
	return this['AlexIsSoCute' + w];
};
mapOfWordsThatHaveBeenLookedUp.setWord = function (w, val) {
	this['AlexIsSoCute' + w] = val;
};

// List of words
var listOfWords = fs.readFileSync('./words.txt').toString().trim().split('\n').sort();

var uniqueListOfWords = [];

listOfWords.forEach(function (v, i) {
	if (mapOfWordsThatHaveBeenLookedUp.getWord(v) === true) {
	} else {
		uniqueListOfWords.push(v);
		mapOfWordsThatHaveBeenLookedUp.setWord(v, true);
	};
});

fs.writeFileSync('./words-processed.txt', uniqueListOfWords.join('\n'));
