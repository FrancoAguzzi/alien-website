<template>
  <Modal
    v-if="showModal"
    :class="showModal ? 'show-modal' : ''"
    :classes="['promo__wrapper', { 'promo__wrapper--landscape': isLandscape && isMobile }]"
  >
    <!-- Background main image is set in this banner ref -->
    <div
      :class="['promo__banner', { 'promo__banner--longImage': promoModalInfo.isLongImage }]"
      ref="banner"
    >
      <div v-if="isLandscape && isMobile">
        <img
          class="landscape-banner"
          :src="currentSetting.mainImage.landscape"
          alt="Modal Banner"
        />
      </div>

      <button class="close js-close-modal" type="button" @click="toggleModal">
        <!-- <img src="@/assets/img/close.svg" alt="Close icon" /> -->
      </button>
    </div>

    <!-- Fully modal content -->
    <div
      :class="['promo__data', { 'promo__data--minified': promoModalInfo.isLongImage }]"
      :style="{ backgroundColor: promoModalInfo.modalBgColor }"
    >
      <h2
        v-if="currentSetting.title.text"
        class="promo__data-title"
        :style="{
          color: currentSetting.title.baseColor,
          fontFamily: currentSetting.title.fontFamily,
        }"
      >
        {{ highlightedStr().start }}
        <strong :style="`color: currentSetting.title.highlightColor};`">
          {{ highlightedStr().middle }}
        </strong>
        {{ highlightedStr().end }}
      </h2>

      <h6
        v-if="currentSetting.subtitle.text"
        class="promo__data-subtitle"
        :style="{
          color: currentSetting.subtitle.color,
          fontFamily: currentSetting.subtitle.fontFamily,
        }"
      >
        {{ highlightedStr(currentSetting.subtitle.text).start }}
        <strong :style="{ color: currentSetting.subtitle.highlightColor }">
          {{ highlightedStr(currentSetting.subtitle.text).middle }}
        </strong>
        {{ highlightedStr(currentSetting.subtitle.text).end }}
      </h6>

      <p
        v-if="currentSetting.description.text"
        v-html="currentSetting.description.text"
        class="promo__data-description"
        :style="{ color: currentSetting.description.color }"
      ></p>

      <a
        :href="currentSetting.cta.link"
        :target="currentSetting.cta.hasTargetBlank ? '_blank' : ''"
        rel="noopener"
        class="btn-primary promo__data-button"
        :style="{
          backgroundColor: currentSetting.cta.backgroundColor,
          color: currentSetting.cta.textColor,
        }"
      >
        {{ currentSetting.cta.label }}
      </a>

      <a
        @click="noShowMore"
        class="promo__data-noShowMore"
        :style="{ color: promoModalInfo.noShowMoreColor }"
        >Não mostrar esta oferta novamente</a
      >
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal';
import { utils } from '@/mixins/utils.js';
import { mapActions, mapGetters } from 'vuex';
import { dynamicPromoModalInfo } from '@/Utils/selectsValues.js';

