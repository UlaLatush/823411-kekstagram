'use strict';

var ALL_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var LIKES_MIN = 15;

var LIKES_MAX = 200;

var PHOTOS_AMOUNT = 25;

var NAMES = [
  'Снеки',
  'Валера',
  'Маша',
  'Кира',
  'Юля'
];

var pictures = [];

function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getPhotoObject(i) {
  return {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomInt(LIKES_MIN, LIKES_MAX),
    comments: getRandomComments(),
    description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)]
  };
}

function createPhotoElement(photoIndex) {
  var instance = fragment.cloneNode(true);
  var img = instance.querySelector('img');
  img.setAttribute('src', pictures[photoIndex].url);
  img.setAttribute('alt', pictures[photoIndex].description);
  instance.querySelector('.picture__comments').textContent = pictures[photoIndex].comments.length;
  instance.querySelector('.picture__likes').textContent = pictures[photoIndex].likes;
  return instance;
}

function createCommentElement(comment, commentTemplate) {
  var instance = commentTemplate.cloneNode(true);
  instance.querySelector('img').setAttribute('src', comment.avatar);
  instance.querySelector('p').textContent = comment.message;
  instance.querySelector('img').setAttribute('alt', comment.name);
  return instance;
}

function getRandomComments() {
  var randomComments = [];
  var randomAmountComments = getRandomInt(1, ALL_COMMENTS.length);
  var allCommentsClone = ALL_COMMENTS.slice(0);
  for (var i = 1; i <= randomAmountComments; i++) {
    var randomCommentIndex = getRandomInt(0, allCommentsClone.length - 1);
    var comment = {
      avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
      message: allCommentsClone[randomCommentIndex],
      name: NAMES[getRandomInt(0, NAMES.length - 1)]
    };
    allCommentsClone.splice(randomCommentIndex, 1);
    randomComments.push(comment);
  }

  return randomComments;
}

// generate photo objects
for (var i = 0; i < PHOTOS_AMOUNT; i++) {
  pictures.push(getPhotoObject(i));
}

// obtain picture template
var fragment = document.querySelector('#picture').content;

// find initial position
var sectionPictures = document.querySelector('.pictures');
var sectionPictureUpload = sectionPictures.querySelector('.img-upload');

// add photo elements to page
var fragmentPics = document.createDocumentFragment();
for (var j = 0; j < pictures.length; j++) {
  fragmentPics.appendChild(createPhotoElement(j));
}
sectionPictures.insertBefore(fragmentPics, sectionPictureUpload);

// open big picture
/* function openBigPicture() {
  var bigPicture = document.querySelector('.big-picture');
  var firstPicture = pictures[0];
  bigPicture.classList.remove('hidden');

  // fill likes, comments amount and description
  bigPicture.querySelector('.big-picture__img').children[0].setAttribute('src', firstPicture.url);
  bigPicture.querySelector('.likes-count').textContent = firstPicture.likes;
  bigPicture.querySelector('.comments-count').textContent = firstPicture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = firstPicture.description;

  // add comment elements to page
  var commentsContainer = bigPicture.querySelector('.social__comments');
  var commentTemplate = commentsContainer.children[0];
  var commentsFragment = document.createDocumentFragment();

  for (var c = 0; c < firstPicture.comments.length; c++) {
    commentsFragment.appendChild(createCommentElement(firstPicture.comments[c], commentTemplate));
  }
  commentsContainer.innerHTML = '';
  commentsContainer.appendChild(commentsFragment);

  // hide blocks
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
}*/

var openPhotoEditor = function () {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
};

// open editor when file is selected
document.querySelector('#upload-file').addEventListener('change', openPhotoEditor());
