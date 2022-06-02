<template>
  <div class="checkoutStep__container" :class="{ 'checkoutStep__signal-on': isActive }">
    <div class="checkoutStep__signal">
      <div class="checkoutStep__signal-circle1" />
      <div class="checkoutStep__signal-circle2" />
      <div class="checkoutStep__signal-circle3" />
    </div>
    <small class="checkoutStep__label">{{ label }}</small>
  </div>
</template>

<script>
export default {
  name: 'CheckoutStep',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.checkoutStep__container {
  display: flex;
  justify-content: center;
  width: 15rem;
}

.checkoutStep__signal {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.4;

  & div {
    background-color: $dark-900;
    border-radius: 50%;
    position: absolute;
  }

  .checkoutStep__signal-circle1 {
    width: 18px;
    height: 18px;
    opacity: 0.7;
  }

  .checkoutStep__signal-circle2 {
    width: 29px;
    height: 29px;
    opacity: 0.3;
  }

  .checkoutStep__signal-circle3 {
    width: 40px;
    height: 40px;
    opacity: 0.2;
  }
}

.checkoutStep__label {
  font-weight: 700;
  margin-left: 1.5rem;
  color: $dark-100;
}

.checkoutStep__signal-on {
  .checkoutStep__signal {
    opacity: 1;
  }

  .checkoutStep__label {
    color: $white;
  }
}

@media (min-width: 768px) and (max-width: 1279px) {
  .checkoutStep__container {
    width: 12.625rem;
  }

  .checkoutStep__signal {
    .checkoutStep__signal-circle1 {
      width: 14px;
      height: 14px;
    }

    .checkoutStep__signal-circle2 {
      width: 24px;
      height: 24px;
    }

    .checkoutStep__signal-circle3 {
      width: 32px;
      height: 32px;
    }
  }

  .checkoutStep__label {
    font-size: 0.875rem;
  }
}

@media (min-width: 320px) and (max-width: 767px) {
  .checkoutStep__container {
    flex-direction: column;
    align-items: center;
  }

  .checkoutStep__signal {
    .checkoutStep__signal-circle1 {
      width: 10px;
      height: 10px;
    }

    .checkoutStep__signal-circle2 {
      width: 18px;
      height: 18px;
    }

    .checkoutStep__signal-circle3 {
      width: 24px;
      height: 24px;
    }
  }

  .checkoutStep__label {
    margin: 1rem 0 0;
    font-size: 0.625rem;
    text-align: center;
  }
}
</style>
