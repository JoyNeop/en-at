var request = require('request');
var fs = require('fs');

var words = fs.readFileSync('./dict-raw.txt').toString().trim().replace(/\n\n/g, ',\n');
words = words.replace(/^(.)/, '[\n$1').replace(/(.)$/, '$1\n]\n').replace(/>(.*?)>\n<(.*?)</g, '\t{"t":"$1","e":"$2","w":1}');

console.log(words);
fs.writeFileSync('./dict-processed.txt', words);
