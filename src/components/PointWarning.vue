<template>
  <div v-if="Array.isArray(pointWarning) && pointWarning.length" class="pointWarning"></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PointWarning',
  computed: {
    ...mapGetters(['pointWarning']),
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/colors';

.pointWarning {
  width: 12px;
  min-width: 12px;
  height: 12px;
  min-height: 12px;
  position: absolute;
  top: -10px;
  right: -5px;
  z-index: 99;
  border-radius: 50%;
  background-color: $light-red;
}
</style>
