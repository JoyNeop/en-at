enat.listOfDicts = [
    { id: 'test', title: 'Test', count: 10, style: 'background-color: #19F;' },
    { id: 'test', title: 'Math', count: 8, style: 'background-color: #F26;' },
    { id: 'test', title: 'Philosophy', count: 4, style: 'background-color: #1E6;' },
    { id: 'test', title: 'Computer', count: 16, style: 'background-color: #777;' }
];

enat.createCardsIntoIndex = function (msg) {
    var cardTemplate = '__CARD_TEMPLATE__';
    document.getElementById('enat-index-dict-cards-container').innerHTML += cardTemplate.replace(/__ID__/g, msg.id).replace(/__TITLE__/g, msg.title).replace(/__COUNT__/g, msg.count).replace(/__STYLE__/g, msg.style);
};

(function(){
    var tmp = '';
    enat.listOfDicts.forEach(function (v) {
        enat.createCardsIntoIndex(v);
    });
})();
