<template>
  <img :src="require('@/assets/img/types/finclassUpdated.svg')" />
  <div class="skeleton-cards">
    <SkeletonCardList />
  </div>
</template>

<script>
import SkeletonCardList from './SkeletonCardList';

export default {
  name: 'SkeletonFinclassesSlider',
  components: { SkeletonCardList },
};
</script>

<style lang="scss" scoped>
.skeleton-cards {
  margin-top: 2rem;
}
</style>
