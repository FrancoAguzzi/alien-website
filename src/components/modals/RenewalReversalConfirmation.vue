<template>
  <Modal :class="['rrcModal', { 'show-modal': showModal }]">
    <button class="close js-close-modal" type="button" @click="closeModal">
      <!-- <img src="@/assets/img/close.svg" alt="" /> -->
    </button>
    <div class="icon">
      <!-- <img src="@/assets/img/icon-cancel-credit.svg" alt="" /> -->
    </div>
    <div class="rrcModal__texts">
      <h4 class="rrcModal__texts-title">Você tem certeza que quer solicitar estorno?</h4>
    </div>
    <ul class="rrcModal__steps">
      <li>
        Se você optar por solicitar estorno, perderá seu acesso à Finclass e será deslogado
        imediatamente de sua conta.
      </li>
      <li>O prazo para a devolução do pagamento varia de acordo com sua operadora do cartão.</li>
    </ul>
    <div class="rrcModal__buttons">
      <button @click="requestReversal" class="rrcModal__buttons-confirm">
        <LoaderBtn v-show="isUnsubscribing" />
        Cancelar assinatura
      </button>
      <button @click="closeModal" class="btn-primary rrcModal__buttons-cancel">
        Manter a Finclass
      </button>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal';
import LoaderBtn from '@/components/LoaderBtn';

export default {
  name: 'RenewalReversalConfirmation',
  emits: ['closeModal', 'requestReversal'],
  components: { LoaderBtn, Modal },
  props: {
    showModal: {
      type: Boolean,
      required: false,
      default: false,
    },
    isUnsubscribing: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    requestReversal() {
      this.$emit('requestReversal');
    },
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_colors.scss';

.rrcModal {
  /deep/ .modal-body {
    width: 375px;
    padding: 32px 20px 46px !important;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  &__texts {
    max-width: 280px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    &-title {
      margin: 0 !important;
      font-weight: 700;
      font-size: 1.25rem;
      line-height: 115%;
      color: $white;
    }
  }

  &__steps {
    margin-top: 24px;
  }

  &__buttons {
    width: 100%;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;

    &-confirm {
      order: 2;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      font-size: 1rem;
      line-height: 140%;
      text-align: center;
      color: $dark-10;

      &:disabled {
        cursor: not-allowed;
        color: $dark-600;
      }
    }

    &-cancel {
      order: 1;
      margin: 0 !important;
      height: 48px !important;
    }
  }
}

@media (min-width: 768px) {
  .rrcModal {
    /deep/ .modal-body {
      width: 660px;
      max-width: 660px;
      padding: 56px 56px 40px !important;
    }

    &__texts {
      max-width: 500px;
      gap: 32px;
    }

    &__steps {
      margin-top: 32px;
    }

    &__buttons {
      flex-direction: row;
      justify-content: flex-end;
      gap: 64px;

      &-confirm {
        order: 1;
      }

      &-cancel {
        order: 2;
      }
    }
  }
}
</style>
