'use strict';

(function () {

  var mainElement = document.querySelector('main');
  var ESC_KEY_CODE = 27;
  var REFRESH_PAGE_MSG = 'Please refresh the page';

  function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  // close message
  function closeMessage(element) {

    var buttons = element.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', element.remove);
    }

    var closeMessageOnEscDown = function (evt) {
      if (evt.which === ESC_KEY_CODE) {
        element.remove();
        document.removeEventListener('keydown', closeMessageOnEscDown);
      }
    };
    document.addEventListener('keydown', closeMessageOnEscDown);

    var closeMessageOnOutsideClick = function (evt) {
      if (!isDescendant(element, evt.srcElement)) {
        element.remove();
        document.removeEventListener('click', closeMessageOnOutsideClick);
      }
    };
    document.addEventListener('click', closeMessageOnOutsideClick);
  }

  function createErrorMsg(msg) {
    var errorElement = document.querySelector('#error').content.cloneNode(true);
    errorElement.querySelector('.error__title').innerHTML = msg;
    mainElement.appendChild(errorElement);
    closeMessage(document.querySelector('.error'));
  }

  function createSuccessMsg() {
    var successElement = document.querySelector('#success').content.cloneNode(true);
    mainElement.appendChild(successElement);
    closeMessage(document.querySelector('.success'));
  }

  function createLoadingMsg() {
    var loadingElement = document.querySelector('#messages').content.cloneNode(true);
    mainElement.appendChild(loadingElement);
  }

  function createErrorLoadingMsg(msg) {
    var errorElement = document.querySelector('#error').content.cloneNode(true);
    errorElement.querySelector('.error__title').innerHTML = msg;
    var buttons = errorElement.querySelectorAll('button');
    buttons[0].innerHTML = REFRESH_PAGE_MSG;
    buttons[1].remove();
    mainElement.appendChild(errorElement);
    closeMessage(document.querySelector('.error'));
  }

  window.messages = {
    error: createErrorMsg,
    success: createSuccessMsg,
    loading: createLoadingMsg,
    errorLoading: createErrorLoadingMsg
  };
})();
