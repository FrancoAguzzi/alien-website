<template>
  <section :class="['titlePages', { 'distance-from-top': showTopBarWarning }]">
    <FadeAnimation>
      <div v-if="isLoading" class="container titlePages__skeleton">
        <SkeletonLoading type="icon" :margin="[0, '1rem', 0, 0]" />
        <div class="titlePages__skeleton-texts">
          <SkeletonLoading :customSizes="{ width: '60%', height: '1.5rem' }" />
          <SkeletonLoading :customSizes="{ width: '90%', height: '0.65rem' }" />
        </div>
      </div>

      <div v-else :class="['container', 'titlePages__content', { centered: category }]">
        <button v-if="backRouteName" @click="goBack" class="titlePages__content-back">
          <!-- <img src="@/assets/img/arrow-back.svg" alt="Voltar para a página anterior" /> -->
        </button>
        <img v-else-if="!backRouteName && icon" :src="icon" class="titlePages__content-icon" />

        <div class="titlePages__content-text">
          <template v-if="title">
            <span v-if="category" class="titlePages__content-text--category">{{ category }}</span>
            <h2 class="titlePages__content-text--title">{{ title }}</h2>
          </template>
          <img v-else :src="titleIcon" alt="" />

          <p class="titlePages__content-text--subtitle">{{ subtitle }}</p>
        </div>
      </div>
    </FadeAnimation>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import FadeAnimation from '@/components/animations/FadeAnimation';

export default {
  name: 'TitlePages',
  components: { SkeletonLoading, FadeAnimation },
  props: {
    category: { type: String, required: false, default: '' },
    title: { type: String, required: false, default: '' },
    titleIcon: { type: String, required: false, default: '' },
    subtitle: { type: String, required: false, default: '' },
    icon: { type: String, required: false, default: '' },
    backRouteName: { type: String, required: false, default: '' },
    isLoading: { type: Boolean, required: false, default: false },
  },
  computed: {
    ...mapGetters(['showTopBarWarning']),
  },
  methods: {
    goBack() {
      return this.$router.push({ name: this.backRouteName });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';
@import '../assets/scss/_variables.scss';

.titlePages {
  margin-top: 70px;
  padding: 40px 0px;
  // background: url('../assets/img/bg-title-page.png') no-repeat $dark-800 right center;

  &__skeleton {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    &-texts {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }

  &__content {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 16px;

    &-back {
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: $dark-700;
      cursor: pointer;
    }

    &-icon {
      width: 32px;
      height: 32px;
    }

    &-text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 10px;

      &--category {
        font-size: 1rem;
        font-weight: 600;
        line-height: 115%;
        color: $dark-900;
      }

      &--title {
        font-size: 1.5rem;
        line-height: 32px;
      }

      &--subtitle {
        display: none;
      }
    }
  }

  &__content.centered {
    align-items: center;
  }
}

@media (min-width: 768px) {
  .titlePages {
    margin-top: 88px;
    padding: 4.25rem 0px;

    &__skeleton &__skeleton-texts {
      width: 70%;
    }

    &__content {
      gap: 24px;

      &-back {
        width: 40px;
        height: 40px;
      }

      &-icon {
        width: 40px;
        height: 40px;
      }

      &-text {
        &--category {
          font-size: 1.125rem;
        }

        &--title {
          font-size: 2rem;
          line-height: 40px;
        }

        &--subtitle {
          display: block;
        }
      }
    }
  }
}

@media (min-width: 1440px) {
  .titlePages {
    &__skeleton &__skeleton-texts {
      width: 50%;
    }

    &__content &__content-text &__content-text--category {
      font-size: 1.25rem;
    }
  }
}
</style>
