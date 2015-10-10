window.enat = {
    config: {
        wordsPerSession: 12
    },
    runtime: {
        currentSessionProgress: 0,
        currentSessionVocabulary: null
    }
};

enat.listOfDicts = [
    { id: 'test', title: 'Philosophy', count: 4, style: 'background-color: #19F;', color: '#19F', disabled: false },
    { id: 'test2', title: 'Linguistics', count: 10, style: 'background-color: #1E6;', color: '#1E6', disabled: true },
    { id: 'test3', title: 'Math', count: 0, style: 'background-color: #FF5E3A;', color: '#FF5E3A', disabled: true },
    { id: 'test4', title: 'Physics', count: 0, style: 'background-color: #4C55A6;', color: '#4C55A6', disabled: true },
    { id: 'test5', title: 'Chemistry', count: 0, style: 'background-color: #777;', color: '#777', disabled: true },
    { id: 'test6', title: 'Psychology', count: 0, style: 'background-color: #F26;', color: '#F26', disabled: true }
];

enat.request = function (url, callback) {
    var h = new XMLHttpRequest();
    h.onload = callback;
    h.open('GET', url, true);
    h.send();
};
