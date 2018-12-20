'use strict';

(function () {

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

  var ALL_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var NAMES = [
    'Снеки',
    'Валера',
    'Маша',
    'Кира',
    'Юля'
  ];


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

  var photoData = [];
  for (var i = 0; i < PICTURES_AMOUNT; i++) {
    photoData.push(getPictureObject(i));
  }

  window.photoData = photoData;
})();
