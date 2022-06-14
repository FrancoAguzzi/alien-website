<template>
  <router-view :key="$route.path" v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script>
import { logoutUserMix } from '@/mixins';
import { utils } from '@/mixins/utils.js';

export default {
  name: 'App',
  mixins: [utils, logoutUserMix],
  created() {
    if (this.tokenIsInvalid()) {
      this.logoutUser();
    }
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/fonts.scss';
@import '@/assets/scss/colors.scss';

body {
  margin: 0;
  font-family: 'Proxima Nova Bold';
  color: $dark-900;
}

a {
  text-decoration: none;
}

.flickity {
  .flickity-button.flickity-prev-next-button {
    top: calc(100% + 30px);

    &:focus {
      box-shadow: none !important;
    }

    &:focus-visible {
      outline: 2px solid $dark-900;
    }
  }
  .flickity-page-dots {
    bottom: -40px;
  }

  @media screen and (min-width: 390px) {
    .flickity-button.flickity-prev-next-button {
      top: 50%;
    }
    .flickity-page-dots {
      bottom: -25px;
    }
  }

  @media screen and (min-width: 500px) {
    .flickity-button.flickity-prev-next-button.next {
      right: -30px;
    }

    .flickity-button.flickity-prev-next-button.previous {
      left: -30px;
    }
  }
}
</style>
