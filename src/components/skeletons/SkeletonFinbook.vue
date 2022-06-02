<template>
  <div class="skeleton-finbook">
    <SkeletonLoading :customSizes="{ width: '15rem', height: '21.25rem' }" />
    <SkeletonLoading
      :customSizes="{ width: '12.875rem', height: '0.875rem' }"
      :margin="['1rem', 0]"
    />
    <SkeletonLoading :customSizes="{ width: '9.375rem', height: '0.625rem' }" />
  </div>
</template>

<script>
import SkeletonLoading from '@/components/SkeletonLoading';

export default {
  name: 'SkeletonFinbook',
  components: { SkeletonLoading },
};
</script>

<style lang="scss">
.skeleton-finbook {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
