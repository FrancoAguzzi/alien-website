<template>
  <div v-if="shouldShowTopBarWarning()" class="topBarWarning">
    <div @click="goToMySignaturePage" class="topBarWarning__message">
      <h6>{{ topBarWarningMessage }}</h6>
    </div>
    <button @click="closeTopBarWarning" class="topBarWarning__close">
      <img
        src="@/assets/img/close.svg"
        alt="Ícone simbolizando a ação de fechar o aviso que, ao ser clicado, remove a barra de notificação da página"
      />
    </button>
  </div>
</template>

<script>
import http from '@/http';
import { utils } from '@/mixins/utils.js';
import { mapActions, mapGetters } from 'vuex';
import { dataLayerMixin } from '@/mixins/dataLayerMixin';

const SIGNATURE_ID = 'SIGNATURE';
const CREDIT_CARD_ID = 'CREDIT_CARD';
const CREDIT_CARD_TYPE = 'credit_card';
const CREDIT_CARD_WARNING_MESSAGE = 'Você possui um aviso em Assinatura';
const NUMBER_OF_DAYS_ALERT_ON_SUBSCRIPTION_EXPIRATION = -30;

export default {
  name: 'TopBarWarning',
  mixins: [utils, dataLayerMixin],
  computed: {
    ...mapGetters(['currentSignature', 'dataUser', 'topBarWarning', 'userIsLifetime']),
    topBarWarningMessage() {
      if (this.topBarWarning.includes(CREDIT_CARD_ID)) {
        return CREDIT_CARD_WARNING_MESSAGE;
      }

      if (this.topBarWarning.includes(SIGNATURE_ID)) {
        if (this.currentSignature.remainingDays < NUMBER_OF_DAYS_ALERT_ON_SUBSCRIPTION_EXPIRATION) {
          return;
        }

        if (this.currentSignature.remainingDays === 0) {
          return `Sua assinatura expira HOJE. Renove sua assinatura`;
        }

        const daysMessage = this.currentSignature.remainingDays > 0 ? 'expirou há' : 'expira em';
        return `Sua assinatura ${daysMessage} ${Math.abs(
          this.currentSignature.remainingDays
        )} dias. Renove sua assinatura`;
      }
    },
    topBarWarningDataLayerKey() {
      if (this.topBarWarning.includes(CREDIT_CARD_ID)) {
        return 'changePaymentMethodStart';
      }
      if (this.topBarWarning.includes(SIGNATURE_ID)) {
        return 'recurrencyOnStart';
      }
    },
    appendOriginParamOnRedirect() {
      return (
        this.topBarWarning.includes(CREDIT_CARD_ID) &&
        this.topBarWarningMessage === CREDIT_CARD_WARNING_MESSAGE
      );
    },
  },
  watch: {
    currentSignature: function(value) {
      if (!value) return;
      if (value?.isRecurrent) return;

      if (value?.remainingDays >= NUMBER_OF_DAYS_ALERT_ON_SUBSCRIPTION_EXPIRATION) {
        this.addPointWarningId(SIGNATURE_ID);

        if (!this.userIsLifetime) {
          this.addTopBarWarningId(SIGNATURE_ID);
        }
      } else {
        this.removePointWarningId(SIGNATURE_ID);
        this.removeTopBarWarningId(SIGNATURE_ID);
      }
    },
    dataUser: function(value) {
      if (!value) return;
      if (!value.hasOwnProperty('userPaymentMethods') || !value.userPaymentMethods.length) return;

      const allCreditCards = value.userPaymentMethods.filter(
        (method) => method.methodType === CREDIT_CARD_TYPE
      );
      const lastUsedCreditCard = allCreditCards[allCreditCards.length - 1];

      if (lastUsedCreditCard) {
        const {
          brand,
          expiration_date,
          holder_name,
          last_digits,
        } = lastUsedCreditCard.methodDetails;

        const creditCardIsExpired = this.checkIfDateIsExpired(expiration_date);
        const cpf = value?.userDocument?.documentRegister || '';

        this.setLastUsedCreditCard({
          isExpired: creditCardIsExpired,
          brand,
          cpf,
          expirationDate: expiration_date,
          holderName: holder_name,
          last4Digits: last_digits,
        });

        if (creditCardIsExpired) {
          this.addPointWarningId(CREDIT_CARD_ID);

          if (!this.userIsLifetime) {
            this.addTopBarWarningId(CREDIT_CARD_ID);
          }
        } else {
          this.removePointWarningId(CREDIT_CARD_ID);
          this.removeTopBarWarningId(CREDIT_CARD_ID);
        }
      }
    },
  },
  created() {
    this.getPayment();
  },
  methods: {
    ...mapActions([
      'addPointWarningId',
      'addTopBarWarningId',
      'removePointWarningId',
      'removeTopBarWarningId',
      'setCurrentSignature',
      'setLastUsedCreditCard',
      'setRenewalFlowType',
      'updateShowTopBarWarning',
    ]),
    shouldShowTopBarWarning() {
      const shouldShow =
        Array.isArray(this.topBarWarning) && this.topBarWarning.length && this.topBarWarningMessage;

      this.updateShowTopBarWarning(shouldShow);

      return shouldShow;
    },
    getPayment() {
      http.get('/user/readPayment').then((response) => {
        const { subscription, subscription_cycle } = response.data.data;
        const remainingDays = this.getRemainingDaysFromTodayUntil(subscription_cycle?.endDate);

        this.setCurrentSignature({
          paymentGateway: subscription?.paymentGateway,
          paymentMethod: subscription?.paymentMethod,
          isRecurrent: subscription?.isRecurrent,
          cycleStartDate: subscription_cycle?.startDate,
          cycleEndDate: subscription_cycle?.endDate,
          isRenewed: subscription_cycle?.cycleCount > 1 || subscription?.meta?.isAutoRenewed,
          isExpired: remainingDays >= 0,
          remainingDays,
        });
      });
    },
    closeTopBarWarning() {
      if (this.topBarWarning.includes(CREDIT_CARD_ID)) {
        this.removeTopBarWarningId(CREDIT_CARD_ID);
      } else if (this.topBarWarning.includes(SIGNATURE_ID)) {
        this.removeTopBarWarningId(SIGNATURE_ID);
      }
    },
    goToMySignaturePage() {
      this.setRenewalFlowType('TOP_BAR_WARNING');

      this.pushToDataLayer(this.topBarWarningDataLayerKey, {
        flow: 'TOP_BAR_WARNING',
        step: 'TOP_BAR_WARNING_HEADER',
        message: this.topBarWarningMessage,
      });

      if (this.appendOriginParamOnRedirect) {
        return this.$router.push({ name: 'MySignature', params: { origin: 'TopBarWarning' } });
      }

      return this.$router.push({ name: 'MySignature' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';
@import '../assets/scss/_variables.scss';

.topBarWarning {
  z-index: 101;
  width: 100%;
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: $dark-900;
}

.topBarWarning__message {
  max-width: 222px;
  height: 24px;
  min-height: 24px;
  margin: 0 auto;
  padding: 4px 12px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  background-color: $dark-red;
  cursor: pointer;

  > h6 {
    font-size: 0.75rem;
    font-weight: 700;
    color: $white;
  }
}

.topBarWarning__close {
  min-width: 32px;
  min-height: 32px;
  top: 12px;
  right: 16px;
  cursor: pointer;
}

@media (min-width: 768px) {
  .topBarWarning__message {
    max-width: 340px;
  }
}
</style>
