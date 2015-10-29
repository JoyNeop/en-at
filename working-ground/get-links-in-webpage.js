var spi = function () {
	var wikiUrlPrefix = 'https://en.wikipedia.org/wiki/';
	var links = [].map.call(document.querySelectorAll('#bodyContent a'), function (n) {
		var tmp = n.href.indexOf(wikiUrlPrefix) == 0 ? n.href.replace(wikiUrlPrefix, '') : '';
		tmp = tmp.match(/#$/) ? tmp.replace(/#$/, '') : tmp;
		tmp = tmp.indexOf('Wikipedia:') == 0 ? '' : tmp;
		tmp = tmp.indexOf('Special:') == 0 ? '' : tmp;
		tmp = tmp.indexOf('Portal:') == 0 ? '' : tmp;
		tmp = tmp.indexOf('Help:') == 0 ? '' : tmp;
		tmp = tmp.indexOf('File:') == 0 ? '' : tmp;
		tmp = tmp.indexOf('Talk:') == 0 ? '' : tmp;
		tmp = tmp.indexOf('Category:') == 0 ? '' : tmp;
		tmp = tmp.indexOf('Template:') == 0 ? '' : tmp;
		tmp = tmp.indexOf('Template_talk:') == 0 ? '' : tmp;
		tmp = tmp.indexOf('#cite_note') != -1 ? '' : tmp;
		tmp = tmp.indexOf('#cite_ref') != -1 ? '' : tmp;
		tmp = tmp.indexOf(document.title.slice(0, -35) + '#') == 0 ? '' : tmp;
		tmp = decodeURIComponent(tmp);
		return tmp;
	});
	var result = links.join('\n').replace(/\n\n/g, '\n');

	while (result.indexOf('\n\n') != -1) {
		result = result.replace(/\n\n/g, '\n');
	};

	var map = new Map();

	links.forEach(function (v, i, a) {
		if (v != '') {
			map[v] = 1;
		};
	});

	return map;
};

spi();
