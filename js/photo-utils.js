'use strict';

(function () {

  // obtain picture template
  var pictureTemplate = document.querySelector('#picture').content;

  window.photoUtis = {
    createPictureElement: function (pictute) {
      var instance = pictureTemplate.cloneNode(true);
      var img = instance.querySelector('img');
      img.setAttribute('src', pictute.url);
      img.setAttribute('alt', pictute.description);
      instance.querySelector('.picture__comments').textContent = pictute.comments.length;
      instance.querySelector('.picture__likes').textContent = pictute.likes;
      return instance;
    }
  };

})();