export default {
  name: 'DynamicPromoModal',
  components: { Modal },
  mixins: [utils],
  data() {
    return {
      isOpen: false,
      isMobile: false,
      isLandscape: window.matchMedia('(orientation: landscape)').matches,
    };
  },
  computed: {
    ...mapGetters(['dataUser', 'userIsFounder', 'userIsLifetime', 'currentSignature']),
    promoModalInfo() {
      const { modalBgColor, isLongImage, noShowMoreColor } = dynamicPromoModalInfo;
      return { modalBgColor, isLongImage, noShowMoreColor };
    },
    currentSetting() {
      if (this.userIsLifetime) {
        return dynamicPromoModalInfo.lifetime;
      } else if (this.userIsFounder) {
        return dynamicPromoModalInfo.founder;
      } else {
        return dynamicPromoModalInfo.member;
      }
    },
    isModalBlocked() {
      const blockDeadline = window.localStorage.getItem(dynamicPromoModalInfo.promoId);
      if (blockDeadline) {
        const now = new Date().getTime();

        // the time set to not display the modal is longer than now
        if (blockDeadline >= now) {
          return true;
        } else {
          window.localStorage.removeItem(dynamicPromoModalInfo.promoId);
        }
      }

      return false;
    },
    showModal() {
      const showLifetime =
        dynamicPromoModalInfo.isActive &&
        this.isOpen &&
        !this.isModalBlocked &&
        !this.userIsLifetime;

      if (dynamicPromoModalInfo.isLifetimeModal) {
        return showLifetime && !this.cantSignLifetimeOffers();
      }
      return showLifetime;
    },
  },
  created() {
    const achievements = this.dataUser?.userAchievements;
    const isFounder = achievements?.filter((a) => a.archievementsTitle === 'Founder').length > 0;
    const isLifelong = achievements?.filter((a) => a.archievementsTitle === 'Vitalício').length > 0;
    this.setUserIsFounder(isFounder);
    this.setUserIsLifetime(isLifelong);

    if (dynamicPromoModalInfo.isActive) {
      this.toggleModal();
    }
  },
  mounted() {
    this.updateModalImage();
    window.addEventListener('resize', this.updateModalImage);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateModalImage);
  },
  methods: {
    ...mapActions(['setUserIsFounder', 'setUserIsLifetime']),
    highlightedStr(str = this.currentSetting.title.text) {
      const startIndex = str.indexOf('[');
      const endIndex = str.indexOf(']');

      const start = str.substring(0, startIndex);
      const middle = str.substring(startIndex + 1, endIndex); // to remove brackets
      const end = str.substring(endIndex + 1);

      return { start, middle, end };
    },
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
    updateModalImage() {
      this.isMobile = this.isMobileDevice();
      this.isLandscape = window.matchMedia('(orientation: landscape)').matches;

      const isTablet = this.isTabletDevice();
      const isDesktop = this.isDesktopDevice();
      const banner = this.$refs.banner;

      if (banner) {
        if (this.isMobile && !this.isLandscape && this.currentSetting.mainImage.mobile) {
          banner.style.backgroundImage = `url(${this.currentSetting.mainImage.mobile})`;
        } else if (isTablet && this.currentSetting.mainImage.tablet) {
          banner.style.backgroundImage = `url(${this.currentSetting.mainImage.tablet})`;
        } else if (isDesktop && this.currentSetting.mainImage.desktop) {
          banner.style.backgroundImage = `url(${this.currentSetting.mainImage.desktop})`;
        }
      }
    },
    noShowMore() {
      const SEVEN_DAYS = 60 * 60 * 24 * 7 * 1000;
      const deadline = new Date().setTime(new Date().getTime() + SEVEN_DAYS);
      window.localStorage.setItem(dynamicPromoModalInfo.promoId, deadline);

      this.toggleModal();
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/_colors.scss';

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

.promo__banner {
  width: 100%;
  height: 115px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top;
  border-radius: 6px 6px 0 0;

  &--longImage {
    height: 263px !important;
  }
}

.promo__data {
  padding: 26px 24px 24px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 16px;

  ul {
    margin: 0 !important;

    li {
      margin: 0 !important;
      padding: 0 !important;
      border: none !important;
      align-items: center !important;
      text-align: center !important;
      display: block !important;

      &:before {
        background: $white !important;
      }
    }
  }

  &-title {
    width: 100%;
    font-size: 1.375rem;
    text-align: center;
    letter-spacing: 0.01em;
    line-height: 120%;
    font-weight: 700;
    padding: 0 25px;
    color: $gray-20;
  }

  &-subtitle {
    margin: 0 15px 0 !important;
    font-size: 1.125rem;
    text-align: center;
    line-height: 130%;
    font-weight: 400;
    color: $white;
  }

  &-description {
    margin: 0 10px !important;
    line-height: 130% !important;
    font-weight: normal !important;
    opacity: 1 !important;
    letter-spacing: 0.02rem !important;
    text-align: center !important;
    font-size: 1.125rem !important;
    font-family: 'Proxima Nova Regular';
  }

  &-button {
    max-width: 97% !important;
    margin: unset !important;
    font-size: 1rem !important;
    border: unset !important;
    font-weight: bold;
    font-family: 'Proxima Nova Bold';
    border-radius: 6px;
  }

  &-noShowMore {
    margin-top: 0px;
    font-weight: bold;
    font-size: 0.875rem;
    line-height: 140%;
    cursor: pointer;
    opacity: 1;
    color: $white;
  }

  &--minified {
    padding: 20px 24px 16px;

    .promo__data-title {
      padding: 0 5px;
      font-size: 1.125rem;
    }

    .promo__data-subtitle {
      font-size: 1rem;
      margin: 0 !important;
    }

    .promo__data-button {
      margin-top: 0 !important;
      font-size: 1.25rem !important;
    }
  }
}

.promo__wrapper--landscape {
  max-width: 550px !important;
  width: 550px !important;
  height: 310px !important;
  padding: 0 0 0 178px !important;

  .promo__banner {
    height: auto !important;
    width: auto !important;

    .landscape-banner {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
    }

    .close {
      top: 24px;
      right: 24px;
    }
  }

  .promo__data {
    gap: 8px;
    padding: 0 40px !important;

    &-title {
      margin-top: 16px;
      font-size: 1.375rem;
      text-align: center;
    }

    &-subtitle {
      font-size: 0.875rem;
    }

    &-description {
      font-size: 0.875rem !important;
    }

    &-button {
      height: 40px !important;
      max-width: 100% !important;
      margin-bottom: 16px !important;
    }

    &-noShowMore {
      display: none;
    }
  }
}

@media (min-width: 768px) and (min-height: 391px) {
  .promo__wrapper {
    max-width: 688px !important;
    width: 688px !important;
    height: 508px !important;
    display: flex;
    flex-direction: row;
  }

  .promo__banner {
    width: 295px;
    height: 100%;
    background-repeat: no-repeat;
    background-size: auto;
    background-position: bottom right 10px;
    border-radius: 6px 0 0 6px;

    &--longImage {
      background-position: center;
      height: 100% !important;
    }
  }

  .promo__data {
    padding: 0 30px 10px 42px !important;

    ul {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      li {
        text-align: left !important;
        margin: 4px 0 !important;
        justify-content: center;
        display: flex !important;
      }
    }

    &-title {
      margin-top: 64px !important;
      font-size: 1.875rem;
      align-self: flex-start;
      text-align: left;
      padding: 0 !important;
    }

    &-subtitle {
      font-size: 1.25rem;
      align-self: flex-start;
      text-align: left;
      margin: 0 !important;
    }

    &-description {
      font-size: 1.25rem !important;
      align-self: flex-start;
      text-align: left !important;
      margin: 0 !important;
    }

    &-button {
      max-width: 277px !important;
      font-size: 1rem !important;
      align-self: flex-start;
    }

    &-noShowMore {
      opacity: 0.7;
      align-self: flex-start;

      &:hover {
        opacity: 1;
      }
    }

    &--minified {
      justify-content: center;
      margin-top: 0;
      gap: 12px;

      .promo__data-title {
        margin-top: 32px !important;
        font-size: 1.5rem;
        max-width: 100%;
      }

      .promo__data-button {
        font-size: 1.25rem !important;
      }
    }
  }
}

@media (min-width: 1440px) and (min-height: 391px) {
  .promo__wrapper {
    max-width: 840px !important;
    width: 840px !important;
    height: 504px !important;
  }

  .promo__banner {
    width: 380px;
    background-position: center;
    z-index: 1;
  }

  .promo__data {
    padding: 0 62px 12px 40px !important;

    &-title {
      width: 85%;
      font-family: 'Proxima Nova Bold';
      font-size: 1.875rem !important;
    }

    &-description {
      max-width: 310px;
      font-size: 1.125rem !important;
    }

    &-button {
      max-width: 277px !important;
    }

    &--minified {
      .promo__data-title {
        font-size: 1.5rem !important;
        margin: 0;
        width: 80%;
      }
    }
  }
}
</style>
