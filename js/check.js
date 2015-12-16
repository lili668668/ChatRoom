var strings = ['滾滾', '主人', '主人', '吃', '睡', '玩'];
var len = strings.length;
exports.res = function(str) {
    for (var i = 0;i < len;i++) {
        if (str.indexOf(strings[i]) !== -1) {
            return strings[i];
        }
    }
    return undefined;
}
