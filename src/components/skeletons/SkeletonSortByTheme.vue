<template>
  <div>
    <SkeletonLoading
      :customSizes="{ width: '18.875rem', height: '9.5rem' }"
      :margin="['1rem', '1.5rem', 0, 0]"
    />
    <SkeletonLoading
      :customSizes="{ width: '14.875rem', height: '1.375rem' }"
      :margin="['1rem', 0]"
    />
    <SkeletonLoading type="text" />
  </div>
</template>

<script>
import SkeletonLoading from '@/components/SkeletonLoading';

export default {
  name: 'SkeletonSortByTheme',
  components: { SkeletonLoading },
};
</script>

<style></style>
