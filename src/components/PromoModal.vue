<template>
  <Modal
    :class="showModal ? 'show-modal' : ''"
    :classes="[
      'promo__wrapper',
      { 'promo__wrapper--landscape': isLandscape && isMobile },
      {
        'promo__wrapper--landscape-common':
          isLandscape && isMobile && !userIsFounder && !userIsLifetime,
      },
    ]"
  >
    <!-- Background main image is set in this banner ref -->
    <div v-show="showModal" class="promo__banner" ref="banner">
      <!-- Discount message and Finclass logo for mobile -->
      <div v-if="isLandscape && isMobile">
        <img class="landscape-banner" :src="modalData.mainImage.landscape" alt="Modal Banner" />
      </div>
      <div class="promo__banner-images-mobile">
        <div v-if="isLandscape">
          <img
            class="landscape-logo"
            :src="modalData.landscapeLogo.src"
            :alt="modalData.landscapeLogo.alt"
          />
        </div>
        <div v-if="userIsFounder" class="promo__banner-images-mobile--discount">
          <h4 class="promo__banner-images-mobile--discount-founders">
            R$ <strong>{{ modalData.founder.discount }}</strong> DE DESCONTO
          </h4>
          <div class="promo__banner-images-mobile--discount-founders-wrapper">
            <h4 class="promo__banner-images-mobile--discount-title">
              PARA FOUNDERS
            </h4>
            <img class="finclass-logo" src="@/assets/img/finclass-header.svg" alt="Finclass Logo" />
          </div>
        </div>
        <div v-else-if="userIsLifetime" class="promo__banner-images-mobile--discount">
          <h4 class="promo__banner-images-mobile--discount-founders">
            R$ <strong>{{ modalData.founder.discount }}</strong> DE DESCONTO
          </h4>
          <div class="promo__banner-images-mobile--discount-founders-wrapper">
            <h4 class="promo__banner-images-mobile--discount-title">
              PARA VITALÍCIOS
            </h4>
            <img class="finclass-logo" src="@/assets/img/finclass-header.svg" alt="Finclass Logo" />
          </div>
        </div>
        <div
          v-else
          class="promo__banner-images-mobile--discount promo__banner-images-mobile--discount-common"
        >
          <h4 class="promo__banner-images-mobile--discount-title">
            {{ modalData.title }}
          </h4>
          <img class="finclass-logo" src="@/assets/img/finclass-header.svg" alt="Finclass Logo" />
        </div>
      </div>

      <button class="close js-close-modal" type="button" @click="toggleModal">
        <img src="@/assets/img/close.svg" alt="Close icon" />
      </button>
    </div>

    <!-- Discount message and Finclass logo for tablet and desktop -->
    <div class="promo__data">
      <h4 v-if="userIsFounder" class="promo__data-title hide-mobile">
        <h4 class="promo__banner-images-mobile--discount-founders">
          R$ <strong>{{ modalData.founder.discount }}</strong> DE DESCONTO
        </h4>
        <div class="promo__banner-images-mobile--discount-founders-wrapper">
          <h4 class="promo__banner-images-mobile--discount-title">
            PARA FOUNDERS
          </h4>
          <img class="finclass-logo" src="@/assets/img/finclass-header.svg" alt="Finclass Logo" />
        </div>
      </h4>
      <h4 v-else-if="userIsLifetime" class="promo__data-title hide-mobile">
        <h4 class="promo__banner-images-mobile--discount-founders">
          R$ <strong>{{ modalData.founder.discount }}</strong> DE DESCONTO
        </h4>
        <div class="promo__banner-images-mobile--discount-founders-wrapper">
          <h4 class="promo__banner-images-mobile--discount-title">
            PARA VITALÍCIOS
          </h4>
          <img class="finclass-logo" src="@/assets/img/finclass-header.svg" alt="Finclass Logo" />
        </div>
      </h4>
      <h4 v-else class="promo__data-title promo__data-title--members hide-mobile">
        {{ modalData.title }}
      </h4>

      <img
        v-if="!userIsFounder && !userIsLifetime && !modalData.subtitle.show"
        class="finclass-logo hide-mobile"
        src="@/assets/img/finclass-header.svg"
        alt="Finclass Logo"
      />
      <h3
        v-else-if="!userIsFounder && !userIsLifetime && modalData.subtitle.show"
        class="promo__data-subtitle promo__data-temporary"
      >
        {{ modalData.subtitle.text }}
      </h3>

      <!-- Description -->
      <h5
        :class="[
          'promo__data-description',
          { 'promo__data-description-founder': userIsFounder || userIsLifetime },
        ]"
      >
        {{ modalData.description }}
      </h5>

      <!-- Price Image (these sections are only displayed if the values exist) -->
      <template v-if="isMobile && modalData.priceImage.mobile" class="promo__data-price-wrapper">
        <div
          v-if="
            (userIsFounder && modalData.founder.priceImage.alt) ||
              (userIsLifetime && modalData.founder.priceImage.alt)
          "
          class="promo__data-price-wrapper"
        >
          <img
            v-if="isLandscape"
            :src="modalData.founder.priceImage.landscape"
            :alt="modalData.founder.priceImage.alt"
            class="promo__data-price"
          />
          <img
            v-else
            :src="modalData.founder.priceImage.mobile"
            :alt="modalData.founder.priceImage.alt"
            class="promo__data-price"
          />
        </div>
        <div v-else class="promo__data-price-wrapper">
          <img
            v-if="isLandscape"
            :src="modalData.priceImage.landscape"
            :alt="modalData.priceImage.alt"
            class="promo__data-price"
          />
          <img
            v-else
            :src="modalData.priceImage.mobile"
            :alt="modalData.priceImage.alt"
            class="promo__data-price"
          />
        </div>
      </template>
      <template v-else-if="modalData.priceImage.mobile">
        <div
          v-if="
            (userIsFounder && modalData.founder.priceImage.alt) ||
              (userIsLifetime && modalData.founder.priceImage.alt)
          "
          class="promo__data-price-wrapper"
        >
          <img
            v-if="modalData.founder.priceImage"
            :src="modalData.founder.priceImage.tablet"
            :alt="modalData.founder.priceImage.alt"
            class="promo__data-price"
          />
        </div>
        <div v-else class="promo__data-price-wrapper">
          <img
            :src="modalData.priceImage.tablet"
            :alt="modalData.priceImage.alt"
            class="promo__data-price"
          />
        </div>
      </template>

      <a
        :href="userIsFounder ? modalData.founder.ctaLink : modalData.ctaLink"
        rel="noopener"
        :target="modalData.ctaTargetBlank ? '_blank' : ''"
        class="btn-primary promo__data-button"
        :style="`background: ${modalData.ctaBgColor}; color: ${modalData.ctaColor};`"
      >
        {{ modalData.ctaLabel }}
      </a>
      <a @click="noShowMore" class="promo__data-link">Não mostrar esta oferta novamente</a>
    </div>
  </Modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Modal from '@/components/Modal';
