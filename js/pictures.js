/* eslint-disable no-unused-vars,semi */

var ALL_COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCRIPTIONS = ['Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];

var COMMENTS_HTML = '<li class="social__comment">' +
  '<img class="social__picture" src="img/avatar-{{a}}.svg" alt="Аватар комментатора фотографии" width="35" height="35">' +
  '<p class="social__text">{{b}}</p>' +
  '</li>';

var pictures = [];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (var i = 0; i < 25; i++) {

  var picture = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomInt(15, 200),
    comments: [ALL_COMMENTS[getRandomInt(0, ALL_COMMENTS.length - 1)], ALL_COMMENTS[getRandomInt(0, ALL_COMMENTS.length - 1)]],
    description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)]
  }

  pictures[i] = picture;
}

// obtain picture template
var fragment = document.getElementById('picture').content;

// find initial position
var sectionPictures = document.getElementsByClassName('pictures').item(0);
var sectionPictureUpload = sectionPictures.getElementsByClassName('img-upload').item(0);

// generate pictures
for (var j = 0; j < pictures.length; j++) {

  // create instance
  var instance = fragment.cloneNode(true);
  var img = instance.querySelector('img');
  img.setAttribute('src', pictures[j].url);
  img.setAttribute('alt', pictures[j].description);

  var spanComments = instance.querySelector('.picture__comments');
  spanComments.innerHTML = pictures[j].comments.length;

  var spanLikes = instance.querySelector('.picture__likes');
  spanLikes.innerHTML = pictures[j].likes;

  sectionPictures.insertBefore(instance, sectionPictureUpload);
}

// open big picture
var bigPicture = document.querySelector('.big-picture');
var firstPicture = pictures[0];
bigPicture.classList.remove('hidden');

bigPicture.querySelector('.big-picture__img').setAttribute('src', firstPicture.url);
bigPicture.querySelector('.likes-count').innerText = firstPicture.likes;
bigPicture.querySelector('.comments-count').innerText = firstPicture.comments.length;
bigPicture.querySelector('.social__caption').innerText = firstPicture.description;

bigPicture.querySelector('.social__comments').innerHTML
  = COMMENTS_HTML.replace('{{a}}', getRandomInt(1, 6)).replace('{{b}}', firstPicture.comments[0])
  + COMMENTS_HTML.replace('{{a}}', getRandomInt(1, 6)).replace('{{b}}', firstPicture.comments[1]);

// hide blocks
bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');


