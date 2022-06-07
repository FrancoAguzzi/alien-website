<template>
  <div class="wrap-faq" @click="toggleItem">
    <div class="wrap-question" :class="{ active: isActive }">
      <strong>{{ question }}</strong>
      <div class="arrow-down" :class="{ active: isActive }">
        <!-- <img v-if="isActive" src="../assets/img/faq/arrow-top.svg" alt="Arrow Up" /> -->
        <!-- <img v-else src="../assets/img/faq/arrow-down.svg" alt="Arrow Down" /> -->
      </div>
    </div>
    <div class="answer" :class="{ open: isActive }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaqItem',
  props: {
    question: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleItem() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.wrap-faq {
  width: 100%;
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  margin: 0 auto 1rem auto;
  background-color: $dark-700;
  border-radius: 6px;
  overflow: hidden;

  .wrap-question {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .arrow-down {
      width: 1.5rem;
      height: 1.5rem;

      img {
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }

      &.active {
        -webkit-transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        -ms-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
        transition: all 0.5s ease;
      }
    }
  }

  .answer {
    line-height: 145%;
    font-size: 1.125rem;
    text-align: left;
    color: $dark-100;
    height: 0;
    opacity: 0;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;

    p {
      color: $dark-100;
    }

    &.open {
      height: unset;
      opacity: 1;
      padding: 1rem 0;
    }
  }
}

@media (max-width: 470px) {
  .wrap-faq {
    width: 100%;

    .wrap-question {
      text-align: left;

      strong {
        font-size: 1rem;
        line-height: 150%;
        width: 90%;
      }
    }
  }
}
</style>