import { utils } from '@/mixins/utils.js';
import { promoModalInfo } from '@/Utils/selectsValues.js';

export default {
  name: 'PromoModal',
  components: { Modal },
  mixins: [utils],
  data() {
    return {
      isOpen: false,
      modalData: promoModalInfo,
      isMobile: false,
      isLandscape: window.matchMedia('(orientation: landscape)').matches,
    };
  },
  computed: {
    ...mapGetters(['dataUser', 'openLifetimeOffer', 'userIsFounder', 'userIsLifetime']),
    isModalBlocked() {
      const blockDeadline = window.localStorage.getItem(this.modalData.promoId);
      if (blockDeadline) {
        const now = new Date().getTime();

        // the time set to not display the modal is longer than now
        if (blockDeadline >= now) {
          return true;
        } else {
          window.localStorage.removeItem(this.modalData.promoId);
        }
      }

      return false;
    },
    showModal() {
      return this.isOpen && !this.isModalBlocked;
    },
  },
  mounted() {
    this.updateModalImage();
    window.addEventListener('resize', this.updateModalImage);

    const achievements = this.dataUser?.userAchievements;
    const isFounder = achievements?.filter((a) => a.archievementsTitle === 'Founder').length > 0;
    const isLifelong = achievements?.filter((a) => a.archievementsTitle === 'Vitalício').length > 0;
    this.$store.dispatch('setUserIsFounder', isFounder);
    this.$store.dispatch('setUserIsLifetime', isLifelong);

    if (this.isProductionEnvironment()) {
      try {
        if (isFounder) OneSignal.sendTag('founder', 1);
        if (isLifelong) OneSignal.sendTag('lifelong', 1);
      } catch (e) {
        console.error(e);
      }
    }

    if (promoModalInfo.showModal) {
      this.toggleModal();
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateModalImage);
  },
  methods: {
    ...mapActions(['setUserIsLifetime']),
    toggleModal(close = false) {
      if (close) {
        this.isOpen = false;
        return;
      }
      this.isOpen = !this.isOpen;
    },
    updateModalImage() {
      this.isMobile = this.isMobileDevice();
      this.isLandscape = window.matchMedia('(orientation: landscape)').matches;

      const isTablet = this.isTabletDevice();
      const isDesktop = this.isDesktopDevice();
      const banner = this.$refs.banner;

      if (banner) {
        if (this.isMobile && !this.isLandscape && this.modalData.mainImage.mobile) {
          banner.style.backgroundImage = `url(${this.modalData.mainImage.mobile})`;
        } else if (isTablet && this.modalData.mainImage.tablet) {
          banner.style.backgroundImage = `url(${this.modalData.mainImage.tablet})`;
        } else if (isDesktop && this.modalData.mainImage.desktop) {
          banner.style.backgroundImage = `url(${this.modalData.mainImage.desktop})`;
        }
      }
    },
    noShowMore() {
      const SEVEN_DAYS = 60 * 60 * 24 * 7 * 1000;
      const deadline = new Date().setTime(new Date().getTime() + SEVEN_DAYS);
      window.localStorage.setItem(this.modalData.promoId, deadline);

      this.toggleModal();
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/_colors.scss';

.hide-mobile {
  display: none;
}

.promo__wrapper {
  max-width: 320px !important;
  width: 320px !important;
  height: 568px !important;
  padding: unset !important;
  display: flex;
  flex-direction: column;
  background-color: #09090a !important;
  overflow: hidden;
}

.promo__wrapper--landscape {
  max-width: 550px !important;
  width: 550px !important;
  height: 310px !important;
  align-items: flex-end;
  padding: 0 10px 0 178px !important;

  &-common {
    padding: 20px 10px 30px 178px !important;

    .promo__data-description {
      bottom: 20px !important;
    }
  }

  .promo__banner {
    background: none !important;

    .landscape-banner {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 180px;
    }

    .close {
      top: 24px;
      right: 24px;
    }

    &-images-mobile {
      padding-top: 0;

      .landscape-logo {
        width: 140px;
        margin: 20px 0 15px;
      }

      &--discount {
        &-common {
          flex-direction: row;
          margin: -20px 0;

          .finclass-logo {
            width: 70px;
            padding-top: 15px;
          }
        }

        &-title {
          font-size: 1rem;
          margin-right: 10px !important;
        }
      }

      &--discount-founders {
        display: flex;
        margin: 0 0 5px 10px !important;
        font-size: 1.375rem;

        > strong {
          margin-right: 5px;
        }
      }

      &--discount-founders-wrapper {
        margin: 0;
      }
    }
  }

  .promo__data {
    &-description {
      position: absolute;
      max-width: 360px;
      width: 360px;
      right: 10px;
      bottom: 0;
      line-height: 110% !important;
      font-size: 0.875rem !important;
    }

    &-price {
      width: 500px;
      margin: -20px 0 -30px;
    }

    &-button {
      box-shadow: none;
      max-height: 44px;
      max-width: 290px !important;
    }

    &-link {
      display: none;
    }
  }
}

.promo__banner {
  width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top;
  box-shadow: inset 0px 20px 15px -10px #09090a;
  border-radius: 6px 6px 0 0;

  .finclass-logo {
    width: 177px;
    margin: 10px 0 16px;
  }
}

.promo__banner-logo {
  display: none;
}

.promo__banner-images-mobile {
  width: 100%;
  height: 100%;
  padding-top: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.promo__banner-images-mobile--logo {
  width: 132.2px;
  height: 50px;
}

.promo__banner-images-mobile--discount {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    width: 222.33px;
    height: 37px;
  }
}

.promo__banner-images-mobile--discount-founders {
  margin: unset !important;
  text-align: center;
  font-weight: bold;
  font-family: 'Proxima Nova Bold';
  font-size: 1.125rem;
  line-height: 115%;
  color: #f2a900;

  > strong {
    font-family: 'Proxima Nova Bold';
    font-weight: bold;
    font-size: 2rem;
    color: #f2a900;
    text-shadow: 0px 236.869px 217.548px rgba(255, 73, 0, 0.63),
      0px 86.4611px 79.4084px rgba(255, 73, 0, 0.434688),
      0px 41.9753px 38.5513px rgba(255, 73, 0, 0.350463),
      0px 20.5771px 18.8986px rgba(255, 73, 0, 0.279537),
      0px 8.1362px 7.47252px rgba(255, 73, 0, 0.195312);
  }
}

.promo__banner-images-mobile--discount-founders-wrapper {
  display: flex;
  align-items: center;
  margin: 6px 0 20px;

  .finclass-logo {
    width: 102px;
    margin: 0 0 5px 5.5px;
  }
}

.promo__banner-images-mobile--discount-title {
  margin: unset !important;
  text-align: center;
  font-size: 1.125rem;
  font-weight: bold;
  line-height: 130%;
  display: flex;
  justify-content: center;
  font-family: 'Proxima Nova Bold';
  align-items: flex-start;

  > img {
    width: 102.15px;
    height: 17px;
    margin-left: 8px;
  }
}

.promo__data {
  padding: 0 16px 8px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
}

.promo__data-title {
  margin: unset !important;
  text-align: center;
  font-size: 1.125rem;

  > span {
    display: block;
    color: $dark-900;
  }
}

.promo__data-subtitle {
  font-size: 1.125rem;
  text-align: center;
  max-width: 90%;
}

.promo__data-subtitle.promo__data-temporary {
  margin-top: 32px;
}

.promo__data-description {
  max-width: 268px;
  margin: unset !important;
  line-height: 130% !important;
  font-weight: normal !important;
  opacity: 1 !important;
  letter-spacing: 0.02rem !important;
  text-align: center !important;
  font-size: 1.125rem !important;
  font-family: 'Proxima Nova Regular';

  &-founder {
    padding: 0;
  }
}

.promo__data-price {
  width: 234px;
  height: 94.01px;
  border-radius: 10px;
}

.promo__data-button {
  max-width: 97% !important;
  margin: unset !important;
  margin-top: 0px !important;
  font-size: 1rem !important;
  border: unset !important;
  font-weight: bold;
  font-family: 'Proxima Nova Bold';
  box-shadow: 0px 7.10219px 58.4887px rgba(242, 169, 0, 0.474444),
    0px 3.79717px 31.2708px rgba(242, 169, 0, 0.393431);
  border-radius: 6px;
}

.promo__data-link {
  margin-top: 0px;
  font-weight: bold;
  font-size: 0.875rem;
  line-height: 140%;
  cursor: pointer;
  opacity: 1;
  color: $white;
}

@media (min-width: 768px) {
  .hide-mobile {
    display: block;
  }

  .promo__banner-images-mobile--discount-founders-wrapper {
    .finclass-logo {
      width: 102px !important;
      margin: 0 0 0 8px !important;
    }
  }

  .promo__banner-images-mobile--discount-founders {
    text-align: left;

    > strong {
      font-size: 2.5rem;
    }
  }

  .promo__wrapper {
    max-width: 688px !important;
    width: 688px !important;
    height: 481px !important;
    display: flex;
    flex-direction: row;

    .finclass-logo {
      width: 246px;
      align-self: flex-start;
      margin: -10px 0 0;
    }
  }

  .promo__banner {
    width: 295px;
    height: 100%;
    background-repeat: no-repeat;
    background-size: auto;
    background-position: bottom right 10px;
    box-shadow: unset;
    border-radius: 6px 0 0 6px;
  }

  .promo__banner-logo {
    display: block;
    position: absolute;
    left: 72px;
    bottom: 64px;
  }

  .promo__banner-images-mobile {
    display: none;
  }

  .promo__data {
    margin-top: 22px;
    padding: 0 32px 10px;
    gap: 16px;
  }

  .promo__data-title {
    margin-top: 16px !important;
    align-self: flex-start;
  }

  .promo__data-subtitle {
    align-self: flex-start;
    text-align: left;
    max-width: 80%;
  }

  .promo__data-subtitle.promo__data-temporary {
    margin-top: unset;
  }

  .promo__data-title.promo__data-title--members {
    font-weight: bold;
    font-size: 1.375rem;
    line-height: 130%;

    > img {
      width: 222.33px;
      height: 37px;
    }
  }

  .promo__data-description {
    max-width: 303px !important;
    align-self: flex-start;
    text-align: left !important;
    font-size: 1.125rem !important;

    &-founder {
      padding: 0;
      margin: 0 !important;
    }
  }

  .promo__data-price {
    width: 234.06px;
    height: 84px;
    align-self: flex-start;
  }

  .promo__data-price-wrapper {
    margin-right: auto;
  }

  .promo__data-button {
    align-self: flex-start;
    max-width: 277px !important;
    font-size: 1rem !important;
    box-shadow: 0px 7.10219px 58.4887px rgba(242, 169, 0, 0.474444),
      0px 3.79717px 31.2708px rgba(242, 169, 0, 0.393431);
    margin-top: 0px !important;
  }

  .promo__data-link {
    opacity: 0.7;
    margin: 0 40px 0 0 !important;

    &:hover {
      opacity: 1;
    }
  }
}

@media (min-width: 1440px) {
  .promo__wrapper {
    max-width: 840px !important;
    width: 840px !important;
    height: 466px !important;
  }

  .promo__banner {
    width: 380px;
    height: 100%;
    background-position: center;
    z-index: 1;
  }

  .promo__data {
    margin-top: 24px;
    padding: 0 80px 12px 60px;
  }

  .promo__data-title {
    font-family: 'Proxima Nova Bold';
    font-size: 1.5rem !important;
  }

  .promo__data-description {
    max-width: 310px;
    font-size: 1.125rem !important;

    > strong {
      font-size: 1.125rem !important;
    }
  }

  .promo__data-price {
    width: 234.06px;
    height: 84px;
  }

  .promo__data-button {
    max-width: 100% !important;
    margin-top: 0px !important;
  }

  .promo__data-link {
    margin: 0 !important;
  }
}
</style>
