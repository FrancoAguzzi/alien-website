<template>
  <Modal :class="['rrbModal', { 'show-modal': showModal }]">
    <button class="close js-close-modal" type="button" @click="closeModal">
      <!-- <img src="@/assets/img/close.svg" alt="" /> -->
    </button>
    <div class="icon">
      <!-- <img src="@/assets/img/mysignature/icon-sad-face.svg" alt="" /> -->
    </div>
    <div class="rrbModal__texts">
      <h4 class="rrbModal__texts-title">
        O que levou você a {{ isReversalFlow ? 'solicitar estorno?' : 'cancelar?' }}
      </h4>
    </div>

    <form @submit.prevent="submit" autocomplete="off">
      <div class="form-group">
        <label for="">Selecione o principal motivo da sua solicitação</label>
        <select v-model="form.reason">
          <option v-for="reason in reasons" :key="reason" :value="reason">{{ reason }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="">Descreva mais detalhes sobre sua solicitação </label>
        <textarea v-model="form.details" name="" id="assunto" rows="4"></textarea>
        <small>Campo obrigatório (mínimo: 10 caracteres)</small>
      </div>
      <div class="form-group">
        <button type="submit" class="btn-primary" :disabled="!enableNextStepButton">
          <LoaderBtn v-show="!isReversalFlow && isUnsubscribing" />
          {{ isReversalFlow ? 'Enviar' : 'Cancelar assinatura' }}
        </button>
      </div>
    </form>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal';
import LoaderBtn from '@/components/LoaderBtn';
import { reasonsForCancel } from '@/Utils/selectsValues.js';

export default {
  name: 'RenewalReason',
  emits: ['closeModal', 'nextStep'],
  components: { Modal, LoaderBtn },
  props: {
    showModal: {
      type: Boolean,
      required: false,
      default: false,
    },
    form: {
      type: Object,
      required: true,
    },
    isReversalFlow: {
      type: Boolean,
      required: true,
    },
    isUnsubscribing: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      reasons: [...reasonsForCancel],
    };
  },
  computed: {
    enableNextStepButton() {
      return this.form?.reason && this.form?.details && this.form?.details.length >= 10;
    },
  },
  methods: {
    submit() {
      this.$emit('nextStep');
    },
    closeModal() {
      this.$emit('closeModal', false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_colors.scss';

.rrbModal {
  /deep/ .modal-body {
    width: 375px;
    padding: 32px 20px 46px !important;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    > form {
      width: 100%;

      > .form-group small {
        margin: 0;
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 155%;
        letter-spacing: -0.01em;
        color: $dark-100;
      }

      > .form-group button.btn-primary {
        max-width: 335px !important;
        margin: 0 !important;

        &:disabled {
          cursor: not-allowed;
        }
      }
    }
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
}

@media (min-width: 768px) {
  .rrbModal {
    /deep/ .modal-body {
      width: 660px;
      max-width: 660px;
      padding: 56px 56px 40px !important;

      > form > .form-group button.btn-primary {
        max-width: 250px !important;
        float: right;
      }
    }

    &__texts {
      max-width: 500px;
      gap: 32px;
    }
  }
}
</style>
