<template>
  <div class="msRenewalItem">
    <div class="icon">
      <!-- <img src="@/assets/img/icon-check-circle.svg" alt="" /> -->
    </div>
    <div class="msRenewalItem__content">
      <h6>{{ title }}</h6>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MySignatureRenewalItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.msRenewalItem {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 22px;

  .icon {
    min-width: 32px;
    min-height: 32px;

    > img {
      min-width: 32px;
      min-height: 32px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 6px;

    > h6 {
      font-weight: 700;
      font-size: 0.875rem;
      line-height: 145%;
      letter-spacing: -0.005em;
      color: $white;
    }

    > p {
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 145%;
      letter-spacing: -0.005em;
      color: $white;
    }
  }
}

@media (min-width: 768px) {
  .msRenewalItem {
    gap: 8px;

    &__content {
      > h6 {
        font-size: 1rem;
      }

      > p {
        font-size: 0.75rem;
      }
    }
  }
}

@media (min-width: 1440px) {
  .msRenewalItem {
    &__content > p {
      font-size: 0.875rem;
    }
  }
}
</style>
