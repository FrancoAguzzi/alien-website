<template>
  <div>
    <div class="los__container">
      <header class="los__header">
        <!-- <img src="@/assets/img/logo-color.svg" alt="Finclass - Logo" class="los__header-logo" /> -->
      </header>

      <section class="los__steps">
        <checkout-step label="1 - Identificação" :isActive="isIdentificationStepActive" />
        <div class="divider" />
        <checkout-step label="2 - Pagamento" :isActive="isPaymentStepActive" />
        <div class="divider" />
        <checkout-step label="3 - Bem-vindo" :isActive="isWelcomeStepActive" />
      </section>

      <section class="los__main">
        <div class="los__main-price">
          <h2 class="los__main-price--title">Plataforma Finclass</h2>
          <p class="los__main-price--value">
            {{ installmentsNumberSelected }}x de <strong>{{ getInstallmentsPrice }}</strong>
          </p>
          <div class="los__main-price-duration">
            <span>RESUMO DO PEDIDO</span>
            <p>Acesso a todo conteúdo Finclass</p>
          </div>
          <!-- TODO: refactor to component -->
          <div class="form-group-cupom">
            <label for="coupon">
              Cupom de desconto
              <LoaderBtn v-show="isApplyingCoupon" />
            </label>
            <div class="form-group-cupom__ctas">
              <input
                type="text"
                id="coupon"
                v-model="coupon"
                placeholder="Digite o código do cupom"
                :readonly="appliedCoupon"
              />
              <button
                v-if="!appliedCoupon"
                type="button"
                @click="handleCouponSubmit"
                :disabled="coupon === null || isApplyingCoupon"
              >
                Validar
              </button>
              <button v-else class="remove" type="button" @click="clearCoupon">Remover</button>
            </div>
            <p :class="['coupon-application', { error: !appliedCoupon }]">
              {{ cupomApplicationMessage }}
            </p>
          </div>
          <div v-show="isPaymentStepActive || planBase.planTitle" class="los__main-price--resume">
            <div class="los__main-price--resume-line">
              <span>Plano</span>
              <span>{{ planBase.planTitle }}</span>
            </div>
            <div class="los__main-price--resume-line">
              <span>Descrição</span>
              <span>{{ planBase.planDescription || 'Parcele em até 12x s/juros' }}</span>
            </div>
          </div>
          <div
            v-if="appliedCoupon && couponPriceIsDifferent && planIsNotMonthly"
            class="los__main-price--subtotal"
          >
            <span>Subtotal</span>
            <strong>{{ finclassBasePrice }}</strong>
          </div>
          <div
            v-if="appliedCoupon && couponPriceIsDifferent && planIsNotMonthly"
            class="los__main-price--discount"
          >
            <span>Cupom de desconto</span>
            <strong>{{ getDiscountString }}</strong>
          </div>
          <p v-if="planBase.planTrialDays" class="los__main-price--free">
            Você possui {{ getTrialDaysCopy }} grátis
          </p>
          <div class="los__main-price--total">
            <span v-if="planBase.planTrialDays"> Após {{ getTrialDaysCopy }} </span>
            <span v-else>Valor total</span>
            <strong>{{ planBase.planPrice }}</strong>
          </div>
          <p v-if="planBase.planTrialDays" class="los__main-price--disclaimer">
            Após esse período, o valor de {{ planBase.planPrice }} será cobrado automaticamente no
            seu cartão de crédito. Você pode cancelar antes da data da cobrança.
          </p>
        </div>

        <div class="los__main-mobile--buttons" v-if="isIdentificationStepActive">
          <div class="form-group">
            <button class="btn-primary" @click="toggleBottomSheet('open', 'LOGIN')">
              Entrar
            </button>
          </div>
          <div class="form-group">
            <h5 class="dividerMessage">Ainda não tem uma conta?</h5>
          </div>
          <div class="form-group">
            <button class="btn-primary outline" @click="toggleBottomSheet('open', 'REGISTER')">
              Criar conta
            </button>
          </div>
          <div class="form-group los__main-form--policy">
            <message-policy buttonLabel="Concluir cadastro" />
          </div>
        </div>
        <div class="los__main-mobile--buttons" v-if="isPaymentStepActive">
          <div class="form-group">
            <button class="btn-primary" @click="toggleBottomSheet('open')">
              Fazer pagamento
            </button>
          </div>
        </div>

        <div class="los__main-form" v-if="isIdentificationStepActive && !isMobile">
          <h3 class="los__main-form--title">
            {{ showLogin ? 'Entre com sua conta' : 'Cadastro' }}
          </h3>
          <p class="los__main-form--error">{{ errorMessage }}</p>

          <form @submit.prevent="handleSubmit" autocomplete="off">
            <short-checkout-login v-if="showLogin" :loginForm="loginForm" />
            <short-checkout-register
              v-else
              :registerForm="registerForm"
              :registerFormError="registerFormError"
            />

            <div class="form-group">
              <button
                type="submit"
                class="btn-primary"
                :disabled="disableSubmitButton"
                :id="showLogin ? 'login-sign-in' : 'register-continue'"
              >
                <LoaderBtn v-show="loader" />
                {{ labels.primary }}
              </button>
            </div>
            <div class="form-group">
              <h5 class="dividerMessage">{{ labels.divider }}</h5>
            </div>
            <div class="form-group">
              <button
                type="button"
                class="btn-primary outline"
                @click="togglePanel"
                :id="showLogin ? 'login-register' : 'login-sign-in'"
              >
                {{ labels.secondary }}
              </button>
            </div>
            <div class="form-group los__main-form--policy">
              <message-policy buttonLabel="Concluir cadastro" />
            </div>
          </form>
        </div>

        <div class="los__main-form" v-if="isPaymentStepActive">
          <h3 class="los__main-form--title">Dados do cartão</h3>

          <form @submit.prevent="handlePayment" autocomplete="off">
            <short-checkout-payment
              @changed-installment-selected="updateInstallmentSelected"
              :paymentForm="paymentForm"
              :planBase="planBase"
              :appliedCoupon="appliedCoupon"
              ref="paymentErrors"
            />
            <div class="form-group">
              <button type="submit" class="btn-primary" id="payment-submit">
                <LoaderBtn v-show="loader" />
                Confirmar compra
              </button>
            </div>
          </form>
        </div>
      </section>

      <testimonial />
      <frequently-asked-questions />
      <extensive-footer />

      <AlertToasty
        v-show="status.show"
        @closeModal="closeModal($event)"
        :status="status.code"
        :message="status.message"
        :title="status.title"
      />
    </div>

    <bottom-sheet
      :title="showLogin ? 'Entre com sua conta' : 'Crie sua conta'"
      :isOpen="bottomSheetOpened && isIdentificationStepActive"
      @setIsOpen="toggleBottomSheet($event)"
      v-if="isMobile"
    >
      <p class="los__main-form--error">{{ errorMessage }}</p>

      <form @submit.prevent="handleSubmit" autocomplete="off">
        <short-checkout-login v-if="showLogin" :loginForm="loginForm" />
        <short-checkout-register
          v-else
          :registerForm="registerForm"
          :registerFormError="registerFormError"
        />

        <div class="form-group">
          <button
            type="submit"
            class="btn-primary"
            :disabled="disableSubmitButton"
            :id="showLogin ? 'login-sign-in' : 'register-continue'"
          >
            <LoaderBtn v-show="loader" />
            {{ labels.primary }}
          </button>
        </div>
      </form>
    </bottom-sheet>

    <bottom-sheet
      title="Dados do cartão"
      :isOpen="bottomSheetOpened && isPaymentStepActive"
      @setIsOpen="toggleBottomSheet($event)"
      v-if="isMobile"
    >
      <form @submit.prevent="handlePayment" autocomplete="off">
        <short-checkout-payment
          @changed-installment-selected="updateInstallmentSelected"
          :paymentForm="paymentForm"
          :planBase="planBase"
          :appliedCoupon="appliedCoupon"
          ref="paymentErrors"
        />
        <div class="form-group">
          <button type="submit" class="btn-primary">
            <LoaderBtn v-show="loader" />
            Confirmar compra
          </button>
        </div>
      </form>
    </bottom-sheet>
  </div>
