<template>
  <div class="msExpiration">
    <div class="msExpiration__infos">
      <div class="msExpiration__infos-days">
        <span>Assinatura</span>
        <div v-if="currentSignature.isExpired" class="msExpiration__infos-days--remaining">
          Assinatura expirada
        </div>
        <div
          v-else-if="currentSignature.remainingDays >= -30"
          class="msExpiration__infos-days--remaining"
        >
          {{ Math.abs(currentSignature.remainingDays) }} dias restantes
        </div>
      </div>

      <div class="msExpiration__infos-type">
        <div class="icon">
          <!-- <img src="@/assets/img/icon-premium-filled.svg" alt="" /> -->
        </div>
        <h6>Premium</h6>
      </div>
    </div>

    <div class="msExpiration__divider" />

    <div class="msExpiration__date">
      <div class="msExpiration__date-description">
        <p>Sua assinatura atual {{ currentSignature.isExpired ? 'expirou' : 'expira' }} em</p>
        <h5>{{ formatInstant(currentSignature?.cycleEndDate) }}</h5>
      </div>
      <button
        v-if="canShowReversalButton"
        @click="toggleShowReversalModal(true)"
        class="msExpiration__date-reversal"
      >
        {{ gatewayAllowRequestReversal ? 'Solicitar estorno' : 'Como solicitar estorno?' }}
      </button>
    </div>
  </div>

  <MySignatureModalManager
    :gateway="currentSignature.paymentGateway.toLowerCase()"
    type="REVERSAL"
    :informational-only="!gatewayAllowRequestReversal"
    :show-modal="showReversalModal"
    @close-modal="toggleShowReversalModal"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import { utils } from '@/mixins/utils.js';
import { dataLayerMixin } from '@/mixins/dataLayerMixin';
import MySignatureModalManager from '@/components/MySignatureModalManager';

const PAGARME_GATEWAY = 'pagarme';
const SEVEN_DAYS_IN_MILLISECONDS = 604800000;
const PAYMENT_GATEWAYS_WITH_REVERSAL_INFORMATION = ['pagarme', 'ios'];

export default {
  name: 'MySignatureExpiration',
  components: { MySignatureModalManager },
  mixins: [utils, dataLayerMixin],
  data() {
    return {
      showReversalModal: false,
    };
  },
  computed: {
    ...mapGetters(['currentSignature', 'renewalFlowType']),
    isReversalPeriod() {
      // Reversal period consists of 7 days after subscription (defined bu the Consumer Protection Code - CDC)
      const subscriptionStartDate = Date.parse(this.currentSignature.cycleStartDate);
      return subscriptionStartDate + SEVEN_DAYS_IN_MILLISECONDS > Date.now();
    },
    canShowReversalButton() {
      return (
        this.isReversalPeriod &&
        !this.currentSignature.isRenewed &&
        PAYMENT_GATEWAYS_WITH_REVERSAL_INFORMATION.includes(this.currentSignature.paymentGateway)
      );
    },
    gatewayAllowRequestReversal() {
      return this.currentSignature.paymentGateway === PAGARME_GATEWAY;
    },
  },
  methods: {
    toggleShowReversalModal(isOpenButton) {
      this.showReversalModal = !this.showReversalModal;

      if (isOpenButton) {
        this.pushToDataLayer('reversalStart', {
          step: 'REVERSAL_INITIAL',
          renewalButtonLabel: this.gatewayAllowRequestReversal
            ? 'Solicitar estorno'
            : 'Como solicitar estorno?',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.msExpiration {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;

  &__infos {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-days {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;

      > span {
        font-weight: 700;
        font-size: 0.75rem;
        line-height: 140%;
        color: $white;
      }

      &--remaining {
        padding: 4px 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        font-size: 0.75rem;
        background-color: $error;
        border-radius: 60px;
      }
    }

    &-type {
      display: flex;
      align-items: center;
      gap: 8px;

      > h6 {
        font-weight: 700;
        font-size: 0.875rem;
        line-height: 145%;
        letter-spacing: -0.005em;
        color: $white;
      }
    }
  }

  &__divider {
    width: 100%;
    height: 1px;
    background-color: $dark-600;
  }

  &__date {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    &-description {
      > p {
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 145%;
        letter-spacing: -0.005em;
        color: $dark-50;
      }

      > h5 {
        font-weight: 700;
        font-size: 1.25rem;
        line-height: 115%;
        color: $white;
      }
    }

    &-reversal {
      font-weight: 400;
      font-size: 0.75rem;
      line-height: 130%;
      letter-spacing: -0.005em;
      color: $dark-900;
    }
  }
}

@media (min-width: 768px) {
  .msExpiration {
    gap: 40px;

    &__infos {
      &-days {
        flex-direction: row;
        align-items: center;
        gap: 12px;

        > span {
          font-size: 1rem;
        }
      }

      &-type {
        > h6 {
          font-size: 1rem;
        }
      }
    }

    &__date {
      width: 100%;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      &-description {
        > p {
          font-size: 1rem;
        }

        > h5 {
          font-size: 1.75rem;
        }
      }
    }
  }
}

@media (min-width: 1440px) {
  .msExpiration {
    gap: 32px;

    &__date {
      &-description > h5 {
        font-size: 2rem;
      }
    }
  }
}
</style>
