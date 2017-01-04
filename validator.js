exports.validateEmail = function(email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!reg.test(email)) {
        return false;
    }
    return true;
}

exports.isNullOrWhiteSpace = function (str) {
  return (!str || str.length === 0 || /^\s*$/.test(str))
}