'use strict';

(function () {

  var TAG_NOT_UNIQUE_MSG = 'Tag {t} are not unique!';
  var TAG_WRONG_FORMAT = 'Tag {t} should start with # symbol!';
  var TAG_IS_TOO_SHORT = 'Tag {t} is to short!';
  var TAG_MIN_LEN = 1;
  var TAG_IS_TO_LONG = 'Tag {t} is to long!';
  var TAG_MAX_LEN = 20;
  var TAG_MAX_AMOUNT = 5;
  var TAG_AMOUNT_IS_TOO_MUCH = 'Total amount of tags more than ' + TAG_MAX_AMOUNT;

  window.validateTags = function (tags) {

    var arr = tags.split(' ');
    var uniques = [];
    var errors = '';

    for (var a = 0; a < arr.length; a++) {

      var tag = arr[a];
      errors = errors.length > 0 ? errors.concat(' ') : errors.concat('');

      if (uniques.includes(tag.toLowerCase())) {
        errors = errors.concat(TAG_NOT_UNIQUE_MSG.replace('{t}', tag));
      }
      uniques.push(tag.toLowerCase());

      if (!tag.startsWith('#')) {
        errors = errors.concat(TAG_WRONG_FORMAT.replace('{t}', tag));
      }

      if (tag.length <= TAG_MIN_LEN) {
        errors = errors.concat(TAG_IS_TOO_SHORT.replace('{t}', tag));
      }

      if (tag.length > TAG_MAX_LEN) {
        errors = errors.concat(TAG_IS_TO_LONG.replace('{t}', tag));
      }
    }

    if (errors.length === 0 && tags.length > TAG_MAX_AMOUNT) {
      errors = errors.concat(TAG_AMOUNT_IS_TOO_MUCH);
    }

    return errors;
  };

})();
