<template>
  <div>
    <section class="s-perfil">
      <div class="container">
        <MenuLeftpProfile />
        <ContentProfile>
          <div v-if="showCreditCardForm" class="back-title">
            <TitleBack
              text="Alterar método de pagamento"
              @go-back-click="showCreditCardForm = false"
            />
          </div>
          <div v-else class="title-area">
            <h3>Assinatura</h3>
            <p>Informações sobre sua assinatura atual</p>
          </div>

          <form v-if="showCreditCardForm" @submit.prevent="updateCreditCard" class="creditCardForm">
            <h3 class="creditCardForm__title">Dados do cartão</h3>

            <ShortCheckoutPayment
              :payment-form="paymentForm"
              :initial-errors="paymentErrors"
              :show-plan-select="false"
            />
            <button type="submit" class="btn-primary" :disabled="hasCreditCardFormErrors">
              <LoaderBtn v-show="isUpdatingCard" />
              Salvar
            </button>

            <MessagePolicy button-label="Salvar" class="creditCardForm__policy" />
          </form>
          <div v-else class="panels">
            <MySignaturePanel v-if="userIsLifetime">
              <MySignatureExpirationLifetime />
            </MySignaturePanel>

            <MySignaturePanel v-if="currentSignature.filled">
              <MySignatureRenewal
                :is-recurrent="currentSignature?.isRecurrent"
                :is-sending-request="isActivatingRenewal"
                @activate-renewal="subscriptionRecurrencyOn"
              />
            </MySignaturePanel>
            <SkeletonMySignaturePanel v-else />

            <MySignaturePanel v-if="currentSignature.filled && !userIsLifetime">
              <MySignatureExpiration />
            </MySignaturePanel>
            <SkeletonMySignaturePanel v-else-if="!currentSignature.filled && !userIsLifetime" />

            <MySignaturePanel
              v-if="currentSignature.filled"
              :has-error="getLastUsedCreditCard?.isExpired"
            >
              <MySignaturePaymentMethod @edit-credit-card="showCreditCardForm = true" />
            </MySignaturePanel>
            <SkeletonMySignaturePanel v-else />
          </div>

          <div class="doubt">
            <button @click="toggleTalkToUsModal(true)">
              Dúvida sobre sua assinatura?
            </button>
          </div>
        </ContentProfile>
      </div>
    </section>

    <TalkToUsModal :isOpen="showTalkToUsModal" @closeModal="toggleTalkToUsModal($event)" />

    <AlertToasty
      v-show="status.show"
      @closeModal="closeModal($event)"
      :status="status.code"
      :message="status.message"
      :title="status.title"
    />
  </div>
</template>

<script>
import http from '@/http';
import { utils } from '@/mixins/utils.js';
import { encrypt } from '@/mixins/encrypt.js';
import { mapGetters, mapActions } from 'vuex';
import TitleBack from '@/components/TitleBack';
import LoaderBtn from '@/components/LoaderBtn';
import AlertToasty from '@/components/AlertToasty';
import MessagePolicy from '@/components/MessagePolicy';
import TalkToUsModal from '@/components/TalkToUsModal';
import { dataLayerMixin } from '@/mixins/dataLayerMixin';
import ContentProfile from '@/components/ContentProfile';
import MenuLeftpProfile from '@/components/MenuLeftpProfile';
import MySignaturePanel from '@/components/MySignaturePanel';
import MySignatureRenewal from '@/components/MySignatureRenewal';
import ShortCheckoutPayment from '@/components/ShortCheckoutPayment';
import MySignatureExpiration from '@/components/MySignatureExpiration';
import MySignaturePaymentMethod from '@/components/MySignaturePaymentMethod';
import SkeletonMySignaturePanel from '@/components/skeletons/SkeletonMySignaturePanel';
import MySignatureExpirationLifetime from '@/components/MySignatureExpirationLifetime';

const CREDIT_CARD_TYPE = 'credit_card';
const CARD_ALLOWED_ERROR = 'METHOD_UPDATED_BUT_NOT_ACTIVE';
const FALLBACK_ERROR_MESSAGE =
  'O método de pagamento foi salvo, porém não pôde ser aplicado à sua assinatura atual. Em caso de dúvidas, entre em contato com o suporte';

