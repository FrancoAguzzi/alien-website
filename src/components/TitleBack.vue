<template>
  <div @click="goBack" class="titleBack">
    <button class="titleBack__button">
      <div class="icon">
          <!-- src="@/assets/img/arrow-back.svg" -->
        <img
          alt="Seta apontando para esquerda como rótulo do botão que, ao ser pressionado, direciona o usuário para a tela anterior"
        />
      </div>
    </button>
    <h5 class="titleBack__text">{{ text }}</h5>
  </div>
</template>

<script>
const ROUTE_BACK_DEFAULT = 'back';

export default {
  name: 'TitleBack',
  emits: ['goBackClick'],
  props: {
    text: {
      type: String,
      required: true,
    },
    backRouteName: {
      type: String,
      required: false,
      default: ROUTE_BACK_DEFAULT,
    },
  },
  methods: {
    goBack() {
      return this.$emit('goBackClick');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.titleBack {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  cursor: pointer;

  &__button {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $dark-700;
    border-radius: 50%;
  }

  &__text {
    font-weight: 700;
    font-size: 1.125rem;
    line-height: 115%;
    letter-spacing: -0.005em;
    color: $white;
  }
}

@media (min-width: 1440px) {
  .titleBack .titleBack__text {
    font-size: 1.5rem;
  }
}
</style>
