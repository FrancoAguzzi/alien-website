<template>
  <section :class="['s-banner-mobile', { 'distance-from-top': showTopBarWarning }]">
    <swiper :slides-per-view="1" :space-between="50" :options="swiperOption">
      <swiper-slide
        v-for="(banner, index) in banners"
        :key="index"
        v-bind:style="{ 'background-image': 'url(' + banner.bannerSource + ')' }"
      >
        <div class="container-mobile">
          <div class="text">
            <live-badge :show-badge="getBannerType(banner) === 'finsessions' && banner.liveNow" />
            <h4>{{ banner.expertName }}</h4>
            <h1>
              <img :src="banner.bannerTitleSVG" alt="" />
            </h1>
            <div class="btns-mobile">
              <router-link :to="urlToRedirect(banner)" class="">
                <!-- <img src="@/assets/img/icon-play.svg" alt="" /> -->
                assistir
              </router-link>
              <router-link
                v-if="getBannerType(banner) !== 'finsessions'"
                :to="urlToRedirect(banner, true)"
              >
                <div class="icon"></div>
                detalhes
              </router-link>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination"></div>
    </swiper>
  </section>
</template>

<script>
import http from '@/http';
import { logoutUserMix } from '@/mixins';
import { utils } from '@/mixins/utils.js';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/swiper-bundle.css';
import { mapGetters } from 'vuex';

export default {
  name: 'Banner',
  components: { Swiper, SwiperSlide },
  mixins: [logoutUserMix, utils],
  data() {
    return {
      banners: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
        },
      },
    };
  },
  created() {
    http
      .get('/settings/getBanners')
      .then((response) => {
        this.banners = response.data.data;
      })
      .catch((err) => {
        this.handleGeneralException();
      });
  },
  computed: {
    ...mapGetters(['showTopBarWarning']),
  },
  methods: {
    lastWordSpan(word) {
      const wordSplit = word.split(' ');
      return wordSplit[wordSplit.length - 1];
    },
    removeLastWord(word) {
      return word.replace(/\w+[.!?]?$/, '');
    },
    urlToRedirect(banner, isDetailsPage = false) {
      const courseId = this.getBannerCourseId(banner);

      const url = {
        finclass: isDetailsPage
          ? `/expert-details/${courseId}`
          : `/watch/finclasses/${courseId}/${banner.bannerButtonPrimary.split(':')[1]}`,
        finclasses: isDetailsPage
          ? `/expert-details/${courseId}`
          : `/watch/finclasses/${courseId}/${banner.bannerButtonPrimary.split(':')[1]}`,
        finbooks: `${isDetailsPage ? '/chapter' : '/watch'}/finbooks/${courseId}`,
        findocs: `${isDetailsPage ? '/chapter' : '/watch'}/finseries/${courseId}`, // TODO: update along with backend
        finsessions: `/finsessions/${courseId}`,
      };
      return url[this.getBannerType(banner)];
    },
  },
};
</script>

<style lang="scss" scope>
@import '../assets/scss/_colors.scss';
@import '../assets/scss/_variables.scss';

.s-banner-mobile {
  display: none;
  position: relative;
  width: 100%;

  .swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
  }
  .swiper-slide {
    position: relative;
    padding-top: 14.1875rem;
    width: 100%;
    height: 320px;
    background-size: 100% 100%;
    &:after {
      content: '';
      width: 100%;
      height: 100%;
      // background: url('../assets/img/overlay-banner-hero.png') no-repeat center center;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      pointer-events: none;
      background-size: cover;
    }
    .container-mobile {
      display: flex;
      justify-content: center;
      width: 100%;
      position: absolute;
      bottom: 0;
      .text {
        position: relative;
        flex: 1;
        z-index: 20;
        width: 100%;
        h1 {
          display: block;
          text-align: center;
          font-size: 1.4rem;
          line-height: 140%;
          img {
            width: 50%;
            margin: 0 auto 2vh auto;
          }
          span {
            display: block;
            text-align: center;
            color: transparent;
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: #fff;
            font-family: Arial;
            font-size: 2rem;
          }
        }
        p {
          letter-spacing: -0.005em;
        }
        .btns-mobile {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          a {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
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
                color: $dark-900;
                border: 1px solid $dark-900;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 1300px) {
  }
  @media (max-width: 1200px) {
    .swiper-slide {
      padding-top: 11rem;
    }
  }
  @media (max-width: 600px) {
    display: block;
    .swiper-wrapper {
      height: auto;
    }
    .swiper-slide {
      padding-top: 9rem;
      background-size: cover !important;
      background-position-x: 35% !important;
      .expert {
        display: none;
      }
      .text {
        .btns-mobile {
          margin-top: 0.5rem;
          a {
            width: 35vw;
            margin: 0.5vh 0.5vh;
            padding: 1vh 0;
          }
        }
      }
    }
  }
  @media (max-width: 450px) {
    height: auto;
    .swiper-slide {
      .text {
        h4 {
          text-align: center;
          font-size: 1rem;
        }
        h1 {
          margin-top: 3vw;
          font-size: 2.3rem;
          text-align: center;
          span {
            font-size: 1.7rem;
          }
        }
        .btns-mobile {
          a {
            width: 35vw;
            margin: 1vh 1vh;
            padding: 1vh 0;
          }
        }
      }
    }
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
</style>
