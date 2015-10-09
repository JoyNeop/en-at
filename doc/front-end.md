# Front-end Documentation

## Download a dictionary

```JavaScript
// This is a dictionary JSON file.
[
    { "t": 'en banc', "e": 'blah blah blah', "w": 1 },
    { "t": 'civil law', "e": 'blah blah blah', "w": 1 },
    ...
    // t for term
    // e for explanation
    // w for
]
// If `w` is 0, there is no Wikipedia article for the term.
// If `w` is 1, the Wikipedia article title is same to the term.
// If `w` is a string, the Wikipedia article URL should be the string. E.g. `w: 'Blah'` refers to `https://en.wikipedia.org/wiki/Blah`.
// Don't worry about capitalization. Wikipedia capitalizes the initial letter automatically.
```

## Pick a term randomly

### Record word history (?)

### Allow the user to decide frequency of a term (?)

This feature is under consideration and open for discussion.

```JavaScript
localStorage['ENAT_term_freq[LEGAL]en banc']
// The key consists of 3 parts: `ENTA_term_freq` is the namespace. `[LEGAL]` is the dictionary identifier. `en banc` is the term.
// Record user's designated frequency
```

### Handle dictionary extending and shrinking
