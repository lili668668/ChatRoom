var computer = require('./dict.js').res();
var rand = require('random-js')();

exports.res = function(str) {
    if (computer[str]) {
        var temp = computer[str];
        return temp[rand.integer(0,temp.length-1)];
    } else {
        return str;
    }
};
