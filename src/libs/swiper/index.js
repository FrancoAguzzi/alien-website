import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

export const swiperPagination = () => {
  new Swiper('swiper-container', {
    effect: 'fade',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
  });
};

export const swiperNavigation = (
  swiperClass,
  slidesPerView,
  paginationElement,
  previousBtn,
  nextBtn
) => {
  new Swiper(`.${swiperClass}`, {
    slidesPerView: slidesPerView?.base || 4,
    spaceBetween: 24,
    grabCursor: true,
    speed: 600,
    observer: !0,
    observeParents: !0,
    breakpoints: {
      320: {
        slidesPerView: slidesPerView?.['320'] || 1.6,
        spaceBetween: 15,
      },
      375: {
        slidesPerView: slidesPerView?.['375'] || 1.9,
        spaceBetween: 15,
      },
      600: {
        slidesPerView: slidesPerView?.['600'] || 2.4,
        spaceBetween: 15,
      },
      991: {
        slidesPerView: slidesPerView?.['991'] || 3.2,
      },
      1190: {
        slidesPerView: slidesPerView?.['1190'] || 3.5,
      },
      1210: {
        slidesPerView: slidesPerView?.['1210'] || 4,
        spaceBetween: 24,
      },
    },
    pagination: {
      el: paginationElement,
      clickable: true,
    },
    navigation: {
      nextEl: `.${nextBtn}`,
      prevEl: `.${previousBtn}`,
    },
  });
};
