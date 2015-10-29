var request = require('request');
var fs = require('fs');

var listOfDefinitions = [];

var requestDefinition = function (word) {
	request('http://en.wikipedia.org/w/api.php?action=query&prop=langlinks&format=json&llprop=langname&lllang=zh&titles=' + word, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			didReceiveDefinitionResponse(word, body);
		};
	});
};

var didReceiveDefinitionResponse = function (word, body) {
	var tmp = body.match(/Chinese","\*":"(.*)"}]}}}}/);
	if (tmp) {
		if (tmp[1]) {
			var _tmp = tmp[1].replace(/\\u([\d\w]{4})/gi, function (match, grp) {
			    return String.fromCharCode(parseInt(grp, 16));
			});
			console.log(unescape(_tmp));
			listOfDefinitions.push( '>' + word.replace(/_/g, ' ') + '>\n<' + unescape(_tmp) + '<');
			console.log(listOfDefinitions);
			fs.writeFileSync( './dict-raw.txt', listOfDefinitions.join('\n\n') );
		};
	};
};

// Avoid existing words
var listOfExistingWords = JSON.parse(fs.readFileSync('./dict-processed.txt').toString());

// List of words
var uniqueListOfWords = fs.readFileSync('./words-processed.txt').toString().trim().split('\n');

// Get definitions
uniqueListOfWords.forEach(function (v, i) {
	if (i < 1300) {
		setTimeout(function () {
			requestDefinition(v);
		}, (Math.random()*120+120)*i );
	};
});
