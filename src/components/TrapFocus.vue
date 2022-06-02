<template>
  <div ref="trapper">
    <slot />
  </div>
</template>

<script>
const focusableElementsSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default {
  name: 'TrapFocus',
  props: {
    active: { type: Boolean, default: false },
  },
  data() {
    return {
      focusableElements: [],
      firstFocusable: null,
      lastFocusable: null,
    };
  },
  watch: {
    active(newVal) {
      if (newVal) {
        this.initFocusTrap(this.$refs.trapper);
      } else {
        this.clearFocusTrap();
      }
    },
  },
  mounted() {
    if (this.active) {
      this.initFocusTrap(this.$refs.trapper);
    }
  },
  methods: {
    initFocusTrap(ref) {
      this.focusableElements = ref.querySelectorAll(focusableElementsSelector);
      this.firstFocusable = this.focusableElements[0];
      this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
      document.addEventListener('keydown', this.keyHandler);
      this.firstFocusable.focus();
    },
    keyHandler(e) {
      const isTabPressed = e.key === 'Tab';

      if (!isTabPressed) return;

      if (e.shiftKey) {
        if (document.activeElement === this.firstFocusable) {
          this.lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === this.lastFocusable) {
          this.firstFocusable.focus();
          e.preventDefault();
        }
      }
    },
    clearFocusTrap() {
      document.removeEventListener('keydown', this.keyHandler);
    },
  },
};
</script>

<style></style>
