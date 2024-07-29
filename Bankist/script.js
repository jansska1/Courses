'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const section1 = document.getElementById('section--1');
const lazyImages = document.querySelectorAll('img[data-src]');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button scrolling
btnScrollTo.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect();

  section1.scrollIntoView();
});
// Page navigation

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView();
  }
});

// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Active content area
  tabsContent.forEach(tab =>
    tab.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
function handleHover(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation
function stickyNav(entries) {
  entries.forEach(entry => {
    !entry.isIntersecting
      ? nav.classList.add('sticky')
      : nav.classList.remove('sticky');
  });
}
const headerObs = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});
headerObs.observe(header);

// Reveal sections
function revealSection(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
}
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.12,
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// Lazy loading images
function loadImg(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    // entry.target.setAttribute('src', `${entry.target.dataset.src}`);
    entry.target.addEventListener('load', () =>
      entry.target.classList.remove('lazy-img')
    );
    observer.unobserve(entry.target);
  });
}
const lazyImgObs = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

lazyImages.forEach(section => {
  lazyImgObs.observe(section);
});

// Slider
function slider() {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let currSlide = 0;
  const maxSlide = slides.length;

  // Next slide
  function createDots() {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }

  function activateDot(slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }

  function goToSlide(currSlide) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - currSlide)}%)`;
    });
    activateDot(currSlide);
  }
  // curSlide = 1: -100%, 0%, 100%, 200%

  function nextSlide() {
    currSlide = (currSlide + 1) % maxSlide;
    goToSlide(currSlide);
  }

  function prevSlide() {
    currSlide = (currSlide + maxSlide - 1) % maxSlide;
    goToSlide(currSlide);
  }

  const startTop = function () {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  };

  const init = function () {
    startTop();
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', e => {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      currSlide = +e.target.dataset.slide;
      goToSlide(currSlide);
    }
  });
}
slider();
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

