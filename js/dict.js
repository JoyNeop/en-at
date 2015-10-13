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
    var res = $.grep(enat.listOfDicts, function (n) {
        return n.id == tmp;
    });
    return res.length > 0 ? res[0] : null;
};

enat.randomlySelectSomeElementsFromArray = function (arr) {
    var tmp = [];
    var res = [];
    var total = enat.config.wordsPerSession;
    while (tmp.length < total) {
        var i = Math.floor(Math.random()*total);
        if ($.grep(tmp, function(item){
            return item == i;
        })) {
            tmp.push(i);
            res.push(arr[i]);
        };
    };
    return res;
};

enat.didReceiveDictDataFromServer = function (e) {
    var responseJSON = JSON.parse( e.target.responseText );
    enat.runtime.currentSessionVocabulary = enat.randomlySelectSomeElementsFromArray(responseJSON.list);
    enat.setPhrase(0);
};

enat.getCurrentSessionProgress = function () {
    return enat.runtime.currentSessionProgress;
};

enat.setCurrentSessionProgress = function (p) {
    enat.runtime.currentSessionProgress = p;

    document.getElementById('session-progress-bar-progress').style.width = ((enat.runtime.currentSessionProgress+1) / enat.config.wordsPerSession * 100) + '%';
};

enat.userDidClickStartSessionButton = function () {
    document.body.setAttribute('data-enat-session-state', 'session');
};

enat.setPhrase = function (ph) {
    var currentPhraseItem = enat.runtime.currentSessionVocabulary[ph];
    var currentPhrase;
    if (currentPhraseItem.w == 1) {
        currentPhrase = '<a class="phrase-anchor" href="https://wikipedia.org/wiki/_P_" target="_blank">_P_</a>'.replace(/_P_/g, currentPhraseItem.t);
    } else {
        currentPhrase = currentPhraseItem.t;
    };
    document.getElementById('current-phrase').innerHTML = currentPhrase;
    document.getElementById('current-explanation').innerHTML = currentPhraseItem.e;
};

enat.initNextButton = function (MSG) {
    document.getElementById('btn-next').innerHTML = MSG.text;
    document.getElementById('btn-next').classList.remove(MSG.removeClass);
    document.getElementById('btn-next').classList.add(MSG.addClass);
};

enat.userDidClickNextButton = function () {
    var currentSessionProgress = enat.getCurrentSessionProgress();
    if (currentSessionProgress < enat.config.wordsPerSession-1) {
        var currentPhraseItem = enat.runtime.currentSessionVocabulary[enat.getCurrentSessionProgress()];
        enat.setPhrase(currentSessionProgress+1);
        enat.setCurrentSessionProgress(currentSessionProgress+1);
        if (currentSessionProgress == enat.config.wordsPerSession-2) {
            enat.initNextButton({
                text: 'Finish',
                removeClass: 'btn-primary',
                addClass: 'btn-success'
            });
        };
    } else if (currentSessionProgress == enat.config.wordsPerSession-1) {
        enat.userDidFinishSession();
    };
};

enat.userDidChangeTranslationDisplayModePreference = function () {};

enat.userDidFinishSession = function () {
    document.body.setAttribute('data-enat-session-state', 'end');
};

(function(){
    // Initialize welcome screen
    if (enat.getCurrentDictInfoFromUrl() == null) {
        enat.dictNotFound();
    } else {
        document.getElementById('enat-dict-header').style.backgroundColor = enat.getCurrentDictInfoFromUrl().color;
        document.getElementById('session-progress-bar-progress').style.backgroundColor = enat.getCurrentDictInfoFromUrl().color;
        document.getElementById('enat-dictionary-title-text').innerHTML = enat.getCurrentDictInfoFromUrl().title;
        document.title = enat.getCurrentDictInfoFromUrl().title + ' — English A.T.';
        enat.request('./dict.json', enat.didReceiveDictDataFromServer);
        enat.setCurrentSessionProgress(0);

        if (window.innerWidth < 770) {
            // Assuming it is iOS or another mobile device which may have bug for fixed viewport height
            document.ontouchmove = function (e) {
                e.preventDefault();
            };
        };

        if (window.innerHeight < 450 || navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1 || navigator.userAgent.toLowerCase().indexOf('iphone') != -1 ) {
            document.body.setAttribute('data-device-screen-height-mode', 'low');
        };
    };

    (function(){
        // Initialize event listeners
        document.getElementById('btn-start-session').addEventListener('click', enat.userDidClickStartSessionButton);
        document.getElementById('btn-next').addEventListener('click', enat.userDidClickNextButton);
        document.getElementById('btn-restart').addEventListener('click', function () {
            enat.initNextButton({
                text: 'Next',
                removeClass: 'btn-success',
                addClass: 'btn-primary'
            });
            enat.request('./dict.json', enat.didReceiveDictDataFromServer);
            enat.setCurrentSessionProgress(0);
            document.body.setAttribute('data-enat-session-state', 'welcome');
        });
        window.addEventListener('resize', function () {
            window.scrollTo(0,0);
        });
    })();
})();