</template>

<script>
import AlertToasty from '@/components/AlertToasty';
import BottomSheet from '@/components/BottomSheet';
import CheckoutStep from '@/components/CheckoutStep';
import ExtensiveFooter from '@/components/ExtensiveFooter';
import FrequentlyAskedQuestions from '@/components/FrequentlyAskedQuestions';
import LoaderBtn from '@/components/LoaderBtn';
import MessagePolicy from '@/components/MessagePolicy';
import ShortCheckoutLogin from '@/components/ShortCheckoutLogin';
import ShortCheckoutPayment from '@/components/ShortCheckoutPayment';
import ShortCheckoutRegister from '@/components/ShortCheckoutRegister';
import Testimonial from '@/components/Testimonial';
import { mapGetters } from 'vuex';
import { baseUrl } from '@/enviroment';
import { utils } from '@/mixins/utils.js';
import { encrypt } from '@/mixins/encrypt.js';
import { plans } from '@/Utils/selectsValues';
import { dataLayerMixin } from '@/mixins/dataLayerMixin';

const PANEL_MODES = { LOGIN: 'LOGIN', REGISTER: 'REGISTER' };
const STEPS = { IDENTIFICATION: 1, PAYMENT: 2 };
const MONTHLY_PLANS_IDS = ['2084798', '1383514', '1296696', '1272918'];
const INITIAL_PLAN_BASE = {
  planTrialDays: 0,
  planTitle: `Escolha uma opção no próximo passo`,
  planDescription: '',
  planPrice: 'R$ 598,80',
  planID: '',
  planInstallments: 12,
};

