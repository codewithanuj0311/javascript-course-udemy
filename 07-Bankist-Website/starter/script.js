'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const header = document.querySelector('.header');


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//old methods of traversing through nodelist
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach((btn)=> {
  btn.addEventListener('click', openModal);
})



btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Scroll to learn more
btnScrollTo.addEventListener('click', (e)=> {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('x and y scroll', window.scrollX, window.scrollY);
  // console.log('height and width of viewport', 
  // document.documentElement.clientHeight, document.documentElement.clientWidth);

  //scrolling
  // window.scrollTo(
  //   s1coords.left + window.scrollX, 
  //   s1coords.top + window.scrollY);

  // window.scrollTo(
  //   {
  //     left: s1coords.left + window.scrollX,
  //     top: s1coords.top + window.scrollY,
  //     behavior: 'smooth'
  //   }
  // )

  //scrollIntoView function for smooth scrolling
  section1.scrollIntoView({behavior: 'smooth'});


})

//Page Navigation
// document.querySelectorAll('.nav__link').forEach((el)=> {
//   el.addEventListener('click', function(e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior:'smooth'});
//   })
// })

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
})

//Tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');

  //Gaurd clause
  if(!clicked) return;

  //Removing active classes
  tabs.forEach((el)=> {
    el.classList.remove('operations__tab--active')
  });

  tabsContent.forEach((el)=> {
    el.classList.remove('operations__content--active');
  })

  //Activating the tabs and content
  clicked.classList.add('operations__tab--active');
  const dataId = clicked.dataset.tab;  
  document.querySelector(`.operations__content--${dataId}`).classList.add('operations__content--active');

})

  //Menu fading effect
  const handleHover = function(e, opacity) {
    if(e.target.classList.contains('nav__link')) {
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo = link.closest('.nav').querySelector('img');

      siblings.forEach((el)=> {
        if(el !== link) {
          el.style.opacity = this;
        }
      })
      logo.style.opacity = this;
    }
  }

  const nav = document.querySelector('.nav');
  // nav.addEventListener('mouseover', function(e) {
  //   handleHover(e, 0.5);
  // })

  // nav.addEventListener('mouseout', function(e) {
  //   handleHover(e, 1);
  // })

  nav.addEventListener('mouseover', handleHover.bind(0.5));

  nav.addEventListener('mouseout', handleHover.bind(1));

  //Sticky Navigation using the scroll event
  // const initialCoords = section1.getBoundingClientRect();

  // window.addEventListener('scroll', function() {
  //   if(this.window.scrollY > initialCoords.top) {
  //     nav.classList.add('sticky');
  //   } else {
  //     nav.classList.remove('sticky');
  //   }
  // })

  //Sticky Navigation using intersection observer
  // const obsCallback = function(entries, observer) {
    
  // }
  // const obsOptions = {
  //   root: null,
  //   threshold: [0]
  // }
  // const observer = new IntersectionObserver(obsCallback, obsOptions);
  // observer.observe(section1);

  const navHeight = nav.getBoundingClientRect().height;
  const stickyNav = function(entries) {
    const [entry] = entries;
    if(entry.isIntersecting) {
      nav.classList.remove('sticky');
    } else {
      nav.classList.add('sticky');
    }
  }

  const headerObserver = new IntersectionObserver(stickyNav, {root: null, threshold: 0, rootMargin: `-${navHeight}px`});

  headerObserver.observe(header);

  //Revealing elements usingintersection observer
  const revealSection = function(entries, observer) {
    console.log(entries);
    entries.forEach((entry)=> {
      if(!entry.isIntersecting) return; 

      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    })
    
  }
  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
  });

  const allSections = document.querySelectorAll('.section');

  allSections.forEach((section)=> {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
  })


  //Lazy loading images using intersection observer
  const lazyImg = function(entries, observer) {
    entries.forEach((entry)=> {
      if(!entry.isIntersecting) return;
  
      entry.target.src = entry.target.dataset.src;

      entry.target.addEventListener('load', function() { //this load event gets triggered as soon as real image gets changed with lazy img
        entry.target.classList.remove('lazy-img')
      })

      observer.unobserve(entry.target);

    });
  }

  const imgObserver = new IntersectionObserver(lazyImg, {
    root:null,
    threshold: 0,
    rootMargin: '200px'
  });

  const allImages = document.querySelectorAll('img[data-src]');

  allImages.forEach((img)=> {
    imgObserver.observe(img);
  })


  //Slider Component

  const slides = document.querySelectorAll('.slide');
  const maxSlide = slides.length-1;
  let currentSlide = 0;
  const slider = document.querySelector('.slider');

  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotsContainer = document.querySelector('.dots');

  const createDots = function() {
    slides.forEach((_, i)=> {
      dotsContainer.insertAdjacentHTML(`beforeend`, `<button class="dots__dot" data-slide="${i}"></button>`)
    })
  }

  createDots();

  const goToSlide = function(slide) {
    slides.forEach((s, i)=> {
      s.style.transform = `translateX(${100*(i-slide)}%)`;
    })
  }

  goToSlide(0);


  const nextSlide = function () {
    if(currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    changeIndicator(currentSlide)
  }

  const prevSlide = function() {
    if(currentSlide === 0) {
      currentSlide = maxSlide;
    } else (
      currentSlide--
    )
    goToSlide(currentSlide);
    changeIndicator(currentSlide)
  }



  const changeIndicator = function (slide) {
    document.querySelectorAll('.dots__dot').forEach((dot)=> {
      dot.classList.remove('dots__dot--active');
    })

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')    
  }

  changeIndicator(0)




  //moving slides to the right
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function(e) {
    if(e.key === 'ArrowRight') {
      nextSlide();
    } else if(e.key === 'ArrowLeft') {
      prevSlide();
    }
  })

  dotsContainer.addEventListener('click', function(e) {
    if(e.target.classList.contains('dots__dot')) {
      const currentSlide = Number(e.target.dataset.slide);
      goToSlide(currentSlide);
      changeIndicator(currentSlide)
    }
  })










/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////


//selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);
// console.log(document.getElementsByClassName('btn'));

//creating and inseting elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = 'We use cookie based messages for improved functionality and analytics.';
// message.innerHTML = `We use cookie based messages for improved 
//                     functionality and analytics. 
//                     <button class="btn btn--close--cookie">Got it</button>`;

// header.prepend(message);
// header.append(message.cloneNode(true));
// header.append(message);

// const removeCookie = document.querySelector('.btn--close--cookie');
// removeCookie.addEventListener('click', ()=> {
//   message.remove();
// })

//styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// message.style.height = Number.parseInt(getComputedStyle(message).height) + 40 + 'px';

//changing the style of custom css properties
// document.documentElement.style.setProperty('--color-primary', 'orangered');

//attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Decimal Technologies');

//mouseeneter event
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', ()=> {
//   alert('Hellow Javascript');
// })

//event bubbling
// const randomInt = function(max, min) {
//   return Math.floor(Math.random()*(max-min+1)+min);
// }
// const randomColor = () => `rgb(${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`;

// document.querySelector('.nav__link').addEventListener('click', function(e) {
//   e.stopPropagation();
//   this.style.backgroundColor = randomColor();
// })

// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
// })

// document.querySelector('.nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
// })

//Dom traversing
// const h1 = document.querySelector('h1');

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.children);
// console.log(h1.parentElement);
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);