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
</style>
