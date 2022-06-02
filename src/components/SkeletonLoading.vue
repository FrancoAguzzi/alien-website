<template>
  <div
    :id="type"
    class="skeleton-loading"
    :style="{
      margin: computedMargin,
      width: isCustomComponent ? customSizes.width : '',
      height: isCustomComponent ? customSizes.height : '',
    }"
  />
</template>

<script>
export default {
  name: 'SkeletonLoading',
  props: {
    type: {
      default: 'custom',
      type: String,
      validator: (prop) =>
        [
          'custom',
          'text',
          'rectangle',
          'icon',
          'card',
          'minicard',
          'video',
          'minivideo',
          'avatar',
          'miniavatar',
        ].includes(prop),
    },
    customSizes: {
      default() {
        return { width: 0, height: 0 };
      },
      type: Object,
    },
    margin: {
      default() {
        return [0, 0, '0.5rem', 0];
      },
      type: Array,
    },
  },
  computed: {
    isCustomComponent() {
      return this.type === 'custom';
    },
    computedSizes() {
      return { width: this.customSizes.width ?? 0, height: this.customSizes.height ?? 0 };
    },
    computedMargin() {
      const formattedMargins = this.margin
        .map((side) => (Number.isInteger(side) ? `${side}px` : side))
        .join(' ');

      return formattedMargins;
    },
  },
};
</script>

<style scope lang="scss">
@import '../assets/scss/_colors.scss';

// Base config
.skeleton-loading {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  background-color: $dark-400;
  border-radius: 6px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);

    background-image: linear-gradient(91.06deg, $dark-400 -1.12%, $dark-700 221.11%);

    animation: horizontal 1.5s infinite;
  }

  @keyframes horizontal {
    100% {
      transform: translateX(100%);
    }
  }
}

// Component variation
#avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
}

#card {
  width: 18.125rem;
  height: 26.25rem;
}

#icon {
  width: 1.5rem;
  height: 1.5rem;
}

#miniavatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}

#minicard {
  width: 13.75rem;
  height: 8rem;
}

#minivideo {
  width: 7.5rem;
  height: 5rem;
}

#rectangle {
  width: 24rem;
  height: 3rem;

  @media (max-width: 600px) {
    width: 15rem;
    height: 2rem;
  }
}

#text {
  width: 9rem;
  height: 0.5rem;
}

#video {
  width: 45.625rem;
  height: 25.75rem;

  @media (max-width: 991px) {
    width: 100%;
  }

  @media (max-width: 720px) {
    height: 24.25rem;
  }

  @media (max-width: 670px) {
    height: 22.5rem;
  }

  @media (max-width: 620px) {
    height: 20.625rem;
  }

  @media (max-width: 570px) {
    height: 18.875rem;
  }

  @media (max-width: 520px) {
    height: 17.125rem;
  }

  @media (max-width: 470px) {
    height: 15.375rem;
  }

  @media (max-width: 420px) {
    height: 13.625rem;
  }

  @media (max-width: 370px) {
    height: 11.875rem;
  }

  @media (max-width: 320px) {
    height: 10.125rem;
  }
}
</style>
