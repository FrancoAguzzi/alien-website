<template>
  <Modal :class="['rrlbModal', { 'show-modal': showModal }]">
    <button @click="closeModal" class="close js-close-modal" type="button">
      <img src="@/assets/img/close.svg" alt="" />
    </button>
    <div class="icon">
      <img src="@/assets/img/mysignature/icon-sad-face.svg" alt="" />
    </div>
    <div class="rrlbModal__texts">
      <h4 class="rrlbModal__texts-title">
        Você tem certeza que quer
        {{ isReversalFlow ? 'solicitar estorno?' : 'cancelar a assinatura?' }}
      </h4>
      <h6 class="rrlbModal__texts-subtitle">Eu concordo em PERDER as seguintes vantagens:</h6>
    </div>
    <ul class="rrlbModal__benefits">
      <CheckboxPanel
        v-for="{ title, description } in benefits"
        :key="title"
        :title="title"
        :subtitle="description"
        html-element="li"
        :is-checked="checkedBenefits.includes(title)"
        @toggle-checkbox="toggleCheckbox($event)"
      />
    </ul>
    <div class="rrlbModal__buttons">
      <button @click="submit" :disabled="!enableNextStepButton" class="rrlbModal__buttons-confirm">
        Cancelar mesmo assim
      </button>
      <button @click="closeModal" class="btn-primary rrlbModal__buttons-cancel">
        Manter ativa
      </button>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal';
import CheckboxPanel from '@/components/CheckboxPanel';
import { automaticRenewalBenefits } from '@/Utils/selectsValues.js';

export default {
  name: 'RenewalLostBenefits',
  emits: ['closeModal', 'nextStep'],
  components: { CheckboxPanel, Modal },
  props: {
    showModal: {
      type: Boolean,
      required: false,
      default: false,
    },
    isReversalFlow: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      benefits: [...automaticRenewalBenefits],
      checkedBenefits: [],
    };
  },
  computed: {
    enableNextStepButton() {
      return this.checkedBenefits.length === this.benefits.length;
    },
  },
  methods: {
    toggleCheckbox(benefitTitle) {
      if (this.checkedBenefits.includes(benefitTitle)) {
        const indexToRemove = this.checkedBenefits.findIndex((cb) => cb === benefitTitle);
        this.checkedBenefits.splice(indexToRemove, 1);
      } else {
        this.checkedBenefits.push(benefitTitle);
      }
    },
    submit() {
      this.$emit('nextStep');
    },
    closeModal() {
      this.checkedBenefits = [];
      this.$emit('closeModal', false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_colors.scss';

.rrlbModal {
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

    &-subtitle {
      font-weight: 400;
      font-size: 1rem;
      line-height: 145%;
      letter-spacing: -0.005em;
      color: $white;
    }
  }

  &__benefits {
    width: 100%;
    margin: 16px auto 0 !important;
  }

  &__buttons {
    width: 100%;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    &-confirm {
      order: 2;
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
  .rrlbModal {
    /deep/ .modal-body {
      width: 660px;
      max-width: 660px;
      padding: 56px 56px 40px !important;
    }

    &__texts {
      max-width: 500px;
      gap: 32px;
    }

    &__benefits {
      margin-top: 32px !important;
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
