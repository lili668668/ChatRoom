var strings = ['滾滾', '蒽蒽', '主人', '主人', '吃', '睡', '玩', '哆啦A夢', '球魚'];
var len = strings.length;
exports.res = function(str) {
    for (var i = 0;i < len;i++) {
        if (str.indexOf(strings[i]) !== -1) {
            return strings[i];
        }
    }
    return undefined;
}
