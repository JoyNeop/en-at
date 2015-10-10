enat.dictNotFound = function () {
    document.write('404 Not Found.')
};

enat.getCurrentDictInfoFromUrl = function () {
    var tmp;
    var res;
    var id = window.location.href.match(/\/dict\/(\w+)\/$/);
    if (id instanceof Array) {
        if (id.length > 1) {
            tmp = id[1];
        } else {
            return null;
        };
    } else {
        return null;
    };
    console.log(33, tmp);
    var res = $.grep(enat.listOfDicts, function (n) {
        return n.id == tmp;
    });
    console.log(555, res[0]);
    return res.length > 0 ? res[0] : null;
};

enat.initDictView = function (MSG) {
    enat.runtime.currentProgress = 0;

};

enat.randomlySelectSomeElementsFromArray = function (total, arr) {

};

enat.didReceiveDictDataFromServer = function (e) {
    var responseJSON = JSON.parse( e.target.responseText );
    console.log(responseJSON)
};

enat.getCurrentSessionProgress = function () {
    return enat.runtime.currentProgress;
};

enat.userDidClickStartSessionButton = function () {

};

enat.userDidClickNextButton = function () {};

enat.userDidChangeTranslationDisplayModePreference = function () {};

enat.userDidStartLearningSession = function () {};

enat.userDidFinishSession = function () {};

(function(){
    // Initialize welcome screen
    if (enat.getCurrentDictInfoFromUrl() == null) {
        enat.dictNotFound();
    } else {
        document.getElementById('enat-dict-header').style.backgroundColor = enat.getCurrentDictInfoFromUrl().color;
        document.getElementById('enat-dictionary-title-text').innerHTML = enat.getCurrentDictInfoFromUrl().title;
        enat.request('./dict.json', enat.didReceiveDictDataFromServer);
    };

    (function(){
        // Initialize event listeners
    })();

    (function(){
        // Initialize event listeners
    })();

    (function(){
        // Initialize event listeners
    })();
})();
