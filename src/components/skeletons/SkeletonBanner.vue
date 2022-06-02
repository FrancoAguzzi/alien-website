<template>
  <section class="skeleton-background-banner">
    <div class="skeleton-content-banner">
      <div class="skeleton-informations-banner">
        <div class="skeleton-lines-banner">
          <SkeletonLoading :customSizes="{ width: '100%', height: '1.5rem' }" />
          <SkeletonLoading :customSizes="{ width: '71.5%', height: '1.25rem' }" />
          <SkeletonLoading :customSizes="{ width: '58%', height: '1rem' }" />
        </div>
        <SkeletonLoading :customSizes="{ width: '10rem', height: '3rem' }" :margin="[0]" />
        <SkeletonLoading
          class="skeleton-second-button-banner"
          :customSizes="{ width: '10rem', height: '3rem' }"
          :margin="[0, 0, 0, '1.5rem']"
        />
      </div>
      <div class="skeleton-user-banner">
        <SkeletonLoading type="miniavatar" :margin="[0, 0, '1.5rem']" />
        <SkeletonLoading
          :customSizes="{ width: '8.125rem', height: '0.625rem' }"
          :margin="[0, 0, '1rem']"
        />
        <SkeletonLoading :customSizes="{ width: '6.625rem', height: '0.625rem' }" />
      </div>
    </div>
  </section>
  <section class="container">
    <SkeletonLoading
      :customSizes="{ width: '15rem', height: '1rem' }"
      :margin="['1.5rem', 0, '1rem']"
      class="skeleton-continue-courses-title"
    />
    <section class="skeleton-continue-courses-list">
      <SkeletonLoading type="minicard" :margin="[0, '1.5rem', '1.5rem', 0]" />
      <SkeletonLoading type="minicard" :margin="[0, '1.5rem', '1.5rem', 0]" />
      <SkeletonLoading type="minicard" :margin="[0, '1.5rem', '1.5rem', 0]" />
    </section>
    <SkeletonLoading
      :customSizes="{ width: '15rem', height: '1rem' }"
      :margin="['1.5rem', 0, '1rem']"
      class="skeleton-continue-courses-title"
    />
    <section class="skeleton-finclasses">
      <SkeletonCardList />
    </section>
  </section>
</template>

<script>
import SkeletonLoading from '@/components/SkeletonLoading';
import SkeletonCardList from '@/components/skeletons/SkeletonCardList';

export default {
  name: 'SkeletonBanner',
  components: { SkeletonLoading, SkeletonCardList },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_colors.scss';

.skeleton-background-banner {
  position: relative;
  width: 100%;
  height: 48rem;
  background: linear-gradient(89.85deg, $dark-400 -125.04%, rgba(32, 34, 39, 0) 211.84%);

  .skeleton-content-banner {
    max-width: 1310px;
    height: 91%;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .skeleton-informations-banner {
      flex: 1;

      .skeleton-lines-banner {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: 31.25rem;
        margin: 3rem 0 9rem;

        @media (max-width: 600px) {
          align-items: center;
          gap: 1rem;
          margin: 3rem 0 4rem;
        }

        @media (max-width: 360px) {
          max-width: 18.25rem;
        }
      }

      .skeleton-second-button-banner {
        @media (max-width: 360px) {
          display: none;
        }
      }

      @media (max-width: 600px) {
        flex: none;
        margin: 0 auto;

        > img {
          display: none;
        }
      }
    }

    .skeleton-user-banner {
      width: 8.125rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      @media (max-width: 600px) {
        display: none;
      }
    }

    @media (max-width: 1300px) {
      max-width: 1200px;
      height: 90%;
    }

    @media (max-width: 600px) {
      max-width: 100%;
      height: 95%;
    }
  }

  @media (max-width: 1300px) {
    height: 40.625rem;
  }

  @media (max-width: 1200px) {
    height: 37.5rem;
  }

  @media (max-width: 600px) {
    height: 22rem;
  }
}

.skeleton-continue-courses-title {
  @media (max-width: 450px) {
    height: 0.5rem !important;
  }
}

.skeleton-continue-courses-list {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: max-content;

  @media (max-width: 600px) {
    #minicard {
      width: 256px;
      height: 160px;
    }
  }

  @media (max-width: 450px) {
    #minicard {
      width: 350px;
      height: 80px;
    }
  }
}

.skeleton-finclasses {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: max-content;
}
</style>
