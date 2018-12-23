'use strict';

(function () {

  // find initial position
  function renderPictures(data) {

    window.photoLoader.photoData = data;

    var sectionPictures = document.querySelector('.pictures');
    var sectionPictureUpload = sectionPictures.querySelector('.img-upload');

    // add picture elements to page
    var fragmentPics = document.createDocumentFragment();

    for (var j = 0; j < data.length; j++) {
      var picture = data[j];
      var pictureElement = window.photoUtils.createPictureElement(picture);
      fragmentPics.appendChild(pictureElement);
    }
    sectionPictures.insertBefore(fragmentPics, sectionPictureUpload);
  }
  window.backend.get(renderPictures, window.messages.errorLoading);

  window.photoLoader = {
    photoData: []
  };
})();
