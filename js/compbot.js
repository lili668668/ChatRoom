var dict = require('./dict.js').res();
var check = require('./check.js');
var rand = require('random-js')();

exports.res = function(str) {
    var str2;
    if (str2 = check.res(str)) {
        var temp = dict[str2];
        return temp[rand.integer(0,temp.length-1)];
    } else {
        return str;
    }
};
