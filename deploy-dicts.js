var fs = require('fs');


// Rewrite with template
(function(){
    var template = fs.readFileSync('./template/dict-interface-template.html').toString();
    var listOfDicts = [
        'test'
    ];
    listOfDicts.forEach(function (dir) {
        fs.writeFileSync('./dict/' + dir + '/index.html', template);
    });
})();

// Put index dict card with template
(function(){
    var cardTemplate = fs.readFileSync('./template/index-dict-card-template.html').toString().trim().replace(/\n/g, '');
    var js = fs.readFileSync('./js/index.js').toString().replace(/__CARD_TEMPLATE__/g, cardTemplate);

    fs.writeFileSync('./js/index.prod.js', js);
})();

// Done
console.log('Done.');
