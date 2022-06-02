<template>
  <div v-if="showAnimation" class="mask" ref="mask"></div>
</template>

<script>
import { mapGetters } from 'vuex';
import lottie from 'lottie-web/build/player/lottie_light';

export default {
  name: 'LoaderLogin',
  data() {
    return {
      showAnimation: false,
    };
  },
  computed: {
    ...mapGetters(['loaderHome']),
  },
  watch: {
    loaderHome(newVal) {
      if (newVal) this.startAnimation();
    },
  },
  methods: {
    startAnimation() {
      this.showAnimation = true;

      this.$nextTick(() => {
        const element = this.$refs.mask;
        const splashArt = lottie.loadAnimation({
          wrapper: element,
          animType: 'svg',
          loop: false,
          autoplay: true,
          path: 'https://content.finclass.com/splashArt/SPLASHART_PROD.json',
        });

        splashArt.addEventListener('complete', () => {
          this.showAnimation = false;
          splashArt.destroy();
        });
      });
    },
  },
};
</script>
<style scoped>
.mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000;
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
