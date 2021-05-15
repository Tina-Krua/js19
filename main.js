/* eslint-disable no-unused-vars */
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */

function createCarousel(slidesCount = 5) {
  let carousel = document.querySelector('#carousel');

  carousel.classList.add('carousel');

  let styleItems = '';
  let style = document.createElement('style');

  for (let i = 1; i <= slidesCount; i++) {
    styleItems += `.slides__item:nth-child(${i}) {background-image: url('assets/img/${i}.jpg');} `;
  }

  style.innerHTML = styleItems;
  document.querySelector('head').appendChild(style);

  let outSlides = document.createElement('ul');

  outSlides.classList.add('slides');

  for (let i = 0; i < slidesCount; i++) {
    let slideElement = document.createElement('li');
    let slideLink = '<a href="#"></a>';
    slideElement.innerHTML = slideLink;
    slideElement.classList.add('slides__item');
    outSlides.appendChild(slideElement);
  }

  carousel.appendChild(outSlides);

  let slides = document.querySelectorAll('.slides__item');

  slides[0].classList.add('active');

  let outIndicators = document.createElement('div');

  outIndicators.classList.add('indicators');

  for (let i = 0; i < slidesCount; i++) {
    let indicatorElement = document.createElement('span');
    indicatorElement.classList.add('indicators__item');
    indicatorElement.setAttribute('data-slide-to', i);
    outIndicators.appendChild(indicatorElement);
  }

  carousel.appendChild(outIndicators);

  let indicatorsItems = document.querySelectorAll('.indicators__item');

  indicatorsItems[0].classList.add('active');

  let outControls = document.createElement('div');

  outControls.classList.add('controls');

  for (let i = 0; i < 3; i++) {
    let controlElement = document.createElement('div');
    let iconElement = document.createElement('i');
    iconElement.classList.add('fas');
    controlElement.appendChild(iconElement);
    controlElement.classList.add('controls__item');
    outControls.appendChild(controlElement);
  }

  carousel.appendChild(outControls);

  let controlItems = document.querySelectorAll('.controls__item');

  controlItems[0].classList.add('controls__prev');
  controlItems[1].classList.add('controls__next');
  controlItems[2].classList.add('controls__pause');

  let iconItems = document.querySelectorAll('.fas');

  iconItems[0].classList.add('fa-chevron-left');
  iconItems[1].classList.add('fa-chevron-right');
  iconItems[2].classList.add('fa-play');

  iconItems[0].setAttribute('id', 'previous');
  iconItems[1].setAttribute('id', 'next');
  iconItems[2].setAttribute('id', 'pause');

  let currentSlide = 0;
  let slideInterval = setInterval(nextSlide, 2500);

  let isPlaying = true;
  let pauseButton = document.querySelector('#pause');
  let next = document.querySelector('#next');
  let previous = document.querySelector('#previous');

  let indicators = document.querySelector('.indicators');

  style.innerHTML += `
  .slides { 
    position: relative;
  }`;

  style.innerHTML += `
  .controls { 
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    color: #b9bfc4;
    top: -40px;
  }`;

  style.innerHTML += `
  .indicators { 
    display: flex; 
    justify-content: center;
  }`;

  style.innerHTML += `
  .indicators__item {
    width: 40px;
    height: 5px;
    border: 1px solid #b9bfc4;
    border-radius: 5px;
    margin-right: 35px;
    cursor: pointer;
    transition: 0.5s;
    box-shadow: 1px 1px 2px #cccccc;
  }`;

  indicatorsItems[0].style.backgroundColor = 'red';

  function goToSlide(n) {
    slides[currentSlide].classList.toggle('active');
    indicatorsItems[currentSlide].classList.toggle('active');
    indicatorsItems[currentSlide].removeAttribute('style');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.toggle('active');
    indicatorsItems[currentSlide].classList.toggle('active');
    indicatorsItems[currentSlide].style.backgroundColor = 'red';
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function previousSlide() {
    goToSlide(currentSlide - 1);
  }

  pauseButton.addEventListener('click', () => {
    if (isPlaying) pauseSlideShow();
    else playSlideShow();
  });

  function pauseSlideShow() {
    pauseButton.className = 'fas fa-pause';
    isPlaying = false;
    clearInterval(slideInterval);
  }

  function playSlideShow() {
    pauseButton.className = 'fas fa-play';
    isPlaying = true;
    slideInterval = setInterval(nextSlide, 2500);
  }

  next.addEventListener('click', () => {
    pauseSlideShow();
    nextSlide();
  });

  previous.addEventListener('click', () => {
    pauseSlideShow();
    previousSlide();
  });

  indicators.addEventListener('click', eventIndicators);

  function eventIndicators(event) {

    let target = event.target;

    if (target.classList.contains('indicators__item')) {
      pauseSlideShow();
      goToSlide(+target.getAttribute('data-slide-to'));
    }
  }
}

createCarousel(4);