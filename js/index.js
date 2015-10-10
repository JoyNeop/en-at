enat.createCardForIndex = function (msg) {
    var cardTemplate = '__CARD_TEMPLATE__';
    tmp = cardTemplate.replace(/__ID__/g, msg.id).replace(/__TITLE__/g, msg.title).replace(/__COUNT__/g, msg.count).replace(/__STYLE__/g, msg.style);
    if (msg.disabled == true) {
        tmp = tmp.replace('data-enat-dict-disabled="false"', 'data-enat-dict-disabled="true"');
    };
    return tmp;
};

(function(){
    var tmp = '';
    enat.listOfDicts.forEach(function (v) {
        document.getElementById('enat-index-dict-cards-container').innerHTML += enat.createCardForIndex(v);
        [].forEach.call(document.querySelectorAll('[data-enat-dict-disabled="true"] a'), function (vv) {
            vv.addEventListener('click', function (e) {
                e.preventDefault();
                return false;
            });
        });
    });
})();