export default {
  name: 'MySignature',
  components: {
    TitleBack,
    LoaderBtn,
    AlertToasty,
    MessagePolicy,
    TalkToUsModal,
    ContentProfile,
    MenuLeftpProfile,
    MySignaturePanel,
    MySignatureRenewal,
    ShortCheckoutPayment,
    MySignatureExpiration,
    MySignaturePaymentMethod,
    SkeletonMySignaturePanel,
    MySignatureExpirationLifetime,
  },
  mixins: [encrypt, utils, dataLayerMixin],
  props: {
    origin: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      isUpdatingCard: false,
      isActivatingRenewal: false,
      showCreditCardForm: false,
      showTalkToUsModal: false,
      status: { message: null, code: null, show: false, title: null },
      paymentErrors: { name: '', cpf: '', cardNumber: '', cvv: '', expiry: '' },
      paymentForm: { name: null, cpf: null, cardNumber: null, cvv: null, expiry: null },
    };
  },
  computed: {
    ...mapGetters([
      'currentSignature',
      'dataUser',
      'getLastUsedCreditCard',
      'publickey',
      'renewalFlowType',
      'userIsLifetime',
    ]),
    isCreditCardSubscription() {
      return this.currentSignature?.paymentMethod === CREDIT_CARD_TYPE;
    },
    hasCreditCardFormErrors() {
      return Object.values(this.paymentForm).some((value) => !value);
    },
  },
  created() {
    this.$store.dispatch('setPublicKey');

    if (this.origin && this.origin === 'TopBarWarning') {
      this.showCreditCardForm = true;
      this.openToasty('Por favor, atualize seus dados.', 400, 'Seu cartão está vencido.');
    }
  },
  mounted() {
    const { cpf, expirationDate, holderName, isExpired } = this.getLastUsedCreditCard;
    const expiry = `${expirationDate.substring(0, 2)}/${expirationDate.substring(2)}`;

    this.paymentForm = { ...this.paymentForm, cpf, expiry, name: holderName };

    if (isExpired) {
      this.paymentErrors = {
        cardNumber: 'O cartão está vencido',
        expiry: isExpired ? 'Validade expirada' : '',
        cvv: 'Por favor, preencha o campo CVV também',
      };
    }
  },
  methods: {
    ...mapActions([
      'removePointWarningId',
      'removeTopBarWarningId',
      'setCurrentSignature',
      'setLastUsedCreditCard',
    ]),
    updateCreditCard() {
      this.isUpdatingCard = true;
      this.pushAttemptToDataLayer(
        'changePaymentMethodContinue',
        'CHANGE_PAYMENT_METHOD_SUBMIT_ATTEMPT'
      );
      const { cardNumber, cpf, cvv, expiry, name } = this.paymentForm;

      let paymentObject = {
        encrypted: this.encryptedData(this.publickey, {
          cc_number: cardNumber,
          cc_cvv: cvv,
          cc_expiry: expiry,
          cc_name: name,
        }),
        userID: this.dataUser?.userID,
      };

      if (this.isCreditCardSubscription) {
        paymentObject = { ...paymentObject, payment_method: CREDIT_CARD_TYPE };
      }

      http
        .post('/user/changePaymentMethod', paymentObject)
        .then((response) => {
          if (!response?.data?.status && response?.data?.error !== CARD_ALLOWED_ERROR) {
            this.openToasty('Erro ao salvar. Envie uma mensagem para nosso atendimento');
            this.pushErrorToDataLayer(
              'changePaymentMethodConclusion',
              'CHANGE_PAYMENT_METHOD_SUBMIT_ERROR',
              CARD_ALLOWED_ERROR
            );
            return;
          }

          this.turnOffWarnings();
          this.pushSuccessToDataLayer(
            'changePaymentMethodConclusion',
            'CHANGE_PAYMENT_METHOD_SUBMIT_SUCCESS'
          );

          this.setLastUsedCreditCard({
            isExpired: false,
            brand: this.getCardFlagBy(this.paymentForm.cardNumber),
            cpf,
            expirationDate: expiry,
            holderName: name,
            last4Digits: cardNumber.slice(-4),
          });

          if (response?.data?.error === CARD_ALLOWED_ERROR) {
            this.openToasty(response?.data?.error_plain || FALLBACK_ERROR_MESSAGE, 400);
          } else {
            this.openToasty('Seus dados foram atualizados!', 200);
          }
        })
        .catch((e) => {
          console.log('## GPRIM ## e', e);
          this.pushErrorToDataLayer(
            'changePaymentMethodConclusion',
            'CHANGE_PAYMENT_METHOD_SUBMIT_ERROR',
            'Error. ' + e?.message
          );
          this.openToasty('Erro ao salvar. Envie uma mensagem para nosso atendimento');
        })
        .finally(() => (this.isUpdatingCard = false));
    },
    subscriptionRecurrencyOn() {
      this.isActivatingRenewal = true;
      this.pushAttemptToDataLayer('recurrencyOnContinue', 'RECURRENCY_ON_ATTEMPT');

      http
        .get('/user/subscription/subscriptionRecurrencyOn')
        .then((response) => {
          if (!response?.data?.status) {
            this.openToasty('Erro ao ativar renovação. Envie uma mensagem para nosso atendimento');
            this.pushErrorToDataLayer(
              'recurrencyOnConclusion',
              'RECURRENCY_ON_ERROR',
              response?.data?.error || 'STATUS = false'
            );
            return;
          }

          this.pushSuccessToDataLayer('recurrencyOnConclusion', 'RECURRENCY_ON_SUCCESS');

          const newSignature = {
            ...this.currentSignature,
            isRecurrent: response.data?.data?.subscription?.isRecurrent,
          };
          this.setCurrentSignature(newSignature);

          this.removePointWarningId('SIGNATURE');
          this.removeTopBarWarningId('SIGNATURE');

          this.openToasty('Renovação ativada!', 200);
        })
        .catch((e) => {
          console.log('## GPRIM ## e', e);
          this.pushErrorToDataLayer(
            'recurrencyOnConclusion',
            'RECURRENCY_ON_ERROR',
            'Error. ' + e?.message
          );
          this.openToasty('Erro ao ativar renovação. Envie uma mensagem para nosso atendimento');
        })
        .finally(() => (this.isActivatingRenewal = false));
    },
    turnOffWarnings() {
      if (this.getLastUsedCreditCard.isExpired) {
        this.removePointWarningId('CREDIT_CARD');
        this.removeTopBarWarningId('CREDIT_CARD');
      }
    },
    openToasty(message, status = 500, title) {
      this.status.show = true;
      this.status.message = message;
      this.status.code = status;
      this.status.title = title;
      this.clearErrorToasty();
    },
    clearErrorToasty() {
      setTimeout(() => {
        this.status.show = false;
        this.status.message = null;
        this.status.code = null;
        this.status.title = null;
      }, 4000);
    },
    closeModal() {
      this.status.show = false;
      this.status.message = null;
      this.status.code = null;
      this.status.title = null;
    },
    toggleTalkToUsModal(value) {
      this.showTalkToUsModal = value;
    },
    pushAttemptToDataLayer(eventName, step) {
      return this.pushToDataLayer(eventName, {
        flow: this.renewalFlowType || 'unknown',
        step,
      });
    },
    pushSuccessToDataLayer(eventName, step) {
      return this.pushToDataLayer(eventName, {
        flow: this.renewalFlowType || 'unknown',
        step,
      });
    },
    pushErrorToDataLayer(eventName, step, error) {
      return this.pushToDataLayer(eventName, {
        flow: this.renewalFlowType || 'unknown',
        step,
        error,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.back-title {
  margin-bottom: 46px;
}

.title-area {
  display: none;
}

.creditCardForm {
  &__title {
    margin-bottom: 26px;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 115%;
    color: $dark-100;
  }

  /deep/ button.btn-primary {
    max-width: 100%;
  }

  &__policy {
    max-width: 100%;
    margin: 32px 0 0;
    text-align: left;

    /deep/ a {
      display: inline;
    }
  }
}

.panels {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.doubt {
  width: 100%;
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > button {
    width: 100%;
    max-width: 350px;
    padding: 1rem 2.5rem;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    line-height: 115%;
    color: $white-70;
    border: 1.5px solid $white-70;
    border-radius: 6px;
    transition: all 0.3s;

    &:hover {
      color: $dark-900;
      background-color: $white;
    }

    &[disabled] {
      pointer-events: none;
    }
  }
}

@media (min-width: 768px) {
  .back-title {
    margin-right: 25px;
    margin-left: 25px;
  }

  .title-area {
    display: block;
  }

  .creditCardForm {
    // Note: this margin is 25px because the container is already 15px (it should be 40px).
    margin: 0 25px;
    padding: 32px 152px;
    background-color: $dark-800;
    border-radius: 8px;

    /deep/ div.form-group input {
      max-width: 100%;
    }
  }

  .panels {
    gap: 24px;
  }

  .doubt {
    padding-right: 25px;

    > button {
      max-width: 315px;
    }
  }
}

@media (min-width: 1440px) {
  .creditCardForm {
    padding-right: 228px;
    padding-left: 228px;

    /deep/ div.form-group input {
      max-width: 394px;
    }

    /deep/ button.btn-primary {
      max-width: 394px;
    }
  }
}
</style>
