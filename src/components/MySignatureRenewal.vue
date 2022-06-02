<template>
  <div class="msRenewal">
    <div v-if="!userIsLifetime" class="msRenewal__header">
      <div class="msRenewal__header-title">
        <div class="icon">
          <img src="@/assets/img/icon-repeat-filled.svg" alt="" />
        </div>
        <div class="msRenewal__header-title--texts">
          <h6>Renovação automática</h6>

          <p v-if="isRenewalActivated" class="activated">Status: Ativada</p>
          <p v-else class="disabled">Status: Desativada</p>
        </div>
      </div>
      <button
        v-if="!gatewayAllowRequestRenewal || (isRenewalActivated && gatewayAllowRequestRenewal)"
        @click="toggleShowRenewalModal(true)"
        class="msRenewal__header-button"
      >
        {{ renewalButtonLabel }}
      </button>
    </div>

    <h6 v-if="!userIsLifetime" class="msRenewal__description">
      Com a renovação automática você garante benefícios exclusivos, como:
    </h6>

    <div class="msRenewal__benefits">
      <MySignatureRenewalItem
        v-for="{ title, description } in benefits"
        :key="title"
        :title="title"
        :description="description"
      />
    </div>

    <div v-if="canShowRenewalButton" class="msRenewal__button">
      <button
        v-if="!isRenewalActivated && gatewayAllowRequestRenewal"
        @click="activateRenewal"
        :disabled="getLastUsedCreditCard.isExpired"
        class="btn-primary outline"
      >
        <LoaderBtn v-show="isSendingRequest" />
        {{ renewalButtonLabel }}
      </button>
      <button v-else @click="toggleShowRenewalModal(true)" class="msRenewal__button-link">
        {{ renewalButtonLabel }}
      </button>
    </div>
  </div>

  <MySignatureModalManager
    :gateway="currentSignature.paymentGateway.toLowerCase()"
    :type="isRenewalActivated ? 'DISABLE_RENEWAL' : 'ACTIVATE_RENEWAL'"
    :informational-only="!gatewayAllowRequestRenewal"
    :show-modal="showRenewalModal"
    @close-modal="toggleShowRenewalModal"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import LoaderBtn from '@/components/LoaderBtn';
import { dataLayerMixin } from '@/mixins/dataLayerMixin';
import { automaticRenewalBenefits } from '@/Utils/selectsValues.js';
import MySignatureRenewalItem from '@/components/MySignatureRenewalItem';
import MySignatureModalManager from '@/components/MySignatureModalManager';

const CLARO_GATEWAY = 'claro';
const PAGARME_GATEWAY = 'pagarme';
const PAYMENT_GATEWAYS_WITH_RENEWAL_INFORMATION = [PAGARME_GATEWAY, 'ios', CLARO_GATEWAY];

export default {
  name: 'MySignatureRenewal',
  emits: ['activateRenewal'],
  components: { LoaderBtn, MySignatureRenewalItem, MySignatureModalManager },
  mixins: [dataLayerMixin],
  props: {
    isRecurrent: {
      type: Boolean,
      required: true,
    },
    isSendingRequest: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      benefits: [...automaticRenewalBenefits],
      showRenewalModal: false,
    };
  },
  computed: {
    ...mapGetters([
      'currentSignature',
      'getLastUsedCreditCard',
      'renewalFlowType',
      'userIsLifetime',
    ]),
    isRenewalActivated() {
      return this.isRecurrent;
    },
    activateRenewal() {
      this.$emit('activateRenewal');
    },
    renewalButtonLabel() {
      if (this.isRenewalActivated) {
        if (this.currentSignature.paymentGateway === CLARO_GATEWAY) {
          return 'Como cancelar minha assinatura via Claro?';
        }

        if (this.currentSignature.paymentGateway === PAGARME_GATEWAY) {
          return 'Cancelar assinatura';
        }

        return 'Como desativar minha renovação?';
      } else {
        if (this.currentSignature.paymentGateway === PAGARME_GATEWAY) {
          return 'Ativar renovação';
        }

        return 'Como ativar minha renovação?';
      }
    },
    canShowRenewalButton() {
      return (
        !this.userIsLifetime &&
        PAYMENT_GATEWAYS_WITH_RENEWAL_INFORMATION.includes(this.currentSignature.paymentGateway)
      );
    },
    gatewayAllowRequestRenewal() {
      return this.currentSignature.paymentGateway === PAGARME_GATEWAY;
    },
  },
  methods: {
    toggleShowRenewalModal(isOpenButton) {
      this.showRenewalModal = !this.showRenewalModal;

      if (isOpenButton && this.isRenewalActivated) {
        this.pushToDataLayer('recurrencyOffStart', {
          step: 'RECURRENCY_OFF_INITIAL',
          renewalButtonLabel: this.renewalButtonLabel,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.msRenewal {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 24px;

  &__header {
    &-title {
      display: flex;
      align-items: flex-start;
      gap: 8px;

      > .icon img {
        width: 24px;
        height: 24px;
      }

      &--texts {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 8px;

        > h6 {
          font-weight: 700;
          font-size: 1rem;
          line-height: 115%;
          letter-spacing: -0.005em;
          color: $white;
        }

        > p {
          font-weight: 400;
          font-size: 0.75rem;
          line-height: 130%;
          letter-spacing: -0.005em;
        }

        > p.activated {
          color: $light-success;
        }

        > p.disabled {
          color: $white;
        }
      }
    }

    &-button {
      display: none;
    }
  }

  &__description {
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 140%;
    color: $white;
  }

  &__benefits {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  &__button {
    width: 100%;
    display: flex;
    justify-content: center;

    > button:disabled {
      border: 1px solid $dark-400;
      color: $dark-400;
      cursor: not-allowed !important;
    }

    &-link {
      margin-top: 16px;
      display: block;
      font-weight: 700;
      font-size: 1rem;
      line-height: 115%;
      text-align: center;
      letter-spacing: -0.005em;
      color: $dark-900;
    }
  }
}

@media (min-width: 768px) {
  .msRenewal {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-title {
        gap: 16px;

        > .icon img {
          width: 32px;
          height: 32px;
        }

        &--texts {
          > h6 {
            font-size: 1.125rem;
          }
        }
      }

      &-button {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 130%;
        text-align: right;
        letter-spacing: -0.005em;
        color: $dark-900;
      }
    }

    &__description {
      font-size: 1rem;
    }

    &__benefits {
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    &__button {
      justify-content: flex-end;

      > button {
        max-width: 222px;
      }

      &-link {
        display: none;
      }
    }
  }
}

@media (min-width: 1440px) {
  .msRenewal .msRenewal__header .msRenewal__header-title .msRenewal__header-title--texts > h6 {
    font-size: 1.5rem;
  }
}
</style>
