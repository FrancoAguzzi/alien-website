<template>
  <div class="msPaymentMethod">
    <div class="msPaymentMethod__title">
      <div class="icon">
        <!-- <img src="@/assets/img/icon-credit-card-gray.svg" alt="" /> -->
      </div>

      <div class="msPaymentMethod__title-description">
        <h6>Método de pagamento</h6>
        <p v-show="isCreditCard && lastUsedCreditCard?.isExpired">Seu cartão está vencido</p>
      </div>
    </div>

    <div class="msPaymentMethod__actions">
      <h5 v-if="!isCreditCard">{{ getPaymentMethod }}</h5>
      <div v-else class="msPaymentMethod__actions--card">
        <div class="msPaymentMethod__actions--card-brand">
          <div class="icon">
            <img
              v-if="creditCardFlag"
              :src="creditCardFlag"
              :alt="lastUsedCreditCard?.brand.toUpperCase()"
            />
          </div>
          <h6>•••• •••• •••• {{ lastUsedCreditCard?.last4Digits }}</h6>
        </div>
        <button @click="editCreditCard" class="btn-primary outline">Alterar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { utils } from '@/mixins/utils.js';

const CREDIT_CARD_TYPE = 'credit_card';
const PAGARME_GATEWAY = 'pagarme';

export default {
  name: 'MySignaturePaymentMethod',
  emits: ['editCreditCard'],
  mixins: [utils],
  computed: {
    ...mapGetters(['currentSignature', 'getLastUsedCreditCard']),
    getPaymentMethod() {
      return this.currentSignature.paymentGateway === PAGARME_GATEWAY
        ? this.currentSignature.paymentMethod
        : this.currentSignature.paymentGateway;
    },
    isCreditCard() {
      return this.getPaymentMethod === CREDIT_CARD_TYPE;
    },
    creditCardFlag() {
      if (!this.isCreditCard) return;

      return this.getCardFlag(this.lastUsedCreditCard.brand);
    },
    lastUsedCreditCard() {
      // IMPORTANT NOTE: when this logic was created, the card details did not exist at that endpoint. So we always take the last card from userPaymentMethods, but we respect /readPayment's answer.
      if (!this.isCreditCard) return;

      return this.getLastUsedCreditCard;
    },
  },
  methods: {
    editCreditCard() {
      return this.$emit('editCreditCard');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.msPaymentMethod {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;

  &__title {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 16px;

    &-description {
      display: flex;
      flex-direction: column;
      gap: 16px;

      > h6 {
        font-weight: 400;
        font-size: 1rem;
        line-height: 145%;
        letter-spacing: -0.005em;
        color: $dark-50;
      }

      > p {
        font-weight: 600;
        font-size: 0.75rem;
        line-height: 140%;
        color: $error;
      }
    }
  }

  &__actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > h5 {
      font-weight: 600;
      font-size: 1rem;
      line-height: 150%;
      color: $white;
      text-transform: uppercase;
    }

    &--card {
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: center;

      &-brand {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 24px;

        > h6 {
          font-weight: 600;
          font-size: 1rem;
          line-height: 150%;
          color: $white;
          opacity: 0.7;
        }
      }

      > button {
        width: 80px;
        height: 48px;
        margin: 0;
      }
    }
  }
}

@media (min-width: 768px) {
  .msPaymentMethod {
    flex-direction: row;
    align-items: center;

    &__title {
      flex: 1;
      align-items: center;
    }

    &__actions {
      flex: 2;
      justify-content: flex-end;

      &--card {
        justify-content: flex-end;
        gap: 24px;
      }
    }
  }
}

@media (min-width: 1440px) {
  .msPaymentMethod {
    align-items: center;

    &__title {
      flex: 2;

      &-description {
        flex-direction: row;
        align-items: center;
      }
    }
  }
}
</style>
