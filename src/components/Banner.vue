<template>
  <FadeAnimation>
    <section v-if="!isLoading" class="s-banner-hero">
      <div
        class="banner"
        v-for="(banner, index) in banners"
        :class="selectedBanner === index ? 'show' : ''"
        :style="`background-image: url(${banner.src})`"
        :key="index"
      ></div>
      <div class="pagination">
        <nav
          v-for="(page, index) in banners"
          :class="selectedBanner === index ? 'selected' : ''"
          :key="index"
          @click="selectedBanner = index"
        ></nav>
      </div>
    </section>
    <section v-else>
      <SkeletonBanner />
    </section>
  </FadeAnimation>
</template>

<script>
import FadeAnimation from '@/components/animations/FadeAnimation';
import SkeletonBanner from '@/components/skeletons/SkeletonBanner';

export default {
  name: 'Banner',
  components: { FadeAnimation, SkeletonBanner },
  props: {
    isLoading: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      banners: [
        {
          src:
            'https://res.cloudinary.com/dwtl1a1x2/image/upload/v1653956724/alien%20photos/IMG_7433_tt99pz.jpg',
        },
        {
          src:
            'https://res.cloudinary.com/dwtl1a1x2/image/upload/v1653956724/alien%20photos/IMG_6835_hfzlqj.jpg',
        },
      ],
      selectedBanner: 0,
    };
  },
};
</script>

<style lang="scss" scope>
@import '../assets/scss/_colors.scss';
@import '../assets/scss/_variables.scss';

.s-banner-hero {
  position: relative;
  width: 100%;
  height: 768px;

  .banner {
    background-size: cover;
    background-position: 0 0;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    display: none;
    position: relative;
    .shadow {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-image: linear-gradient(transparent, #000);
    }
    &.show {
      animation-name: show;
      animation-fill-mode: forwards;
      animation-duration: 1s;
      display: block;
    }
    .container {
      &.banner-content {
        display: flex;
        align-items: flex-end;
        height: 100%;
        .course-content {
          width: 50%;
          height: 400px;
          margin-bottom: 10vh;
          display: flex;
          align-items: flex-end;
          .text {
            position: relative;
            flex: 1;
            max-width: 488px;
            position: relative;
            z-index: 20;
            h1 {
              margin-top: 2rem;
              margin-bottom: 1.5rem;
              span {
                display: block;
                font-size: 5rem;
                color: transparent;
                -webkit-text-fill-color: transparent;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: #fff;
                font-family: Arial;
                margin-top: 1vh;
              }
            }
            p {
              letter-spacing: -0.005em;
              font-size: 1rem;
              margin-top: 4vh;
              font-family: 'Proxima Nova Regular', Arial;
            }
            .btns {
              display: flex;
              align-items: center;
              justify-content: space-between;
              flex: 1;
              max-width: 344px;
              margin-top: 3.5rem;
              a {
                width: 160px;
                height: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 6px;
                font-size: 1rem;
                font-weight: bold;
                transition: all 0.3s;
                img {
                  margin-right: 0.5rem;
                }
                .icon {
                  margin-right: 0.5rem;
                  // background: url('../assets/img/icon-plus-white.svg') no-repeat center center;
                  width: 9px;
                  height: 9px;
                  transition: background-image 0.3s;
                }
                &:hover {
                  .icon {
                    // background: url('../assets/img/icon-plus-green.svg') no-repeat center center;
                  }
                }
                &:first-child {
                  background-color: #fff;
                  color: $dark-800;
                  &:hover {
                    background-color: $dark-900;
                  }
                }
                &:last-child {
                  border: 1px solid #ffffff;
                  &:hover {
                    border: 1px solid $dark-900;
                  }
                }
              }
            }
          }
        }
        .course-details {
          width: 50%;
          height: 400px;
          margin-bottom: 10vh;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
        }
      }
    }
    .expert {
      position: relative;
      z-index: 12;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .photo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
        img {
          height: auto;
        }
      }
      strong {
        letter-spacing: -0.005em;
        font-weight: 600;
        margin-bottom: 0.25rem;
        display: block;
      }
      span {
        font-size: 0.875rem;
        letter-spacing: -0.005em;
        color: #ffffff;
        opacity: 0.8;
      }
    }
  }
  .pagination {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    nav {
      cursor: pointer;
      width: 10px;
      height: 10px;
      margin: 10px 5px;
      border-radius: 10px;
      background-color: #fff;
      &.selected {
        width: 20px;
      }
    }
  }
  @media (max-width: 1300px) {
    height: 650px;
    .swiper-wrapper {
      height: 640px;
    }
  }
  @media (max-width: 1200px) {
    height: 600px;
    .banner {
      padding-top: 11rem;
    }
  }
  @media (max-width: 600px) {
    display: none;
  }
}
.title:before {
  content: '';
  width: 28px;
  height: 28px;
  position: absolute;
  top: -2px;
  left: -20px;
  z-index: -1;
}
@keyframes show {
  from {
    opacity: 0;
    right: -5%;
  }
  to {
    opacity: 1;
    right: 0%;
  }
}
</style>
