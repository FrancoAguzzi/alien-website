<template>
  <div class="carrousel-content-finclass">
    <div class="swiper-container swiper-wrapper" :class="`${prefix}-highContentSwiper`">
      <div class="swiper-wrapper">
        <slot></slot>
      </div>
    </div>
    <button class="btn-slide btn-prev" :class="`${prefix}-high-content-prev`">
      <img src="@/assets/img/arrow-slide-white.svg" alt="" />
    </button>
    <button class="btn-slide btn-next" :class="`${prefix}-high-content-next`">
      <img src="@/assets/img/arrow-slide-white.svg" alt="" />
    </button>
  </div>
</template>
<script>
import { swiperNavigation } from '@/libs/swiper';

export default {
  props: ['prefix', 'slidesPerView'],
  mounted() {
    swiperNavigation(
      `${this.prefix}-highContentSwiper`,
      this.slidesPerView,
      `${this.prefix}-highContentPagination`,
      `${this.prefix}-high-content-prev`,
      `${this.prefix}-high-content-next`
    );
  },
};
</script>
<style lang="scss">
@import '../assets/scss/_colors.scss';

.carrousel-content-finclass {
  position: relative;
  border-radius: 6px;

  &:hover {
    .btn-slide {
      opacity: 1;
    }
  }

  .btn-slide {
    position: absolute;
    top: 0;
    width: 4.8rem;
    height: 100%;
    background: linear-gradient(to right, rgb(11, 11, 14), transparent);
    z-index: 2;
    opacity: 0;
    transition: opacity 0.3s;

    &.swiper-button-disabled {
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s;
    }

    &.btn-prev {
      left: 0;
      img {
        transform: rotate(180deg);
      }
    }

    &.btn-next {
      right: 0;
      background: linear-gradient(266.88deg, rgb(0, 0, 0) 2.46%, rgba(0, 0, 0, 0) 102.12%);
    }

    @media (max-width: 450px) {
      display: none;
    }
  }
}
</style>
