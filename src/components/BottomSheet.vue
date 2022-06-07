<template>
  <div id="bottom-sheet" class="c-bottom-sheet c-bottom-sheet--list" :class="{ active: isOpen }">
    <div ref="scrim" class="c-bottom-sheet__scrim"></div>
    <div ref="sheet" class="c-bottom-sheet__sheet">
      <div ref="handle" class="c-bottom-sheet__handle">
        <span></span>
        <span></span>
      </div>
      <div class="c-bottom-sheet__container">
        <div class="c-bottom-sheet__container-title">
          <h3>{{ title }}</h3>
          <button class="close" type="button" @click="deactivate">
            <!-- <img src="@/assets/img/close.svg" alt="" /> -->
          </button>
        </div>
        <div class="c-bottom-sheet__container-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Bottom Sheet
 * Core Logic - @author Windo <herwindo.artono@go-jek.com>
 */
import TouchDragListener from '../libs/bottomSheet/TouchDragListener';

export default {
  name: 'BottomSheet',
  emits: ['setIsOpen'],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      scrim: null,
      handle: null,
      sheet: null,
      sheetListener: null,
      scrimListener: null,
    };
  },
  methods: {
    deactivate(translateY) {
      if (!translateY) {
        this.$refs.sheet.style.setProperty('--translateY', `translateY(201px)`);
      } else {
        this.$refs.sheet.style.setProperty(
          'transition',
          `transform 300ms cubic-bezier(0.4, 0, 0.2, 1)`
        );
        this.$refs.sheet.style.setProperty('--translateY', `translateY(${translateY}px)`);
      }

      this.$emit('setIsOpen', 'close');
    },
  },
  mounted() {
    this.$refs.scrim.addEventListener('click', this.deactivate);
    this.$refs.handle.addEventListener('click', this.deactivate);

    this.sheetListener = new TouchDragListener({
      el: this.$refs.sheet,
      touchStartCallback: ({ el, active, initialY, currentY, yOffset }) => {
        el.style.setProperty('--translateY', `translateY(0)`);
        el.style.setProperty('transition', `unset`);
      },
      touchEndCallback: ({ el, active, initialY, currentY, yOffset }) => {
        el.style.setProperty('transition', `transform 300ms cubic-bezier(0.4, 0, 0.2, 1)`);
        el.style.setProperty('--translateY', `translateY(${currentY}px)`);
      },
      touchMoveCallback: ({ el, active, initialY, currentY, yOffset }) => {
        if (currentY <= -40) {
          currentY = -41 + currentY / 10;
        } else if (currentY <= -60) {
          currentY = -60;
        } else if (currentY >= 210) {
          this.deactivate(currentY);
          return;
        }

        el.style.setProperty('--translateY', `translateY(${currentY}px)`);
      },
    });

    this.scrimListener = new TouchDragListener({
      el: this.$refs.scrim,
      touchMoveCallback: ({ el, active, initialY, currentY, yOffset }) => {
        if (currentY >= 83) {
          this.deactivate();
          return;
        }
      },
    });
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';
@import '../assets/scss/libs/bottomSheet/_keyframes';
@import '../assets/scss/libs/bottomSheet/_bottom-sheet';

.c-bottom-sheet__container {
  padding: 2.5rem 1.25rem;
}

.c-bottom-sheet__container-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.c-bottom-sheet__container-content {
  margin-top: 2.625rem;
}
</style>
