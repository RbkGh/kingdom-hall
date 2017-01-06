let Scripture=require("./Scripture.js");

const SCRIPTURE_REGEX = /\b(\w+)\s*(\d[\d\s\-\.,;:]*)/igm;
const CHAPTERVERSE_REGEX = /(\d+)\s*[:\.]([\d\s\-,]+)/g;
const BIBLEBOOKS = [
    {"regex":/Ge(?:n|nesis)?\.?/gi,                     "speak":"Genesis",              "name":"Genesis",       "num":1,    "fn":"ge",      "noch":false},
    {"regex":/Ex(?:odus)?\.?/gi,                        "speak":"Exodus",               "name":"Exodus",        "num":2,    "fn":"ex",      "noch":false},
    {"regex":/Le(?:v|viticus)?\.?/gi,                   "speak":"Leviticus",            "name":"Leviticus",     "num":3,    "fn":"le",      "noch":false},
    {"regex":/Nu(?:m|mber|mbers)?\.?/gi,                "speak":"Numbers",              "name":"Numbers",       "num":4,    "fn":"nu",      "noch":false},
    {"regex":/De(?:ut|uter|uteronomy)?\.?/gi,           "speak":"Deuteronomy",          "name":"Deuteronomy",   "num":5,    "fn":"de",      "noch":false},
    {"regex":/Jos(?:h|hua)?\.?/gi,                      "speak":"Joshua",               "name":"Joshua",        "num":6,    "fn":"jos",     "noch":false},
    {"regex":/(?:Jg|Judg|Judge|Judges){1}\.?/gi,        "speak":"Judges",               "name":"Judges",        "num":7,    "fn":"jg",      "noch":false},
    {"regex":/Ru(?:th)?\.?/gi,                          "speak":"Ruth",                 "name":"Ruth",          "num":8,    "fn":"ru",      "noch":false},
    {"regex":/1\s?Sa(?:m|muel)?\.?/gi,                  "speak":"First Samuel",         "name":"1 Samuel",      "num":9,    "fn":"1sa",     "noch":false},
    {"regex":/2\s?Sa(?:m|muel)?\.?/gi,                  "speak":"Second Samuel",        "name":"2 Samuel",      "num":10,   "fn":"2sa",     "noch":false},
    {"regex":/1\s?Ki(?:ng|ngs)?\.?/gi,                  "speak":"First Kings",          "name":"1 Kings",       "num":11,   "fn":"1ki",     "noch":false},
    {"regex":/2\s?Ki(?:ng|ngs)?\.?/gi,                  "speak":"Second Kings",         "name":"2 Kings",       "num":12,   "fn":"2ki",     "noch":false},
    {"regex":/1\s?Ch(?:r|ron|ronicles)?\.?/gi,          "speak":"First Chronicles",     "name":"1 Chronicles",  "num":13,   "fn":"1ch",     "noch":false},
    {"regex":/2\s?Ch(?:r|ron|ronicles)?\.?/gi,          "speak":"Second Chronicles",    "name":"2 Chronicles",  "num":14,   "fn":"2ch",     "noch":false},
    {"regex":/Ezr(?:a|\.)?/gi,                          "speak":"Ezra",                 "name":"Ezra",          "num":15,   "fn":"ezr",     "noch":false},
    {"regex":/Ne(?:h|hemiah)?\.?/gi,                    "speak":"Neea my uh",           "name":"Nehemiah",      "num":16,   "fn":"ne",      "noch":false},
    {"regex":/Es(?:t|th|ther)?\.?/gi,                   "speak":"Esther",               "name":"Esther",        "num":17,   "fn":"es",      "noch":false},
    {"regex":/Job/gi,                                   "speak":"Joab",                 "name":"Job",           "num":18,   "fn":"job",     "noch":false},
    {"regex":/Ps(?:alm|alms)?\.?/gi,                    "speak":"Psalms",               "name":"Psalms",        "num":19,   "fn":"ps",      "noch":false},
    {"regex":/Pr(?:o|ov|overb|overbs)?\.?/gi,           "speak":"Proverbs",             "name":"Proverbs",      "num":20,   "fn":"pr",      "noch":false},
    {"regex":/Ec(?:c|cl|cles|clesiastes)?\.?/gi,        "speak":"Ecclesiastes",         "name":"Ecclesiastes",  "num":21,   "fn":"ec",      "noch":false},
    {"regex":/(?:ca|can|canticles|song|song of sol|song of solomon)\.?/gi,
                                                        "speak":"Song of Solomon", "name":"Song of Solomon", "num":22, "fn":"ca", "noch":false},
    {"regex":/Isa(?:iah|\.)?/gi,                        "speak":"Isaiah",               "name":"Isaiah",        "num":23,   "fn":"isa",     "noch":false},
    {"regex":/Jer(?:emiah|\.)?/gi,                      "speak":"Jeremiah",             "name":"Jeremiah",      "num":24,   "fn":"jer",     "noch":false},
    {"regex":/La(?:m|ment|mentation|mentations)?\.?/gi, "speak":"Lamentations",         "name":"Lamentations",  "num":25,   "fn":"la",      "noch":false},
    {"regex":/Eze(?:k|kiel)?\.?/gi,                     "speak":"Ezekiel",              "name":"Ezekiel",       "num":26,   "fn":"eze",     "noch":false},
    {"regex":/Da(?:n|niel)?\.?/gi,                      "speak":"Daniel",               "name":"Daniel",        "num":27,   "fn":"da",      "noch":false},
    {"regex":/Ho(?:s|sea)?\.?/gi,                       "speak":"Ho see uh",            "name":"Hosea",         "num":28,   "fn":"ho",      "noch":false},
    {"regex":/Joe(?:l|\.)?/gi,                          "speak":"Joel",                 "name":"Joel",          "num":29,   "fn":"joe",     "noch":false},
    {"regex":/Am(?:os|\.)?/gi,                          "speak":"Amos",                 "name":"Amos",          "num":30,   "fn":"am",      "noch":false},
    {"regex":/Ob(?:ad|adiah)?\.?/gi,                    "speak":"Obadiah",              "name":"Obadiah",       "num":31,   "fn":"ob",      "noch":true},
    {"regex":/Jon(?:ah|\.)?/gi,                         "speak":"Joan uh",              "name":"Jonah",         "num":32,   "fn":"jon",     "noch":false},
    {"regex":/Mic(?:ah|\.)?/gi,                         "speak":"Micah",                "name":"Micah",         "num":33,   "fn":"mic",     "noch":false},
    {"regex":/Na(?:hum|\.)?/gi,                         "speak":"Nay um",               "name":"Nahum",         "num":34,   "fn":"na",      "noch":false},
    {"regex":/Hab(?:ak|akkuk)?\.?/gi,                   "speak":"Hab uh kuk",           "name":"Habakkuk",      "num":35,   "fn":"hab",     "noch":false},
    {"regex":/Ze(?:p|ph|phaniah)?\.?/gi,                "speak":"Zephaniah",            "name":"Zephaniah",     "num":36,   "fn":"zep",     "noch":false},
    {"regex":/Hag(?:gai|\.)?/gi,                        "speak":"Hag eye",              "name":"Haggai",        "num":37,   "fn":"hag",     "noch":false},
    {"regex":/Zec(?:h|hariah)?\.?/gi,                   "speak":"Zechariah",            "name":"Zechariah",     "num":38,   "fn":"zec",     "noch":false},
    {"regex":/Mal(?:achi|\.)?/gi,                       "speak":"Malachi",              "name":"Malachi",       "num":39,   "fn":"mal",     "noch":false},
    {"regex":/(?:Mt|Mat|Matt|Matthew){1}\.?/gi,         "speak":"Matthew",              "name":"Matthew",       "num":40,   "fn":"mt",      "noch":false},
    {"regex":/(?:Mr|Mar|Mark){1}\.?/gi,                 "speak":"Mark",                 "name":"Mark",          "num":41,   "fn":"mr",      "noch":false},
    {"regex":/Lu(?:ke|\.)?/gi,                          "speak":"Luke",                 "name":"Luke",          "num":42,   "fn":"lu",      "noch":false},
    {"regex":/Jo(?:h|hn)?\.?/gi,                        "speak":"John",                 "name":"John",          "num":43,   "fn":"joh",     "noch":false},
    {"regex":/Ac(?:t|ts)?\.?/gi,                        "speak":"Acts",                 "name":"Acts",          "num":44,   "fn":"ac",      "noch":false},
    {"regex":/Ro(?:m|man|mans)?\.?/gi,                  "speak":"Romans",               "name":"Romans",        "num":45,   "fn":"ro",      "noch":false},
    {"regex":/1\s?Co(?:r|rinth|rinthians)?\.?/gi,       "speak":"First Corinthians",    "name":"1 Corinthians", "num":46,   "fn":"1co",     "noch":false},
    {"regex":/2\s?Co(?:r|rinth|rinthians)?\.?/gi,       "speak":"Second Corinthians",   "name":"2 Corinthians", "num":47,   "fn":"2co",     "noch":false},
    {"regex":/Ga(?:l|lation|lations)?\.?/gi,            "speak":"Galatians",            "name":"Galatians",     "num":48,   "fn":"ga",      "noch":false},
    {"regex":/Ep(?:h|hesian|hesians)?\.?/gi,            "speak":"Ephesians",            "name":"Ephesians",     "num":49,   "fn":"eph",     "noch":false},
    {"regex":/(?:Php|Phil|Phill|Phillipians){1}\.?/gi,  "speak":"Phillipians",          "name":"Phillipians",   "num":50,   "fn":"php",     "noch":false},
    {"regex":/Col(?:os|oss|ossian|ossians)?\.?/gi,      "speak":"Colossians",           "name":"Colossians",    "num":51,   "fn":"col",     "noch":false},
    {"regex":/1\s?Th(?:es|ess|essalonians)?\.?/gi,      "speak":"First Thessalonians",  "name":"1 Thessalonians", "num":52, "fn":"1th",     "noch":false},
    {"regex":/2\s?Th(?:es|ess|essalonians)?\.?/gi,      "speak":"Second Thessalonians", "name":"2 Thessalonians", "num":53, "fn":"2th",     "noch":false},
    {"regex":/1\s?Ti(?:m|mothy)?\.?/gi,                 "speak":"First Timothy",        "name":"1 Timothy",     "num":54,   "fn":"1ti",     "noch":false},
    {"regex":/2\s?Ti(?:m|mothy)?\.?/gi,                 "speak":"Second Timothy",       "name":"2 Timothy",     "num":55,   "fn":"2ti",     "noch":false},
    {"regex":/Tit(?:us|\.)?/gi,                         "speak":"Titus",                "name":"Titus",         "num":56,   "fn":"tit",     "noch":false},
    {"regex":/(?:Phm|Philemon){1}\.?/gi,                "speak":"Philemon",             "name":"Philemon",      "num":57,   "fn":"phm",     "noch":true},
    {"regex":/He(?:b|brew|brews)?\.?/gi,                "speak":"Hebrews",              "name":"Hebrews",       "num":58,   "fn":"heb",     "noch":false},
    {"regex":/(?:Ja|Jas|Jam|Jame|James){1}\.?/gi,       "speak":"James",                "name":"James",         "num":59,   "fn":"jas",     "noch":false},
    {"regex":/1\s?Pe(?:t|te|ter)?\.?/gi,                "speak":"First Peter",          "name":"1 Peter",       "num":60,   "fn":"1pe",     "noch":false},
    {"regex":/2\s?Pe(?:t|te|ter)?\.?/gi,                "speak":"Second Peter",         "name":"2 Peter",       "num":61,   "fn":"2pe",     "noch":false},
    {"regex":/1\s?Jo(?:h|hn)?\.?/gi,                    "speak":"First John",           "name":"1 John",        "num":62,   "fn":"1jo",     "noch":false},
    {"regex":/2\s?Jo(?:h|hn)?\.?/gi,                    "speak":"Second John",          "name":"2 John",        "num":63,   "fn":"2jo",     "noch":true},
    {"regex":/3\s?Jo(?:h|hn)?\.?/gi,                    "speak":"Third John",           "name":"3 John",        "num":64,   "fn":"3jo",     "noch":true},
    {"regex":/Jude/gi,                                  "speak":"Jude",                 "name":"Jude",          "num":65,   "fn":"jude",    "noch":true},
    {"regex":/Re(?:v|velation)?\.?/gi,                  "speak":"Revelation",           "name":"Revelation",    "num":66,   "fn":"re",      "noch":false}
];

