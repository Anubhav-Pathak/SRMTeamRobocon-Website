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