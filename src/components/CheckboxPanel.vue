<template>
  <component @click="toggleCheckbox" :is="htmlElement" class="checkboxPanel">
    <div class="checkboxPanel__optin checkbox-custom">
      <input type="checkbox" :checked="isChecked" />
      <span class="checkmark"></span>
    </div>
    <div class="checkboxPanel__texts">
      <h4 class="checkboxPanel__texts-title">{{ title }}</h4>
      <h6 v-if="subtitle" class="checkboxPanel__texts-subtitle">{{ subtitle }}</h6>
    </div>
  </component>
</template>

<script>
export default {
  name: 'CheckboxPanel',
  emits: ['toggleCheckbox'],
  props: {
    htmlElement: {
      type: String,
      required: false,
      default: 'div',
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
      default: '',
    },
    isChecked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    toggleCheckbox() {
      this.$emit('toggleCheckbox', this.title);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.checkboxPanel {
  margin: 8px auto 0 !important;
  padding: 10px !important;
  display: flex !important;
  align-items: center !important;
  gap: 10px;
  background-color: $dark-700;
  border: unset !important;
  border-radius: 6px;

  &::before {
    display: none !important;
  }

  &__texts {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 4px;

    &-title {
      word-break: break-word;
      font-weight: 700;
      font-size: 1rem;
      line-height: 115%;
      color: $white;
    }

    &-subtitle {
      word-break: break-word;
      font-size: 0.75rem;
      line-height: 150%;
      letter-spacing: -0.005em;
      opacity: 0.8;
    }
  }
}

@media (min-width: 768px) {
  .checkboxPanel {
    padding: 20px !important;
    gap: 20px;

    &__texts {
      gap: 12px;

      &-title {
        font-size: 1.25rem;
      }

      &-subtitle {
        font-size: 0.875rem;
      }
    }
  }
}
</style>
