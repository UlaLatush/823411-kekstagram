'use strict';

(function () {

  var POST_URL = 'https://js.dump.academy/kekstagramsdsdasdas';
  var POST_METHOD = 'POST';

  var GET_URL = 'https://js.dump.academy/kekstagram/data';
  var GET_METHOD = 'GET';

  var HTTP_OK = 200;

  var TIMEOUT = 10000;
  var TIMEOUT_MSG = 'Request timeout ' + TIMEOUT + 'ms is expired!';

  var ERR_STATUS_MSG = 'Error status: ';
  var CONNECTION_ERR_MSG = 'Error has occurred during connection attempt!';

  function createErrorMessage(xhr) {
    return ERR_STATUS_MSG + xhr.status + ' ' + xhr.statusText;
  }

  function execute(method, url, onLoad, onError, data) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url);

    xhr.addEventListener('load', function () {
      if (xhr.status === HTTP_OK) {
        onLoad(xhr.response);
      } else {
        onError(createErrorMessage(xhr));
      }
    });

    xhr.addEventListener('error', function () {
      onError(CONNECTION_ERR_MSG);
    });

    xhr.addEventListener('timeout', function () {
      onError(TIMEOUT_MSG);
    });

    xhr.timeout = TIMEOUT;
    xhr.send(data);

    return xhr;
  }

  window.backend = {
    get: function (onLoad, onError) {
      execute(GET_METHOD, GET_URL, onLoad, onError);
    },
    post: function (onLoad, onError, data) {
      execute(POST_METHOD, POST_URL, onLoad, onError, data);
    }
  };
})();
