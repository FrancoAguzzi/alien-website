<template>
  <Modal :class="['rrsModal', { 'show-modal': showModal }]">
    <div class="icon">
      <!-- <img src="@/assets/img/mysignature/icon-reversal.svg" alt="" /> -->
    </div>
    <div class="rrsModal__texts">
      <h4 class="rrsModal__texts-title">A sua solicitação de estorno foi efetuada</h4>
      <h4 class="rrsModal__texts-subtitle">
        Obrigado pelo tempo que você esteve conosco.
        <span>Vamos evoluir a Finclass, e esperamos que você volte em breve.</span>
      </h4>
    </div>
    <div class="rrsModal__buttons">
      <button @click="logoutUser" class="btn-primary rrsModal__buttons-confirm">
        Sair da conta
      </button>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal';
import { logoutUserMix } from '@/mixins';

export default {
  name: 'RenewalReversalSuccess',
  components: { Modal },
  mixins: [logoutUserMix],
  props: {
    showModal: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  watch: {
    showModal: function(value) {
      if (value) {
        setTimeout(() => {
          this.logoutUser();
        }, 10000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_colors.scss';

.rrsModal {
  /deep/ .modal-body {
    width: 375px;
    padding: 32px 20px 46px !important;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  &__texts {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    &-title {
      max-width: 280px;
      margin: 0 !important;
      font-weight: 700;
      font-size: 1.25rem;
      line-height: 115%;
      color: $white;
    }

    &-subtitle {
      font-weight: 700;
      font-size: 1rem;
      line-height: 115%;
      letter-spacing: -0.005em;
      color: $white;
      opacity: 0.7;

      > span {
        margin-top: 12px;
        font-weight: 400;
        font-size: 1rem;
        line-height: 145%;
        letter-spacing: -0.005em;
        color: $white;
        opacity: 0.7;
      }
    }
  }

  &__buttons {
    width: 100%;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &-confirm {
      margin: 0 !important;
      height: 48px !important;
    }
  }
}

@media (min-width: 768px) {
  .rrsModal {
    /deep/ .modal-body {
      width: 450px;
      max-width: 450px;
      padding: 56px 56px 40px !important;
    }

    &__texts {
      gap: 32px;

      &-title {
        max-width: 500px;
      }
    }

    &__buttons &__buttons-confirm {
      max-width: 450px;
    }
  }
}
</style>
