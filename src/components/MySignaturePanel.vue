<template>
  <div :class="['mySignaturePanel', { mySignaturePanel__error: hasError }]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MySignaturePanel',
  props: {
    hasError: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.mySignaturePanel {
  padding: 20px 20px;
  background-color: $dark-800;
  box-sizing: border-box;
  border-radius: 8px;
}

.mySignaturePanel__error {
  border: 2px solid $error;
}

/*
 * TABLET
 */
@media (min-width: 768px) {
  .mySignaturePanel {
    padding: 16px 40px;
  }
}

/*
 * DESKTOP
 */
@media (min-width: 1440px) {
  .mySignaturePanel {
    padding: 32px 40px;
  }
}
</style>
