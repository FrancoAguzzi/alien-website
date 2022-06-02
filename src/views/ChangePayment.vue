<template>
  <div class="changePayment">
    <h2 class="changePayment__title">Alterar método de pagamento</h2>

    <form @submit.prevent="updateCreditCard" class="changePayment__form">
      <h3 class="changePayment__form-title">Dados do cartão</h3>

      <ShortCheckoutPayment
        :payment-form="paymentForm"
        :initial-errors="paymentErrors"
        :show-plan-select="false"
      />
      <button type="submit" class="btn-primary" :disabled="hasCreditCardFormErrors">
        <LoaderBtn v-show="isUpdatingCard" />
        Atualizar pagamento
      </button>

      <MessagePolicy button-label="Atualizar pagamento" class="changePayment__form-policy" />
    </form>

    <AlertToasty
      v-show="status.show"
      @closeModal="closeModal"
      :status="status.code"
      :message="status.message"
      :title="status.title"
    />
  </div>
</template>

<script>
import http from '@/http';
import { mapGetters } from 'vuex';
import { encrypt } from '@/mixins/encrypt.js';
import LoaderBtn from '@/components/LoaderBtn';
import AlertToasty from '@/components/AlertToasty';
import MessagePolicy from '@/components/MessagePolicy';
import TalkToUsModal from '@/components/TalkToUsModal';
import ShortCheckoutPayment from '@/components/ShortCheckoutPayment';

export default {
  name: 'ChangePayment',
  components: {
    LoaderBtn,
    AlertToasty,
    MessagePolicy,
    TalkToUsModal,
    ShortCheckoutPayment,
  },
  mixins: [encrypt],
  data() {
    return {
      isUpdatingCard: false,
      status: { message: null, code: null, show: false, title: null },
      paymentErrors: { name: '', cpf: '', cardNumber: '', cvv: '', expiry: '' },
      paymentForm: { name: null, cpf: null, cardNumber: null, cvv: null, expiry: null },
    };
  },
  computed: {
    ...mapGetters(['publickey']),
    hasCreditCardFormErrors() {
      return Object.values(this.paymentForm).some((value) => !value);
    },
  },
  created() {
    this.$store.dispatch('setPublicKey');
  },
  methods: {
    updateCreditCard() {
      this.isUpdatingCard = true;
      const { cardNumber, cvv, expiry, name } = this.paymentForm;

      let paymentObject = {
        encrypted: this.encryptedData(this.publickey, {
          cc_number: cardNumber,
          cc_cvv: cvv,
          cc_expiry: expiry,
          cc_name: name,
        }),
        payment_method: 'credit_card',
        userID: this.$route.params.userID,
      };

      http
        .post('/user/changePaymentMethod', paymentObject)
        .then((response) => {
          if (!response?.data?.status) {
            this.openToasty(
              'Por favor, entre em contato conosco através do e-mail suporte@finclass.com ou Whatsapp: (11) 4871-4353.',
              500,
              'Ops! Ocorreu algum erro.'
            );
            return;
          }

          this.openToasty(
            'Você será direcionado para a página de login em instantes...',
            200,
            'Sucesso'
          );

          setTimeout(() => {
            this.$router.push({ name: 'Login' });
          }, 3000);
        })
        .catch((e) => {
          console.log('## GPRIM ## e', e);
          this.openToasty('Erro ao salvar. Envie uma mensagem para nosso atendimento');
        })
        .finally(() => (this.isUpdatingCard = false));
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
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.changePayment {
  &__title {
    margin: 48px auto 40px;
    font-weight: 700;
    font-size: 1rem;
    line-height: 150%;
    text-align: center;
    letter-spacing: -0.005em;
    color: $white;
  }

  &__form {
    max-width: 100%;
    margin: 0 20px 48px;

    &-title {
      margin-bottom: 26px;
      font-weight: 700;
      font-size: 1.25rem;
      line-height: 115%;
      color: $dark-100;
    }

    &-policy {
      max-width: 100%;
      margin: 32px 0 0;
      text-align: left;

      /deep/ a {
        display: inline;
      }
    }

    &-help {
      margin-top: 28px;
    }

    /deep/ button.btn-primary {
      max-width: 100%;
    }

    /deep/ .form-group input {
      max-width: 100%;
    }
  }
}

@media (min-width: 768px) {
  .changePayment {
    &__title {
      margin: 44px auto 32px;
      font-size: 1.5rem;
    }

    &__form {
      padding: 32px 152px;
      background: $dark-800;
      border-radius: 8px;
    }
  }
}

@media (min-width: 1440px) {
  .changePayment {
    &__title {
      margin: 64px auto 36px;
      font-size: 2rem;
    }

    &__form {
      max-width: 840px;
      margin: 0 auto 32px;
      padding: 48px 228px 48px;
    }
  }
}
</style>
