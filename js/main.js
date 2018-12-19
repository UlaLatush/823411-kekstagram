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
var FILTER_DEFAULT = 'none';

var SCALE_DIRECTION_DOWN = 'down';
var SCALE_DIRECTION_UP = 'up';
var SCALE_STEP = 25;
var SCALE_MIN = 25;
var SCALE_MAX = 100;
var SCALE_DEFAULT = 100;

var TAG_NOT_UNIQUE_MSG = 'Tag {t} are not unique!';
var TAG_WRONG_FORMAT = 'Tag {t} should start with # symbol!';
var TAG_IS_TOO_SHORT = 'Tag {t} is to short!';
var TAG_MIN_LEN = 1;
var TAG_IS_TO_LONG = 'Tag {t} is to long!';
var TAG_MAX_LEN = 20;
var TAG_MAX_AMOUNT = 5;
var TAG_AMOUNT_IS_TOO_MUCH = 'Total amount of tags more than ' + TAG_MAX_AMOUNT;

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

  // set default scale
  resizePicture(SCALE_DEFAULT);

  // set default filter
  document.querySelector('#effect-none').checked = true;
  changePictureStyle();

  // change pin position and set default filter opacity value
  changePinPosition(Number.MAX_SAFE_INTEGER);

  // set filter opacity
  changeFilterOpacity();

  document.querySelector('.img-upload__overlay').classList.remove('hidden');
};

// open editor when file is selected
document.querySelector('#upload-file').addEventListener('change', openPhotoEditor);

var closePhotoEditor = function () {
  if (
    !document.activeElement.classList.contains('text__description')
    && !document.activeElement.classList.contains('text__hashtags')
  ) {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.querySelector('#upload-file').value = null;
    document.querySelector('.text__hashtags').value = null;
    document.querySelector('.text__description').value = null;
  }
};

// close editor when cancel button is pressed
document.querySelector('#upload-cancel').addEventListener('click', closePhotoEditor);

// close editor when ESC key is pressed
document.addEventListener('keydown', function (evt) {
  if (evt.which === ESC_KEY_CODE) {
    closePhotoEditor();
  }
});

// drag pin
var pin = document.querySelector('.effect-level__pin');
pin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startX = evt.clientX;


  var onMouseMove = function (evt) {
    evt.preventDefault();

    var shiftX = startX - evt.clientX;
    var pinPosition = (pin.offsetLeft - shiftX);

    changePinPosition(pinPosition);

    startX = evt.clientX;
  };

  var onMouseUp = function (evt) {
    evt.preventDefault();


    changeFilterOpacity();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var changePinPosition = function (pinPosition) {

  var sliderWidth = pin.parentElement.offsetWidth;

  if (pinPosition > sliderWidth) {
    pinPosition = sliderWidth;
  } else if (pinPosition < 0) {
    pinPosition = 0;
  }

  pin.style.left = pinPosition + 'px';
  var effectLevel = Math.round(pin.offsetLeft * 100 / sliderWidth);
  document.querySelector('.effect-level__value').value = effectLevel;
  document.querySelector('.effect-level__depth').style.width = effectLevel + '%';
};

// change style of editing picture
var changePictureStyle = function () {

  var classes = document.querySelector('.img-upload__preview').classList;
  var selectedEffect = document.querySelector('input[name="effect"]:checked').value;

  for (var c = 0; c < classes.length; c++) {
    if (classes.item(c).startsWith(FILTER_STYLE_PREFIX)) {
      classes.remove(classes.item(c));
    }
  }
  classes.add(FILTER_STYLE_PREFIX + selectedEffect);

  if (selectedEffect === FILTER_DEFAULT) {
    document.querySelector('.img-upload__effect-level').classList.add('visually-hidden');
  } else {
    document.querySelector('.img-upload__effect-level').classList.remove('visually-hidden');
  }
};

// change filter opacity
var changeFilterOpacity = function () {

  var imgPreview = document.querySelector('.img-upload__preview');
  var selectedEffect = document.querySelector('input[name="effect"]:checked').value;
  var effectLevel = document.querySelector('.effect-level__value').value;

  if (selectedEffect === 'chrome') {
    imgPreview.style.filter = 'grayscale(' + effectLevel / 100 + ')';
  } else if (selectedEffect === 'sepia') {
    imgPreview.style.filter = 'sepia(' + effectLevel / 100 + ')';
  } else if (selectedEffect === 'marvin') {
    imgPreview.style.filter = 'invert(' + effectLevel + '%)';
  } else if (selectedEffect === 'phobos') {
    imgPreview.style.filter = 'blur(' + Math.trunc(effectLevel / 100 * 3) + 'px)';
  } else if (selectedEffect === 'heat') {
    var truncatedVal = Math.trunc(effectLevel / 100 * 3);
    imgPreview.style.filter = 'brightness(' + (truncatedVal === 0 ? 1 : truncatedVal) + ')';
  } else {
    imgPreview.style.filter = 'none';
  }
};

// add listeners to switch filters
var radios = document.querySelectorAll('.effects__radio');
for (var k = 0; k < radios.length; k++) {
  radios[k].addEventListener('change', function () {

    // change filter
    changePictureStyle();

    // change pin position and set default filter opacity value
    changePinPosition(Number.MAX_SAFE_INTEGER);

    // set default filter opacity
    changeFilterOpacity();
  });
}

// open big picture
document.addEventListener('click', function (evt) {
  if (evt.srcElement.classList.contains('picture__img')) {
    openBigPicture(findPictureByUrl(evt.srcElement.src));
  }
});

// close big picture
document.querySelector('.big-picture__cancel').addEventListener('click', closeBigPicture);

// change scale
document.querySelector('.scale__control--smaller').addEventListener('click', function () {
  scalePicture(SCALE_DIRECTION_DOWN);
});
document.querySelector('.scale__control--bigger').addEventListener('click', function () {
  scalePicture(SCALE_DIRECTION_UP);
});

var scalePicture = function (direction) {
  var desiredScale = 0;
  var scale = document.querySelector('.scale__control--value');
  var currentScale = parseInt(scale.value.replace('%', ''), 10);

  if (direction === SCALE_DIRECTION_DOWN) {
    desiredScale = currentScale - SCALE_STEP;
  } else if (direction === SCALE_DIRECTION_UP) {
    desiredScale = currentScale + SCALE_STEP;
  }

  // resize picture
  if (desiredScale >= SCALE_MIN && desiredScale <= SCALE_MAX) {
    resizePicture(desiredScale);
  }
};

var resizePicture = function (scale) {
  document.querySelector('.scale__control--value').value = scale + '%';
  document.querySelector('.img-upload__preview').style.transform = 'scale(' + scale / 100 + ')';
};

var validateTags = function (tags) {

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

// add validator to submit button
document.querySelector('#upload-submit').addEventListener('click', function () {

  var tagsInput = document.querySelector('.text__hashtags');
  tagsInput.setCustomValidity(validateTags(tagsInput.value));
});

