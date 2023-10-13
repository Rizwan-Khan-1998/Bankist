'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header  = document.querySelector('.header')
const btnToScroll = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1');


//selecting elements for tabbed component
const tabs = document.querySelectorAll('.operations__tab')
const tabContainer =  document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

const message = document.createElement('div')

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



message.classList.add('cookie-message')
message.innerHTML = 'Cookies helps us for better functionalty and analytics. <button class="btn btn--close-cookie">Got it</button>'
header.prepend(message)

message.querySelector('button').addEventListener('click', () => {
  message.remove()
})


/// scroll button to features section

btnToScroll.addEventListener('click', (e) => {
 section1.scrollIntoView(
  {
    behavior: 'smooth',
  }
 )
})




// navigation scrolling feature

const navLinks = document.querySelector('.nav__links');

navLinks.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav__link') && !e.target.classList.contains('btn--show-modal')) {
    e.preventDefault();
    document.querySelector(e.target.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  }
});


// Tabbed  Component




tabContainer.addEventListener('click', (e)=> {
  const clicked = e.target.closest('.operations__tab')

  if(!clicked) return;

  // removing active classes
  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active')
  })

  tabsContent.forEach(content => {
    content.classList.remove('operations__content--active')
  });


  //adding active classes

  clicked.classList.add('operations__tab--active')
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})



// fade effect on nav bar


function handleHover(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
}
}

const nav = document.querySelector('.nav')
nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1)) 



/// making some animations effect on scrooling using intersectionObserver

const sectionTitle = document.querySelectorAll(".section")

const observerForAnimatinSection = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
    }else {
      entry.target.classList.remove("visible");
    }
  }
  
  )
  
}, {
  root: null,
  threshold: 0.1
})

sectionTitle.forEach(sec => {
  observerForAnimatinSection.observe(sec)
})



const lazyImages = document.querySelectorAll('img[data-src]');
const observerForLazyLoading = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src; // Changed entry.dataset.src to entry.target.dataset.src
      entry.target.addEventListener('load',()=> {
        entry.target.classList.remove('lazy-img')})
      observer.unobserve(entry.target)
    }
  });
}, { root: null, threshold: 1.0 });

lazyImages.forEach(img => {
  observerForLazyLoading.observe(img);
});

// slider


const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();