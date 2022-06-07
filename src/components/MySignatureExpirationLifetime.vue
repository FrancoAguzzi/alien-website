<template>
  <div v-if="userIsLifetime" class="msExpirationLifetime">
    <div class="msExpirationLifetime__description">
      <h6 class="msExpirationLifetime__description-title">
        Assinatura
      </h6>
      <h6 class="msExpirationLifetime__description-divider"></h6>
      <h6 class="msExpirationLifetime__description-duration">
        Você tem acesso ao conteúdo da Finclass sem data para acabar.
      </h6>
    </div>
    <div class="icon">
        <!-- src="@/assets/img/lifelong-logo.svg" -->
      <img
        alt="Logo que identifica todos os usuários vitalícios da plataforma"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MySignatureExpirationLifetime',
  computed: {
    ...mapGetters(['userIsLifetime']),
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.msExpirationLifetime {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__description {
    &-title {
      font-weight: 700;
      font-size: 0.75rem;
      line-height: 140%;
      color: $white;
    }

    &-divider,
    &-duration {
      display: none;
    }
  }
}

@media (min-width: 768px) {
  .msExpirationLifetime {
    align-items: flex-start;

    &__description {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 32px;

      &-title {
        font-size: 1rem;
        line-height: 115%;
        letter-spacing: -0.005em;
      }

      &-divider {
        width: 15%;
        height: 1px;
        display: block;
        background-color: $dark-900;
      }

      &-duration {
        display: block;
        font-weight: 400;
        font-size: 1rem;
        line-height: 145%;
        letter-spacing: -0.005em;
        color: $dark-50;
      }
    }

    .icon > img {
      width: 131px;
      height: 88px;
    }
  }
}

@media (min-width: 1440px) {
  .msExpirationLifetime .icon > img {
    width: 196px;
    height: 132px;
  }
}
</style>
