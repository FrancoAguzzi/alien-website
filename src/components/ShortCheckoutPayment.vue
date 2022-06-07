<template>
  <div class="form-group text-uppercase">
    <label for="">Nome do dono do cartão</label>
    <input
      type="text"
      id="payment-name"
      v-model="paymentForm.name"
      @blur="validateName($event.target.value)"
      ref="name"
      :autofocus="'autofocus'"
      placeholder="Digite o nome do titular do cartão"
      :class="{ 'error-input': errors.name !== '' }"
    />
  </div>
  <div class="form-group">
    <label for="">CPF do dono do cartão</label>
    <input
      type="text"
      id="payment-cpf"
      v-model="paymentForm.cpf"
      @input="validateCPF($event.target.value)"
      maxlength="14"
      placeholder="Digite o CPF do titular"
      :class="{ 'error-input': errors.cpf !== '' }"
    />
  </div>
  <div class="form-group">
    <label for="">Número do cartão</label>
    <input
      type="text"
      id="payment-card-number"
      v-model="paymentForm.cardNumber"
      @input="numberOnly($event.target), validateCard($event.target.value)"
      maxlength="19"
      placeholder="Digite o número do cartão"
      :class="{ 'error-input': errors.cardNumber !== '' }"
    />
  </div>
  <div class="form-double">
    <div class="form-group">
      <label for="">Validade</label>
      <input
        type="text"
        id="payment-card-expiry"
        v-model="paymentForm.expiry"
        @input="formatValidate($event.target.value)"
        maxlength="5"
        placeholder="MM/AA"
        :class="{ 'error-input': errors.expiry !== '' }"
      />
    </div>
    <div class="form-group">
      <label for="">
        CVV
        <div class="tooltip">
          <!-- <img src="@/assets/img/icon-info.svg" /> -->
          <div class="ballon">
            <p>
              CVV é um código de segurança de 3 dígitos, impresso no verso de cartões de crédito.
            </p>
            <div class="icon">
              <!-- <img src="@/assets/img/icon-card.svg" alt="" /> -->
            </div>
          </div>
        </div>
      </label>
      <input
        type="text"
        id="payment-card-cvv"
        @input="numberOnly($event.target), validateCvv($event.target.value)"
        v-model="paymentForm.cvv"
        placeholder=""
        maxlength="4"
        :class="{ 'error-input': errors.cvv !== '' }"
      />
    </div>
  </div>
  <div v-if="showPlanSelect" class="form-group">
    <label for="">Forma de pagamento</label>
    <div class="select-custom" :class="showSelect && !appliedCoupon ? 'active' : ''">
      <div class="item-selected" @click="showSelect = !showSelect">
        <div>
          <span>{{ planBase.planDescription }}</span>
        </div>
        <!-- <img src="@/assets/img/caret-select.svg" alt="" class="arrow" /> -->
      </div>
      <div class="drop-select">
        <div class="wrap-content">
          <div
            class="list"
            v-for="(plan, index) in plans"
            :key="index"
            @click="selectPlan(plan, index)"
          >
            {{ plan.planDescription }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <ul v-if="errors">
    <li v-if="errors.name" class="error-message">{{ errors.name }}</li>
    <li v-if="errors.cpf" class="error-message">{{ errors.cpf }}</li>
    <li v-if="errors.cardNumber" class="error-message">{{ errors.cardNumber }}</li>
    <li v-if="errors.expiry" class="error-message">{{ errors.expiry }}</li>
    <li v-if="errors.cvv" class="error-message">{{ errors.cvv }}</li>
  </ul>
</template>

<script>
import { utils } from '@/mixins/utils.js';
import { plans } from '@/Utils/selectsValues';

const ERROR_FIELDS = { name: '', cpf: '', cardNumber: '', expiry: '', cvv: '' };

export default {
  name: 'ShortCheckoutPayment',
  emits: ['changedInstallmentSelected'],
  mixins: [utils],
  props: {
    paymentForm: {
      type: Object,
      default() {
        return { name: null, cpf: null, cardNumber: null, cvv: null, expiry: null };
      },
    },
    planBase: {
      type: Object,
      default() {
        return { planTrialDays: 0, planTitle: '', planDescription: '', planPrice: '', planID: '' };
      },
    },
    appliedCoupon: {
      type: Boolean,
      default: false,
    },
    showPlanSelect: {
      type: Boolean,
      required: false,
      default: true,
    },
    initialErrors: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      showSelect: false,
      plans: [...plans],
      errors: ERROR_FIELDS,
    };
  },
  watch: {
    paymentForm(value) {
      if (value.hasOwnProperty('cpf') && value.cpf) {
        this.validateCPF(value.cpf);
      }
    },
    initialErrors(value) {
      if (value) {
        this.errors = { ...this.errors, ...this.initialErrors };
      }
    },
  },
  mounted() {
    if (this.paymentForm.hasOwnProperty('cpf') && this.paymentForm.cpf) {
      this.validateCPF(this.paymentForm.cpf);
    }

    if (this.initialErrors) {
      this.errors = { ...this.errors, ...this.initialErrors };
    }
  },
  methods: {
    // TODO: move validations to validators.js
    validateName(value) {
      if (!this.checkFullName(value)) {
        this.errors.name = 'Insira o nome completo impresso no cartão de crédito';
      } else {
        this.errors.name = '';
      }
    },
    validateCPF(cpfNumber) {
      this.paymentForm.cpf = this.numericOnly(cpfNumber);
      if (this.paymentForm.cpf.length === 11) {
        this.errors.cpf = this.checkIfCpfIsValid(this.paymentForm.cpf);
        if (this.errors.cpf) {
          this.paymentForm.cpf = this.cpfFormater(this.paymentForm.cpf);
          this.errors.cpf = '';
        } else {
          this.errors.cpf = 'Número de CPF inválido';
        }
      } else {
        this.errors.cpf = 'Preencha com 11 dígitos';
      }
    },
    validateCard(value) {
      this.paymentForm.cardNumber = this.numericOnly(this.paymentForm.cardNumber);
      if (this.paymentForm.cardNumber.length > 14) {
        this.errors.cardNumber =
          this.paymentForm.cardNumber.length === 15
            ? this.checkCardNumberisValidOdd(this.paymentForm.cardNumber)
            : this.checkCardNumberisValidEven(this.paymentForm.cardNumber);
        if (this.errors.cardNumber) {
          this.paymentForm.cardNumber = this.cardFormater(this.paymentForm.cardNumber);
          this.errors.cardNumber = '';
        } else {
          this.errors.cardNumber = 'Número de cartão inválido';
        }
      } else {
        this.errors.cardNumber = 'Informe todos os números.';
      }
    },
    validateCvv(value) {
      if (value.length < 3) {
        this.errors.cvv = 'Complete os números.';
      } else {
        this.errors.cvv = '';
      }
    },
    numberOnly(input) {
      const value = this.numericOnly(input.value);
      input.value = value;
    },
    formatValidate(date) {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date()
        .getFullYear()
        .toString()
        .substr(-2);
      this.paymentForm.expiry = date.replace(/(\d{2})\/?(\d{2})/, '$1/$2');

      if (this.paymentForm.expiry.length > 4) {
        const inputMonth = date.replace(/(\d{2})\/?(\d{2})/, '$1');
        const inputYear = date.replace(/(\d{2})\/?(\d{2})/, '$2');
        if (
          +inputYear < currentYear ||
          (+inputYear === +currentYear && +inputMonth <= +currentMonth) ||
          +inputMonth > 12
        ) {
          this.errors.expiry = 'Data inválida.';
        } else {
          this.errors.expiry = '';
        }
      } else {
        this.errors.expiry = 'Data inválida.';
      }
    },
    selectPlan(plan, idx) {
      this.showSelect = !this.showSelect;
      this.planBase.planTitle = plan.planTitle;
      this.planBase.planDescription = plan.planDescription;
      this.planBase.planPrice = plan.planPrice;
      this.planBase.planID = plan.planID;
      this.planBase.trialDays = plan.trialDays;
      this.$emit('changedInstallmentSelected', { value: plan.planPrice, index: idx + 1 });
    },
  },
  created() {
    this.$nextTick(function() {
      document.activeElement.blur();
      if (this.$refs.name) {
        this.$refs.name.focus();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.text-uppercase {
  input[type='text'] {
    text-transform: uppercase;
  }
  input[type='text']::placeholder {
    text-transform: none;
  }
}

.error-message {
  font-size: 0.87rem;
  color: #f00;
  margin-left: 0.5rem;
}
</style>