/*  
 *  parseScripture:  Receives text and parses it into an array of Scripture objects.
 *  It outputs an array even if only one scripture is matched. 
 * 
 */
function parseScriptures(text) {
    var scriptures=[], scripRE=getScriptureRegEx(), scripmatch, s, cvmatch;
    while(scripmatch=scripRE.exec(text)) {
        while( cvmatch=CHAPTERVERSE_REGEX.exec(scripmatch[2]) ) {
            s=new Scripture(scripmatch[1],cvmatch[1],cvmatch[2]);
            if(s.valid()) scriptures.push(s);
        }
    }
    return scriptures;
}

/*
 *  getScriptureRegEx: Takes the simpler SCRIPTURE_REGEX constant and subs out the \w+ (word) 
 *  placeholder with all of the exact scripture regexes. This way it only matches real Bible books.
 * 
 */
function getScriptureRegEx() {
    var booksrearray=[];
    for( var b of BIBLEBOOKS ) booksrearray.push(b.regex.source);
    return RegExp(SCRIPTURE_REGEX.source.replace("\\w+",booksrearray.join("|")),SCRIPTURE_REGEX.flags);
}

module.exports={
    SCRIPTURE_REGEX: SCRIPTURE_REGEX,
    CHAPTERVERSE_REGEX: CHAPTERVERSE_REGEX,
    BIBLEBOOKS: BIBLEBOOKS,
    parseScriptures: parseScriptures,
    getScriptureRegEx: getScriptureRegEx
}
