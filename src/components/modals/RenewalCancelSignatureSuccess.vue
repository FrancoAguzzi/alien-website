<template>
  <Modal :class="['rcssModal', { 'show-modal': showModal }]">
    <div class="icon">
      <!-- <img src="@/assets/img/mysignature/icon-cancel-signature.svg" alt="" /> -->
    </div>
    <div class="rcssModal__texts">
      <h4 class="rcssModal__texts-title">Sua assinatura foi cancelada</h4>
    </div>
    <ul class="rcssModal__steps">
      <li>Sua assinatura ficará ativa até {{ formatInstant(currentSignature?.cycleEndDate) }}</li>
      <li>Após esse prazo, sua assinatura não será renovada.</li>
      <li>
        Você pode reativar a assinatura quando quiser em seu perfil. Clique em Perfil > Assinatura >
        Ativar.
      </li>
    </ul>
    <div class="rcssModal__buttons">
      <button @click="closeModal" class="btn-primary rcssModal__buttons-confirm">
        Entendido
      </button>
    </div>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex';
import Modal from '@/components/Modal';
import { utils } from '@/mixins/utils.js';

export default {
  name: 'RenewalCancelSignatureSuccess',
  emits: ['closeModal'],
  components: { Modal },
  mixins: [utils],
  props: {
    showModal: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['currentSignature']),
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_colors.scss';

.rcssModal {
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

    &-title {
      max-width: 280px;
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

    &-confirm {
      margin: 0 !important;
      height: 48px !important;
    }
  }
}

@media (min-width: 768px) {
  .rcssModal {
    /deep/ .modal-body {
      width: 450px;
      max-width: 450px;
      padding: 56px 56px 40px !important;
    }

    &__texts {
      &-title {
        max-width: 500px;
      }
    }

    &__steps {
      margin-top: 32px;
    }

    &__buttons &__buttons-confirm {
      max-width: 450px;
    }
  }
}
</style>
