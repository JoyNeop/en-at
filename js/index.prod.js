enat.listOfDicts = [
    { id: 'test', title: 'Linguistics', count: 10, style: 'background-color: #19F;', disabled: false },
    { id: 'test', title: 'Philosophy', count: 4, style: 'background-color: #1E6;', disabled: false },
    { id: 'test', title: 'Math', count: 0, style: 'background-color: #FF5E3A;', disabled: true },
    { id: 'test', title: 'Physics', count: 0, style: 'background-color: #4C55A6;', disabled: true },
    { id: 'test', title: 'Chemistry', count: 0, style: 'background-color: #777;', disabled: true },
    { id: 'test', title: 'Psychology', count: 0, style: 'background-color: #F26;', disabled: true }
];

enat.createCardForIndex = function (msg) {
    var cardTemplate = '<div class="enat-dict-entry-card-placeholder col-xs-12 col-sm-6 col-md-4 col-lg-4">    <div class="enat-dict-entry-card" data-enat-dict-disabled="false" data-enat-tooltip-placeholder>        <a class="enat-dict-entry-card-anchor" href="./dict/__ID__/">            <div class="enat-dict-entry-card-vertical-area-1" style="__STYLE__">            </div>            <div class="enat-dict-entry-card-vertical-area-2">                <footer>__COUNT__</footer>                <h4>__TITLE__</h4>            </div>        </a>    </div></div>';
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
