<template>
  <div :class="['pb__container', { hide: !isVisible }]">
    <div class="pb__loading" :style="{ width: `${progress}%` }"></div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  emits: ['loadFinished'],
  props: {
    timeTotal: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isVisible: false,
      progress: 0,
    };
  },
  watch: {
    timeTotal(v) {
      if (this.timeTotal) {
        this.isVisible = true;
        const portion = 100 / this.timeTotal;

        const interval = setInterval(() => {
          if (this.progress >= 100) {
            this.isVisible = false;
            this.progress = 0;
            this.$emit('loadFinished');
            clearInterval(interval);
          }
          this.progress += portion;
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.pb__container {
  width: 100%;
  height: 5px;
  background-color: $dark-700;
  opacity: 1;
  transition: opacity 0.2s linear;

  &.hide {
    opacity: 0;
    pointer-events: none;
  }
}

.pb__loading {
  width: 1%;
  height: 5px;
  background: $dark-200;
  border-radius: 4px;
  overflow: hidden;
  transition: all ease 2s;
}
</style>
