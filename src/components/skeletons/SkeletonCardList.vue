<template>
  <SkeletonLoading
    v-for="index in listSize"
    :key="index"
    type="card"
    :margin="hasMargin ? [0, '1.25rem', '1.25rem', 0] : [0]"
  />
</template>

<script>
import SkeletonLoading from '@/components/SkeletonLoading';

export default {
  name: 'SkeletonCardList',
  components: { SkeletonLoading },
  props: {
    listSize: {
      default: 8,
      type: Number,
    },
    hasMargin: {
      default: true,
      type: Boolean,
    },
  },
};
</script>

<style lang="scss"></style>
