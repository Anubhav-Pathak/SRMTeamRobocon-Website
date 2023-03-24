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
  loop: true,
  autoplay: {
      delay: 5000,
  },
  slidesPerView: 1,
});

const targets = document.querySelectorAll('#images img');

const options = {
  root: document.querySelector('[data-scroll-root]'),
  rootMargin: "500px",
  threshold: 0
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

        // observer.disconnect();
      }
    });
  }, options);

  io.observe(target)
};

targets.forEach(lazyLoad); 