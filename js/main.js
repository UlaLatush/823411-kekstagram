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

var PICTURES_AMOUNT = 25;

var NAMES = [
  'Снеки',
  'Валера',
  'Маша',
  'Кира',
  'Юля'
];

var ESC_KEY_CODE = 27;

var FILTER_STYLE_PREFIX = 'effects__preview--';

var pictures = [];

function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getPictureObject(i) {
  return {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomInt(LIKES_MIN, LIKES_MAX),
    comments: getRandomComments(),
    description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)]
  };
}

function createPictureElement(pictute, pictureTemplate) {
  var instance = pictureTemplate.cloneNode(true);
  var img = instance.querySelector('img');
  img.setAttribute('src', pictute.url);
  img.setAttribute('alt', pictute.description);
  instance.querySelector('.picture__comments').textContent = pictute.comments.length;
  instance.querySelector('.picture__likes').textContent = pictute.likes;
  return instance;
}

function createCommentElement(comment, commentTemplate) {
  var instance = commentTemplate.cloneNode(true);
  instance.querySelector('img').setAttribute('src', comment.avatar);
  instance.querySelector('p').textContent = comment.message;
  instance.querySelector('img').setAttribute('alt', comment.name);
  return instance;
}

// open big picture
function openBigPicture(picture) {
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
}

function closeBigPicture() {
  document.querySelector('.big-picture').classList.add('hidden');
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

function findPictureByUrl(url) {
  for (var i = 0; i < pictures.length; i++) {
    if (url.includes(pictures[i].url)) {
      return pictures[i];
    }
  }
  return null;
}

// generate picture objects
for (var i = 0; i < PICTURES_AMOUNT; i++) {
  pictures.push(getPictureObject(i));
}

// obtain picture template
var pictureTemplate = document.querySelector('#picture').content;

// find initial position
var sectionPictures = document.querySelector('.pictures');
var sectionPictureUpload = sectionPictures.querySelector('.img-upload');

// add picture elements to page
var fragmentPics = document.createDocumentFragment();
for (var j = 0; j < pictures.length; j++) {
  var picture = pictures[j];
  var pictureElement = createPictureElement(picture, pictureTemplate);
  fragmentPics.appendChild(pictureElement);
}
sectionPictures.insertBefore(fragmentPics, sectionPictureUpload);


var openPhotoEditor = function () {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
};

// open editor when file is selected
document.querySelector('#upload-file').addEventListener('change', openPhotoEditor);

var closePhotoEditor = function () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('#upload-file').value = null;
};

// close editor when cancel button is pressed
document.querySelector('#upload-cancel').addEventListener('click', closePhotoEditor);

// close editor when ESC key is pressed
document.addEventListener('keydown', function (event) {
  if (event.which === ESC_KEY_CODE) {
    closePhotoEditor();
  }
});

// change effect opacity when release mouse from pin
var changeFilterOpacity = function () {
  var sliderPin = document.querySelector('.effect-level__pin');
  var sliderWidth = sliderPin.parentElement.offsetWidth;
  document.querySelector('.effect-level__value').value = Math.round(sliderPin.offsetLeft * 100 / sliderWidth);
};
document.querySelector('.effect-level__pin').addEventListener('mouseup', changeFilterOpacity);

// change style of editing picture
var changePictureStyle = function (event) {
  var classes = document.querySelector('.img-upload__preview').classList;
  for (var c = 0; c < classes.length; c++) {
    if (classes.item(c).startsWith(FILTER_STYLE_PREFIX)) {
      classes.remove(classes.item(c));
    }
  }
  classes.add('effects__preview--' + event.srcElement.value);
};
var radios = document.querySelectorAll('.effects__radio');
for (var k = 0; k < radios.length; k++) {
  radios[k].addEventListener('change', changePictureStyle);
}

// open big pictute
document.addEventListener('click', function (event) {
  if (event.srcElement.classList.contains('picture__img')) {
    openBigPicture(findPictureByUrl(event.srcElement.src));
  }
});

// close big picture
document.querySelector('.big-picture__cancel').addEventListener('click', closeBigPicture);


