<template>
  <RenewalThirdPartiesExplanation
    v-show="!isPagarmeFlow"
    :gateway="gateway"
    :type="type"
    :show-modal="showModal"
    @close-modal="closeModal"
  />

  <!-- Unsubscribing flow (with or without refund) for Pagarme subscriptions -->
  <RenewalLostBenefits
    v-show="isPagarmeFlow"
    :show-modal="showPagarmeFlowStep1"
    :is-reversal-flow="isReversalFlow"
    @next-step="nextStep"
    @close-modal="closeModal"
  />

  <RenewalReason
    v-show="isPagarmeFlow"
    :show-modal="showPagarmeFlowStep2"
    :form="form"
    :is-reversal-flow="isReversalFlow"
    :is-unsubscribing="isUnsubscribing"
    @next-step="isReversalFlow ? nextStep() : requestUnsubscribe()"
    @close-modal="closeModal"
  />

  <RenewalReversalConfirmation
    v-show="isPagarmeFlow"
    :show-modal="showPagarmeFlowStep3"
    :is-unsubscribing="isUnsubscribing"
    @request-reversal="requestUnsubscribe"
    @close-modal="closeModal"
  />

  <RenewalReversalSuccess
    v-if="isPagarmeFlow && isReversalFlow"
    :show-modal="showPagarmeFlowStep4"
  />
  <RenewalCancelSignatureSuccess
    v-else-if="isPagarmeFlow && !isReversalFlow"
    :show-modal="showPagarmeFlowStep4"
    @close-modal="closeModal"
  />

  <!-- In case of error in the request -->
  <Teleport to="body">
    <AlertToasty
      v-show="status.show"
      @closeModal="closeModal($event)"
      :status="status.code"
      :message="status.message"
      :title="status.title"
    />
  </Teleport>
</template>

<script>
import http from '@/http';
import { mapActions, mapGetters } from 'vuex';
import AlertToasty from '@/components/AlertToasty';
import { dataLayerMixin } from '@/mixins/dataLayerMixin';
import RenewalReason from '@/components/modals/RenewalReason';
import RenewalLostBenefits from '@/components/modals/RenewalLostBenefits';
import RenewalReversalSuccess from '@/components/modals/RenewalReversalSuccess';
import RenewalReversalConfirmation from '@/components/modals/RenewalReversalConfirmation';
import RenewalCancelSignatureSuccess from '@/components/modals/RenewalCancelSignatureSuccess';
import RenewalThirdPartiesExplanation from '@/components/modals/RenewalThirdPartiesExplanation';

const PAGARME_FLOW_STEPS = {
  LOST_BENEFITS: 1,
  REASON: 2,
  CONFIRM: 3,
  SUCCESS: 4,
};

export default {
  name: 'MySignatureModalManager',
  components: {
    AlertToasty,
    RenewalReason,
    RenewalLostBenefits,
    RenewalReversalSuccess,
    RenewalReversalConfirmation,
    RenewalCancelSignatureSuccess,
    RenewalThirdPartiesExplanation,
  },
  mixins: [dataLayerMixin],
  emits: ['closeModal'],
  props: {
    gateway: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator: (prop) => ['REVERSAL', 'ACTIVATE_RENEWAL', 'DISABLE_RENEWAL'].includes(prop),
    },
    informationalOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
    showModal: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      currentStep: PAGARME_FLOW_STEPS.LOST_BENEFITS,
      form: { reason: null, details: null },
      isUnsubscribing: false,
      status: { message: null, code: null, show: false, title: null },
    };
  },
  computed: {
    ...mapGetters(['currentSignature', 'renewalFlowType']),
    isPagarmeFlow() {
      return !this.informationalOnly && this.showModal;
    },
    isReversalFlow() {
      // Note: reversal = estorno
      return this.type === 'REVERSAL';
    },
    flowTypeDataLayerKey() {
      return this.isReversalFlow ? 'reversal' : 'recurrencyOff';
    },
    flowTypeName() {
      return this.isReversalFlow ? 'REVERSAL' : 'RECURRENCY_OFF';
    },
    showPagarmeFlowStep1() {
      return this.currentStep === PAGARME_FLOW_STEPS.LOST_BENEFITS;
    },
    showPagarmeFlowStep2() {
      return this.currentStep === PAGARME_FLOW_STEPS.REASON;
    },
    showPagarmeFlowStep3() {
      return this.currentStep === PAGARME_FLOW_STEPS.CONFIRM;
    },
    showPagarmeFlowStep4() {
      return this.currentStep === PAGARME_FLOW_STEPS.SUCCESS;
    },
  },
  methods: {
    ...mapActions(['setCurrentSignature']),
    nextStep(value = 1) {
      if (this.currentStep + value <= PAGARME_FLOW_STEPS.SUCCESS) {
        this.pushToDataLayer(`${this.flowTypeDataLayerKey}Continue`, {
          step: `${this.flowTypeName}_STEP_${this.currentStep}`,
        });

        this.currentStep += value;
      }
    },
    closeModal() {
      this.currentStep = PAGARME_FLOW_STEPS.LOST_BENEFITS;
      this.form = { reason: null, details: null };
      this.isUnsubscribing = false;
      this.status = { message: null, code: null, show: false, title: null };

      this.pushToDataLayer(`${this.flowTypeDataLayerKey}Close`, {
        step: `${this.flowTypeName}_CLOSE`,
      });

      this.$emit('closeModal');
    },
    requestUnsubscribe() {
      this.isUnsubscribing = true;
      this.pushAttemptToDataLayer();

      http
        .post('/user/register/unsubscribe', {
          cancelMotive: this.form.reason,
          cancelMotiveDetails: this.form.details,
          refund: this.isReversalFlow,
        })
        .then((response) => {
          if (response?.data?.status) {
            this.pushSuccessToDataLayer();

            if (this.isReversalFlow) {
              this.nextStep(1);
            } else {
              this.nextStep(2);
              this.setCurrentSignature({ ...this.currentSignature, isRecurrent: false });
            }
          } else {
            this.showErrorToasty();
            this.pushErrorToDataLayer(response?.data?.error || 'STATUS = false');
          }
        })
        .catch((e) => {
          this.showErrorToasty();
          this.pushErrorToDataLayer('Error. ' + e?.message);
        })
        .finally(() => (this.isUnsubscribing = false));
    },
    showErrorToasty() {
      this.openToasty(
        'Tente novamente mais tarde.',
        'Ocorreu um erro ao cancelar a sua assinatura.'
      );
    },
    openToasty(message, title, status = 500) {
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
      }, 3000);
    },
    pushAttemptToDataLayer() {
      return this.pushToDataLayer(`${this.flowTypeDataLayerKey}Continue`, {
        step: `${this.flowTypeName}_ATTEMPT`,
        reason: this.form.reason,
        reasonDetails: this.form.details,
      });
    },
    pushSuccessToDataLayer() {
      return this.pushToDataLayer(`${this.flowTypeDataLayerKey}Conclusion`, {
        step: `${this.flowTypeName}_SUCCESS`,
      });
    },
    pushErrorToDataLayer(error) {
      return this.pushToDataLayer(`${this.flowTypeDataLayerKey}Conclusion`, {
        step: `${this.flowTypeName}_ERROR`,
        error,
      });
    },
  },
};
</script>
