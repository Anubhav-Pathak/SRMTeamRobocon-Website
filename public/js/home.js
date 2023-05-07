import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'

const swiper = new Swiper('.swiper-sponsor', {
  loop: true,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    280: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 40
    }
  }
});

const swiperSponsor = new Swiper('.swiper-project', {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

// Lazy loading

const targets = document.querySelectorAll('#images img');

targets.forEach(image => {
  image.addEventListener('load', function () {
    image.style.height = 'auto';
    console.log(image);
  })
})

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1
}

const lazyLoad = target => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      console.log('entry');

      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-lazy');

        img.setAttribute('src', src);
        img.classList.add('load');

        observer.disconnect();
      }
    });
  }, options);

  io.observe(target)
};

targets.forEach(lazyLoad);




// Stat Count

window.addEventListener('load', function () {
  var members_count = document.getElementById("members_count");
  var participations_count = document.getElementById("participations_count");
  var robots_count = document.getElementById("robots_count");
  var alumini_count = document.getElementById("alumini_count");

  function count_intersection_animation(element, x, t) {

    function increase(element = {}, x) {
      let counts = setInterval(updated, t);
      let upto = 0;

      function updated() {
        element.innerHTML = ++upto + "+";
        if (upto === x) {
          clearInterval(counts);
        }
      }
    }


    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          increase(element, x);
        }
      })
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1
    }
    const myObserver = new IntersectionObserver(callback, options)
    myObserver.observe(element)
  }

  count_intersection_animation(members_count, 65, 1000 / 65)
  count_intersection_animation(participations_count, 6, 1000 / 6)
  count_intersection_animation(robots_count, 20, 1000 / 20)
  count_intersection_animation(alumini_count, 100, 1000 / 100)

})
