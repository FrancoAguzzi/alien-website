<template>
  <button v-show="showButton" @click="onClick" class="fab">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'FloatingActionButton',
  emits: ['onClickButton'],
  props: {
    showButton: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit('onClickButton');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.fab {
  width: 32px;
  height: 32px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: $dark-900;
  border-radius: 50%;
}
</style>