export default {
  name: 'ShortCheckout',
  components: {
    AlertToasty,
    BottomSheet,
    CheckoutStep,
    ExtensiveFooter,
    FrequentlyAskedQuestions,
    LoaderBtn,
    MessagePolicy,
    ShortCheckoutLogin,
    ShortCheckoutPayment,
    ShortCheckoutRegister,
    Testimonial,
  },
  mixins: [dataLayerMixin, encrypt, utils],
  data() {
    return {
      activePanel: PANEL_MODES.REGISTER,
      currentStep: STEPS.IDENTIFICATION,
      errorMessage: '',
      registerFormError: {},
      loader: false,
      bottomSheetOpened: false,
      appliedCoupon: false,
      cupomApplicationMessage: '',
      isApplyingCoupon: false,
      coupon: null,
      planBase: INITIAL_PLAN_BASE,
      finclassBasePrice: INITIAL_PLAN_BASE.planPrice,
      loginForm: { email: null, password: null },
      registerForm: { name: null, email: null, phone: null, password: null, lgpd: true },
      paymentForm: { name: null, cpf: null, cardNumber: null, cvv: null, expiry: null },
      status: { message: null, code: null, show: false, title: null },
      isMobile: false,
      installmentsNumberSelected: INITIAL_PLAN_BASE.planInstallments,
      installmentsValueSelected: INITIAL_PLAN_BASE.planPrice,
    };
  },
  computed: {
    ...mapGetters(['publickey', 'uid']),
    planIsNotMonthly() {
      return !MONTHLY_PLANS_IDS.includes(this.planBase.planID);
    },
    showLogin() {
      return this.activePanel === PANEL_MODES.LOGIN;
    },
    labels() {
      return {
        primary: this.showLogin ? 'Entrar' : 'Concluir cadastro',
        secondary: this.showLogin ? 'Criar conta' : 'Entrar',
        divider: this.showLogin ? 'Ainda não tem uma conta?' : 'Já possui uma conta?',
      };
    },
    disableSubmitButton() {
      const { lgpd, ...registerWithoutLGPD } = this.registerForm;

      return this.showLogin
        ? this.hasNullishValue(this.loginForm)
        : this.hasNullishValue(registerWithoutLGPD) || Object.keys(this.registerFormError).length;
    },
    isIdentificationStepActive() {
      return this.currentStep === STEPS.IDENTIFICATION;
    },
    isPaymentStepActive() {
      return this.currentStep === STEPS.PAYMENT;
    },
    isWelcomeStepActive() {
      return this.currentStep === STEPS.WELCOME;
    },
    getDiscountValue() {
      const finclassPriceNumber = Number(this.finclassBasePrice.substring(2).replace(',', '.'));
      const planPriceNumber = Number(this.planBase.planPrice.substring(2).replace(',', '.'));
      return (finclassPriceNumber - planPriceNumber).toFixed(2);
    },
    getDiscountString() {
      const withoutNegativeSymbol = this.getDiscountValue.toString().replace('-', '');
      return `- R$ ${withoutNegativeSymbol.replace('.', ',')}`;
    },
    getTrialDaysCopy() {
      let trialDaysLabel, trialDaysNumberFormatted;

      if (this.planBase.planTrialDays > 364) {
        trialDaysNumberFormatted = Math.floor(this.planBase.planTrialDays / 365);

        if (trialDaysNumberFormatted > 1) {
          trialDaysLabel = 'anos';
        } else {
          trialDaysLabel = 'ano';
        }
      } else {
        trialDaysLabel = 'dias';
        trialDaysNumberFormatted = this.planBase.planTrialDays;
      }

      return `${trialDaysNumberFormatted} ${trialDaysLabel}`;
    },
    couponPriceIsDifferent() {
      return (
        Number(this.planBase.planPrice.substring(2).replace(',', '.')) !==
        Number(this.finclassBasePrice.substring(2).replace(',', '.'))
      );
    },
    getInstallmentsPrice() {
      try {
        const couponTotalValue =
          this.appliedCoupon && this.planBase.planPrice
            ? this.planBase.planPrice.split('R$')[1]
            : undefined;

        const couponInstallment = this.calculateInstallmentValue(couponTotalValue);

        const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

        return couponInstallment
          ? formatter.format(couponInstallment)
          : this.calculateInstallmentValue(this.installmentsValueSelected);
      } catch (err) {
        return this.calculateInstallmentValue(this.installmentsValueSelected);
      }
    },
  },
  created() {
    const routeParams = {
      userID: this.$route.params.userID ?? null,
      step: parseInt(this.$route.query?.step) ?? STEPS.IDENTIFICATION,
      cameFromLongCheckout: this.$route.query?.cameFromLongCheckout ?? false,
    };

    this.getCouponCodeRoute();

    if (Object.values(STEPS).includes(routeParams.step) && routeParams.userID) {
      this.currentStep = routeParams.step;
      this.$store.dispatch('setUserID', routeParams.userID);
      this.setDefaultPlan();

      const step = routeParams.cameFromLongCheckout ? 3 : routeParams.step;
      const checkoutType = routeParams.cameFromLongCheckout ? 'LONG_CHECKOUT' : 'SHORT_CHECKOUT';
      this.pushToDataLayer('checkout', {
        ecommerce: { checkout: { actionField: { step } } },
        checkoutType,
      });
    } else {
      this.pushToDataLayer('checkout', {
        ecommerce: { checkout: { actionField: { step: 1 } } },
        checkoutType: 'SHORT_CHECKOUT',
      });
    }
  },
  mounted() {
    this.$store.dispatch('setPublicKey');

    this.updateIsMobile();
    window.addEventListener('resize', this.updateIsMobile);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateIsMobile);
  },
  methods: {
    calculateInstallmentValue(planPrice = this.installmentsValueSelected) {
      return planPrice
        ? parseFloat(planPrice.replace(',', '.').replace('R$', '')) /
            this.installmentsNumberSelected
        : 0;
    },
    togglePanel() {
      this.errorMessage = '';
      this.activePanel = this.showLogin ? PANEL_MODES.REGISTER : PANEL_MODES.LOGIN;
    },
    handleSubmit() {
      this.loader = true;
      if (this.showLogin) {
        this.submitLogin();
      } else {
        this.submitRegister();
      }
    },
    updateInstallmentSelected(e) {
      this.installmentsValueSelected = e.value;
      this.installmentsNumberSelected = e.index;
    },
    submitLogin() {
      this.$store
        .dispatch('loginUser', {
          email: this.loginForm.email.trim().toLowerCase(),
          password: this.loginForm.password,
        })
        .then((resp) => {
          if (!resp.status) {
            if (resp.error[0].field && resp.error[0].errorType) {
              this.errorMessage = 'Por favor, verifique seu email e/ou senha';
            } else if (resp.data.proceedToSubscription) {
              this.saveDatalayerCheckoutRegister(2);
              this.$store.dispatch('setUserID', resp.data.userID);
              this.openToasty(true, resp.error_plain, 400, 'Como é bom ter você de volta! :D');
              this.currentStep = STEPS.PAYMENT;
              this.setDefaultPlan();
            } else {
              this.errorMessage =
                'Infelizmente tivemos um problema interno - Envie um email para suporte@finclass.com';
            }

            setTimeout(() => (this.errorMessage = ''), 2000);
          } else {
            this.errorMessage = '';
            this.$store.dispatch('getUserData').then(() => {
              this.saveDatalayerCheckoutRegister(2);
              this.$router.push({ name: 'Home' });
            });
          }
        })
        .catch((err) => {
          this.errorMessage =
            'Infelizmente tivemos um problema interno - Envie um email para suporte@finclass.com';
        })
        .finally(() => (this.loader = false));
    },
    submitRegister() {
      const [firstname, ...rest] = this.registerForm.name.trim().split(' ');
      const url = ''.includes('?')
        ? window.location.href.split('?')[0] + '/?' + window.location.href.split('?')[1]
        : window.location.href;

      const object = {
        firstname,
        lastname: rest.join(' '),
        phone: this.registerForm.phone,
        email: this.registerForm.email.toLowerCase(),
        password: this.registerForm.password,
        meta: {
          marketingConsent: this.registerForm.userLGPD,
          url,
        },
      };

      if (Object.keys(this.registerFormError).length === 0) {
        grecaptcha
          .execute('6LdK77EaAAAAAMaT3OnR6vSdfwkdEDnARyLynT5W', { action: 'submit' })
          .then((token) => {
            fetch(baseUrl + 'user/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(object),
            })
              .then(async (response) => {
                const responseUser = await response.json().then((res) => res);
                this.$store.dispatch('setUserID', responseUser?.data?.user?.userID ?? '');

                if (responseUser.status) {
                  this.saveDatalayerCheckoutRegister(2);
                  this.openToasty(true, 'Cadastro criado com sucesso!', +200);
                  this.currentStep = STEPS.PAYMENT;
                  this.setDefaultPlan();
                } else {
                  if (responseUser.error == 'PROCEED_TO_SUBSCRIPTION') {
                    this.openToasty(true, responseUser.error_plain, 200);
                    this.currentStep = STEPS.PAYMENT;
                    this.setDefaultPlan();
                  } else if (responseUser.error === 'SUBSCRIPTION_IS_ON_TRIAL') {
                    this.openToasty(true, responseUser.error_plain, 200);
                  } else {
                    this.openToasty(
                      true,
                      'Por favor, tente novamente em alguns instantes',
                      500,
                      'Erro ao processar sua requisição.'
                    );
                  }
                }
              })
              .catch((err) => {
                this.openToasty(
                  true,
                  'Por favor, tente novamente em alguns instantes',
                  500,
                  'Erro ao processar sua requisição.'
                );
              })
              .finally(() => (this.loader = false));
          });
      }
    },
    handlePayment() {
      this.loader = true;
      const formErrors = Object.values(this.$refs.paymentErrors?.errors || {}).filter((err) => err);

      if (this.hasNullishValue(this.paymentForm) || formErrors.length) {
        const qtyNullFields = Object.values(this.paymentForm).filter((value) => !value).length;

        if (qtyNullFields === 5) {
          this.$refs.paymentErrors.errors.name =
            'Por favor, preencha todos os campos deste formulário.';
        }

        this.loader = false;
        return;
      }

      const url = ''.includes('?')
        ? window.location.href.split('?')[0] + '/?' + window.location.href.split('?')[1]
        : window.location.href;

      const objectToPost = {
        userID: this.uid,
        planID: this.planBase.planID,
        userDocument: this.paymentForm.cpf,
        paymentMethod: 'credit_card',
        encrypted: this.encryptedData(this.publickey, {
          cc_number: this.paymentForm.cardNumber,
          cc_cvv: this.paymentForm.cvv,
          cc_expiry: this.paymentForm.expiry,
          cc_name: this.paymentForm.name,
        }),
        userAddress: { country: 'Brazil' },
        meta: {
          url,
          cupom_code: this.appliedCoupon ? this.coupon || '' : '',
        },
      };

      fetch(baseUrl + 'user/register/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objectToPost),
      })
        .then(async (response) => {
          const resp = await response.json().then((res) => res);
          if (resp.status) {
            this.loader = false;
            this.saveDatalayerPurchase(resp?.data?.transaction?.gatewayResponseFields?.tid);

            if (!!this.getCookie('meliuzCookie') && !this.appliedCoupon) {
              this.setMeliuzTag(resp?.data?.subscription?.subscriptionID);
            }

            this.loginUserOnConfirm(resp.data?.token);
          } else {
            setTimeout(() => {
              this.loader = false;

              if (resp.data?.transaction?.gatewayResponseCode === 1016) {
                if (this.error_code === 1016) {
                  this.error_code = 0;
                  this.openToasty(true, 'Ocorreu um erro ao processar seu pagamento.', 500, 'Erro');
                } else {
                  this.error_code = resp.data?.transaction?.gatewayResponseCode;
                }
              } else {
                this.openToasty(
                  true,
                  resp.error_plain,
                  500,
                  'Ocorreu um erro ao processar seu pagamento.'
                );
              }
            }, 5000);
          }
        })
        .catch((err) => {
          this.loader = false;
          this.openToasty(
            true,
            'Por favor, tente novamente em alguns instantes',
            500,
            'Erro ao processar sua requisição.'
          );
        });
    },
    handleCouponSubmit() {
      this.isApplyingCoupon = true;

      fetch(baseUrl + 'user/register/verifyCupom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cupom_code: this.coupon.trim() }),
      })
        .then(async (response) => {
          const resp = await response.json().then((res) => res);
          this.isApplyingCoupon = false;

          if (!resp.status) {
            this.cupomApplicationMessage = 'Cupom inválido ou expirado';
          } else {
            this.planBase = { ...resp.planCupom };
            this.installmentsNumberSelected = this.planBase.planInstallments;
            this.appliedCoupon = true;
            this.cupomApplicationMessage = 'Cupom cadastrado com sucesso';
          }
        })
        .catch((err) => (this.isApplyingCoupon = false));
    },
    getCouponCodeRoute() {
      if (this.$route.query.cupom) {
        this.coupon = this.$route.query?.cupom;
        this.handleCouponSubmit();
      }
    },
    clearCoupon() {
      this.coupon = null;
      this.appliedCoupon = false;
      this.cupomApplicationMessage = '';

      if (this.currentStep === STEPS.IDENTIFICATION) {
        this.planBase = INITIAL_PLAN_BASE;
      } else {
        this.setDefaultPlan();
      }
    },
    setDefaultPlan() {
      if (!this.appliedCoupon) {
        this.planBase = { ...plans[11] };
        this.updateInstallmentSelected({
          value: INITIAL_PLAN_BASE.planPrice,
          index: INITIAL_PLAN_BASE.planInstallments,
        });
      }
    },
    loginUserOnConfirm(token) {
      this.$store.dispatch('setTokenPayment', token).then(() => {
        this.$store.dispatch('getUserData').then((response) => {
          this.$router.push({ name: 'Home' });
        });
      });
    },
    hasNullishValue(object) {
      const formValues = Object.values(object);
      return formValues.some((value) => !value);
    },
    saveDatalayerCheckoutRegister(step) {
      this.pushToDataLayer('checkout', {
        ecommerce: { checkout: { actionField: { step } } },
        checkoutType: 'SHORT_CHECKOUT',
      });
    },
    saveDatalayerPurchase(tid) {
      const email = this.registerForm?.email
        ? this.registerForm?.email?.toLowerCase().trim()
        : this.loginForm?.email?.toLowerCase().trim();

      this.pushToDataLayer('purchase', {
        ecommerce: {
          purchase: {
            actionField: {
              coupon: this.appliedCoupon ? this.coupon : '',
              revenue: parseFloat(
                this.planBase.planPrice.replace(',', '.').replace(/[^\d.-]/g, '')
              ),
              id: String(tid) || String(Math.floor(100000 + Math.random() * 900000)),
            },
            products: [
              {
                name: this.getPlanBaseCleanedTitle(this.planBase?.planTitle),
                id: this.planBase.planID,
                price: parseFloat(
                  this.planBase.planPrice.replace(',', '.').replace(/[^\d.-]/g, '')
                ),
                brand: 'Finclass',
                category: 'Full Acesso',
                variant: this.planBase.trialDays > 0 ? 'trial' : 'normal',
                quantity: 1,
              },
            ],
          },
        },
        email,
        paymentInstallments: this.getPlanBaseInstallments(this.planBase?.planTitle),
      });
    },
    clearErrorToasty() {
      setTimeout(() => {
        this.status.show = false;
        this.status.message = null;
        this.status.title = null;
      }, 3000);
    },
    openToasty(show, message, status, title) {
      this.status.show = show;
      this.status.message = message;
      this.status.code = status;
      this.status.title = title;
      this.clearErrorToasty();
    },
    toggleBottomSheet(action, target = null) {
      if (action === 'close') {
        this.bottomSheetOpened = false;
      } else {
        this.bottomSheetOpened = !this.bottomSheetOpened;
        this.activePanel = target === 'LOGIN' ? PANEL_MODES.LOGIN : PANEL_MODES.REGISTER;
      }
    },
    updateIsMobile() {
      this.isMobile = this.isMobileDevice();
    },
    setMeliuzTag(orderId) {
      const planPriceNumber = Number(this.planBase.planPrice.substring(2).replace(',', '.'));
      const MELIUZ_PERCENT_COMMISSION = '0.15';
      const PARTNER_ID = process.env.VUE_APP_MELIUZ_PARTNER_ID;
      const AUTH_TOKEN = process.env.VUE_APP_MELIUZ_AUTH_TOKEN;
      const CURRENCY = 'BRL';
      const CART_PRODUCTS = `1|${this.planBase.planID};1;${planPriceNumber}`;
      const ORDER_NUMBER = orderId;
      const TOTAL_VALUE = planPriceNumber;
      const MELIUZ_TOTAL_COMMISSION = TOTAL_VALUE * MELIUZ_PERCENT_COMMISSION;
      const XTRA = this.getCookie('meliuzCookie');

      const URL = `https://www.meliuz.com.br/pixel/pa/${PARTNER_ID}.png?auth=${AUTH_TOKEN}&cart=${CART_PRODUCTS}&commission=${MELIUZ_TOTAL_COMMISSION}&iso_currency=${CURRENCY}&order=${ORDER_NUMBER}&value=${TOTAL_VALUE}&xtra=${XTRA}`;
      document.write(`<img src="${URL}">`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';
@import '../assets/scss/_buttons.scss';
@import '../assets/scss/_inputs.scss';
@import '../assets/scss/_dividerMessage.scss';

.los__container {
  width: 89%;
  max-width: 1280px;
  min-height: 100vh;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.los__header {
  position: static;
  top: 0;
  left: 0;
  width: 100%;
  padding: 3.5rem 0 0;
  display: flex;
  justify-content: center;
}

.los__header-logo {
  max-height: 1.5rem;
  max-width: 9rem;
}

.los__steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 3rem;
}

.divider {
  opacity: 0.5;
  width: 15%; /* 200px */
  height: 2px;
  margin: 0 2.5rem;
  background: linear-gradient(179.99deg, $dark-900 -22.13%, $dark-900 110.74%);
}

.los__main {
  width: 100%;
  margin-top: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.los__main-price {
  background-color: $dark-10;
  border-radius: 0.5rem;
  padding: 4.5rem 5.125rem;
  min-width: 31.875rem;
  max-width: 520px;

  .los__main-price--title {
    font-size: 1.75rem;
    color: $dark-600;
    text-align: center;
    font-weight: 600;
  }

  .los__main-price--value {
    margin: 1rem 0 1.5rem;
    padding-bottom: 1rem;
    text-align: center;
    border-bottom: 2px solid $dark-50;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 1.5rem;
    color: $dark-400;

    strong {
      color: $dark-800;
      font-weight: 600;
      font-size: 3rem;
    }
  }

  .los__main-price-duration {
    margin: 1.5rem 0;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid $dark-50;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    font-weight: 600;

    span {
      color: $dark-700;
    }

    p {
      line-height: 145%;
      color: $dark-400;
    }
  }

  .los__main-price--resume {
    margin-top: 1.5rem;
    padding-bottom: 1.5rem;
    width: 100%;
    border-bottom: 2px solid $dark-50;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .los__main-price--resume-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      opacity: 0.8;

      :first-child {
        color: $dark-400;
        padding-right: 20px;
      }

      :last-child {
        color: $dark-600;
        width: 60%;
        text-align: left;
      }
    }
  }

  .los__main-price--subtotal,
  .los__main-price--discount {
    margin-top: 15px;
    display: flex;

    span,
    strong {
      color: $dark-400;
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 400;
    }

    strong {
      font-weight: 500;
      justify-content: space-between;
      margin-left: auto;
    }
  }

  .los__main-price--discount strong {
    color: $success;
  }

  .los__main-price--disclaimer {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: $dark-800;
    margin: 16px 0px 0 0;
  }

  .los__main-price--free {
    font-size: 1rem;
    line-height: 1.5rem;
    color: $dark-700;
    font-weight: 600;
    margin-top: 16px;
  }

  .los__main-price--total {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;

    span {
      font-size: 1rem;
      font-weight: 400 !important;
    }

    :first-child {
      color: $dark-700;
    }

    strong {
      font-weight: bold;
      color: $dark-800;
      font-size: 1.5rem;
    }
  }
}

.los__main-mobile--buttons {
  display: none;
}

.los__main-form {
  min-width: 24rem;
  margin-right: 7.875rem;

  form {
    max-width: 24rem;
  }

  .los__main-form--title {
    color: $white;
    text-align: left;
    font-weight: 600;
    margin-bottom: 2rem;
  }

  .los__main-form--error {
    font-size: 0.875rem;
    margin: 1rem 0;
    color: #f00;
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }
}

.los__main-form--policy {
  display: flex;
  justify-content: center;
  margin-top: -30px;
  margin-bottom: -30px !important;
}

/* TODO: refactor to component  */
.form-group-cupom small {
  font-size: 12px;
  color: $error;
}
.form-group-cupom {
  padding-bottom: 1.5rem;
  border-bottom: 2px solid $dark-50;
}
.coupon-application {
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  margin: 4px 0 -8px;
  color: $success;

  &.error {
    color: $error;
  }
}
.form-group-cupom .remove {
  padding-right: 8px;
}
.coupon-application {
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  margin: 4px 0 -8px;
  color: $success;

  &.error {
    color: $error;
  }
}
.form-group-cupom .remove {
  padding-right: 8px;
}
.coupon-application {
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  margin: 4px 0 -8px;
  color: $success;

  &.error {
    color: $error;
  }
}
.form-group-cupom .remove {
  padding-right: 8px;
}
.coupon-application {
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  margin: 4px 0 -8px;
  color: $success;

  &.error {
    color: $error;
  }
}
.form-group-cupom .remove {
  padding-right: 8px;
}
.form-group-cupom__ctas {
  display: flex;
}
.form-group-cupom label {
  display: flex;
  justify-content: space-between;
  line-height: 145%;
  letter-spacing: -0.005em;
  color: $dark-500;
  margin-bottom: 0.5625rem;
}
.form-group-cupom input[type='text'] {
  background: #cfcfcf;
  border-radius: 6px 0px 0px 6px;
  padding: 12px 20px;
  width: 80%;
  max-width: 370px;
  height: 48px;
  letter-spacing: -0.005em;
  color: $dark-500;
  font-size: 0.875rem;
  border: 1px solid transparent;
  -webkit-transition: border 0.3s;
  -o-transition: border 0.3s;
  transition: border 0.3s;
}
.form-group-cupom button {
  width: 20%;
  height: 48px;
  max-width: calc(370px - 20%);
  border-radius: 0px 6px 6px 0px;
  padding: 16px 0px;
  text-align: center;
  background: rgba(32, 34, 39, 0.9);
  letter-spacing: -0.005em;
  border: 1px solid transparent;
  -webkit-transition: border 0.3s;
  -o-transition: border 0.3s;
  transition: border 0.3s;
  color: $dark-700;
  background: #cfcfcf;
  margin-left: -2px;
}
.form-group-cupom input[type='text']:focus {
  border: 1px solid transparent;
}

/** [DEVICE]: Tablet/iPad */
@media (min-width: 768px) and (max-width: 1279px) {
  .los__container {
    width: 92%;
  }

  .divider {
    width: 9.375%; /* 72px */
    margin: 0 0.875rem;
  }

  .los__main {
    margin-top: 4.25rem;
    align-items: flex-start;
  }

  .los__main-price {
    border-radius: 6px;
    padding: 3.5rem 1rem;
    min-width: 20.75rem;
    width: 35%;

    .los__main-price--title {
      font-size: 1.125rem;
    }

    .los__main-price--value {
      margin: 1rem 0;
      padding-bottom: 1.5rem;
      font-size: 1rem;
      justify-content: center;

      strong {
        margin-left: 0.75rem;
        font-size: 2rem;
      }
    }

    .los__main-price--resume {
      font-size: 0.875rem;
    }

    .los__main-price--total {
      margin-top: 1.5rem;

      span {
        font-weight: 600 !important;
      }

      strong {
        font-size: 1rem;
      }
    }

    .los__main-price--disclaimer {
      margin-top: 26px;
      font-size: 1rem;
    }
  }

  .los__main-form {
    min-width: 20.75rem;
    margin-left: 2rem;
    margin-right: 8.75%;

    form {
      max-width: 20.75rem;
    }

    .los__main-form--title {
      font-size: 1.25rem;
    }
  }

  /* TODO: refactor to component  */
  .form-group-coupon label {
    font-size: 0.875rem;
  }
  .form-group-cupom input[type='text'] {
    font-size: 0.875rem;
  }
}

/** [DEVICE]: Cellphone */
@media (min-width: 320px) and (max-width: 767px) {
  .los__header {
    padding: 2.5rem 0 0;
  }

  .los__header-logo {
    max-height: 1rem;
    max-width: 6.125rem;
  }

  .los__steps {
    margin-top: 2rem;
  }

  .divider {
    width: 20%; /* 75px */
    margin: 0 0.5rem;
  }

  .los__main {
    margin-top: 3rem;
    width: 96%;
    display: flex;
    flex-direction: column;
  }

  .los__main-price {
    padding: 2rem 1rem;
    min-width: 100%;

    .los__main-price--title {
      font-size: 1.125rem;
    }

    .los__main-price--value {
      margin: 1rem 0;
      padding-bottom: 1.5rem;
      font-size: 1rem;
      justify-content: center;

      strong {
        margin-left: 0.75rem;
        font-size: 2rem;
      }
    }

    .los__main-price--resume {
      font-size: 0.875rem;
    }

    .los__main-price--total {
      margin-top: 1.25rem;
      font-size: 0.875rem;

      span {
        font-size: 1rem;
        color: var(--dark-900);
      }

      strong {
        font-size: 1rem;
      }
    }
  }

  .los__main-mobile--buttons {
    width: 100%;
    display: flex;
    flex-direction: column;

    .form-group {
      button {
        max-width: 100%;
      }

      .dividerMessage {
        padding: 0 2rem;
      }
    }
  }

  .los__main-form {
    display: none;
  }

  /* TODO: refactor to component  */
  .form-group-coupon label {
    font-size: 0.875rem;
  }
  .form-group-cupom input[type='text'] {
    font-size: 0.875rem;
    min-width: 80%;
  }
  .form-group-cupom button {
    min-width: 20%;
  }
}

.form-group .btn-primary {
  max-width: 100% !important;
}

@media (max-width: 450px) {
  .los__main-price .los__main-price--resume .los__main-price--resume-line {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;

    span:last-child {
      width: unset;
    }
  }

  .los__main-mobile--buttons {
    .form-group .dividerMessage {
      padding: 0;
    }
  }
}

@media (hover: none) {
  .los__main-form form .form-group button:hover {
    background-color: inherit;
    color: $dark-900;
  }
}
</style>
