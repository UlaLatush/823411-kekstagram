'use strict';

// find initial position
var sectionPictures = document.querySelector('.pictures');
var sectionPictureUpload = sectionPictures.querySelector('.img-upload');

// add picture elements to page
var fragmentPics = document.createDocumentFragment();

for (var j = 0; j < window.photoData.length; j++) {
  var picture = window.photoData[j];
  var pictureElement = window.photoUtils.createPictureElement(picture);
  fragmentPics.appendChild(pictureElement);
}
sectionPictures.insertBefore(fragmentPics, sectionPictureUpload);

// open big picture
document.addEventListener('click', function (evt) {
  if (evt.srcElement.classList.contains('picture__img')) {
    window.photoViewer.open(evt.srcElement.src);
  }
});

// close big picture
document.querySelector('.big-picture__cancel').addEventListener('click', window.photoViewer.close);

