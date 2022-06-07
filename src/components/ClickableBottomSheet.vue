<template>
  <div>
    <div :class="['panel', { active: isActive }]">
      <div class="panel__close">
        <div class="panel__close-title">
          <h3>{{ title }}</h3>
          <button type="button" @click="closePanel" class="close">
            <!-- <img src="@/assets/img/close.svg" alt="" /> -->
          </button>
        </div>
      </div>

      <div class="panel__slot">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewBottomSheet',
  props: {
    isActive: { type: Boolean, required: true, default: false },
    title: { type: String, default: null },
  },
  methods: {
    closePanel() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.panel {
  transform: translateY(100vh);
  transition: transform 0.2s;
  z-index: 101;
  position: fixed;
  background-color: $dark-800;
  bottom: 0;
  left: 0;
  width: 100vw;
  border-radius: 24px 24px 0px 0px;

  &.active {
    transform: translateY(0);
    transition: 0.2s;
  }

  &__close {
    width: 100%;

    &-title {
      padding: 1.5rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__slot {
    padding: 0 1.25rem 0;
  }
}
</style>
