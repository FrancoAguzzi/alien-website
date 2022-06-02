<template>
  <SkeletonLoading :customSizes="{ width: '70%', height: '0.875rem' }" />
  <SkeletonLoading :customSizes="{ width: '45%', height: '1.5rem' }" :margin="['1rem', 0]" />
  <SkeletonLoading :customSizes="{ width: '95%', height: '0.5rem' }" :margin="['0.5rem', 0]" />
  <SkeletonLoading :customSizes="{ width: '95%', height: '0.5rem' }" />
</template>

<script>
import SkeletonLoading from '@/components/SkeletonLoading';

export default {
  name: 'SkeletonSortByThemeMobile',
  components: { SkeletonLoading },
};
</script>

<style></style>
