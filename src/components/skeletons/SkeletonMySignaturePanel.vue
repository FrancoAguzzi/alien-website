<template>
  <SkeletonLoading :customSizes="{ width: '100%', height: '8rem' }" />
</template>

<script>
import SkeletonLoading from '@/components/SkeletonLoading';

export default {
  name: 'SkeletonMySignaturePanel',
  components: { SkeletonLoading },
};
</script>
