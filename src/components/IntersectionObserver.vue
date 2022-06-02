<template>
  <div></div>
</template>

<script>
export default {
  name: 'IntersectionObserver',
  emits: ['isInScreen'],
  mounted() {
    const intersectionObserver = new IntersectionObserver(this.onElementObserved);

    intersectionObserver.observe(this.$el);
  },
  methods: {
    onElementObserved(entries) {
      if (entries[0].intersectionRatio <= 0) return;

      this.$emit('isInScreen');
    },
  },
};
</script>

<style></style>
