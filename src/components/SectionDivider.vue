<template>
  <div class="divider">
    <div class="divider__line"></div>
    <img src="@/assets/img/divider_circle.png" alt="Divider" class="divider__circle" />
  </div>
</template>

<script>
export default {
  name: 'SectionDivider',
};
</script>

<style lang="scss">
.divider {
  width: 100%;
  height: 56px;
  position: relative;
  margin: 64px auto;
}

.divider__line {
  background: linear-gradient(54.54deg, #0093dc -1.26%, #00e7f9 95.85%);
  width: 100%;
  height: 1px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.divider__circle {
  z-index: 2;
  width: 56px;
  height: 56px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (min-width: 768px) {
  .divider {
    margin: 80px auto;
  }
}

@media (min-width: 1440px) {
  .divider {
    margin: 96px auto;
  }
}
</style>
