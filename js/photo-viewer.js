'use strict';

(function () {

  function createCommentElement(comment, commentTemplate) {
    var instance = commentTemplate.cloneNode(true);
    instance.querySelector('img').setAttribute('src', comment.avatar);
    instance.querySelector('p').textContent = comment.message;
    instance.querySelector('img').setAttribute('alt', comment.name);
    return instance;
  }

  function findPictureByUrl(url) {

    for (var i = 0; i < window.photoData.length; i++) {
      if (url.includes(window.photoData[i].url)) {
        return window.photoData[i];
      }
    }
    return null;
  }

  window.photoViewer = {

    open: function (url) {

      var picture = findPictureByUrl(url);
      var bigPicture = document.querySelector('.big-picture');
      bigPicture.classList.remove('hidden');

      // fill likes, comments amount and description
      bigPicture.querySelector('.big-picture__img').children[0].setAttribute('src', picture.url);
      bigPicture.querySelector('.likes-count').textContent = picture.likes;
      bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
      bigPicture.querySelector('.social__caption').textContent = picture.description;

      // add comment elements to page
      var commentsContainer = bigPicture.querySelector('.social__comments');
      var commentTemplate = commentsContainer.children[0];
      var commentsFragment = document.createDocumentFragment();

      for (var c = 0; c < picture.comments.length; c++) {
        commentsFragment.appendChild(createCommentElement(picture.comments[c], commentTemplate));
      }
      commentsContainer.innerHTML = '';
      commentsContainer.appendChild(commentsFragment);

      // hide blocks
      bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
      bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
    },

    close: function () {
      document.querySelector('.big-picture').classList.add('hidden');
    }
  };

})();
