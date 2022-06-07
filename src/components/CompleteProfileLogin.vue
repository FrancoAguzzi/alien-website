<template>
  <h6 class="pl__introduction">Acesse o maior aplicativo de</h6>
  <h2 class="pl__title">Educação financeira do mundo!</h2>
  <p class="pl__error" v-if="errorMessage">{{ errorMessage }}</p>
  <form @submit.prevent="submitLogin" autocomplete="off" class="pl__form">
    <div class="form-group">
      <label for="">E-mail</label>
      <input type="email" v-model="email" v-lowercase required placeholder="Insira seu e-mail" />
    </div>
    <div class="form-group">
      <label for="">Senha</label>
      <div class="password">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          placeholder="Insira 8 dígitos ou mais"
        />
        <button class="js-btn-show-password" type="button">
          <!-- <img src="@/assets/img/eye.svg" @click="togglePasswordShow" alt="Visualizar a senha" /> -->
        </button>
      </div>
    </div>
    <div class="form-group pl__form-forgot">
      <button type="button" @click="goToPasswordRecovery" class="pl__form-forgot--inner">
        Recuperar senha 
        <!-- <img src="@/assets/img/clock.svg" alt="Recuperar senha" /> -->
      </button>
    </div>
    <div class="form-group">
      <button type="submit" class="btn-primary" :disabled="disableSubmitButton">
        <LoaderBtn v-show="loader" />
        Entrar
      </button>
    </div>
    <div class="form-group">
      <h5 class="dividerMessage">Ainda não tem uma conta?</h5>
    </div>
    <div class="form-group">
      <button type="button" @click="goToRegister" class="btn-primary outline">
        Criar conta
      </button>
    </div>
    <div class="form-group pl__form-policy">
      Ao ”clicar” no botão Concluir cadastro, você aceita nossos
      <router-link to="/privacy-policy/5" target="_blank">termos de uso</router-link>
      e
      <router-link to="/privacy-policy" target="_blank"> política de privacidade </router-link>
    </div>
  </form>
</template>

<script>
import LoaderBtn from '@/components/LoaderBtn';
import { dataLayerMixin } from '@/mixins/dataLayerMixin';

const MS_TO_HIDE_ERROR_MESSAGE = 3000;

export default {
  name: 'CompleteProfileLogin',
  components: { LoaderBtn },
  emits: ['toggle-form'],
  mixins: [dataLayerMixin],
  props: {
    dummyUserToken: {
      type: String,
      required: true,
    },
  },
  computed: {
    disableSubmitButton() {
      return [this.email, this.password].some((value) => !value);
    },
  },
  data() {
    return {
      email: null,
      password: null,
      loader: false,
      showPassword: false,
      errorMessage: '',
    };
  },
  methods: {
    goToRegister() {
      this.$emit('toggle-form');
    },
    goToPasswordRecovery() {
      this.$router.push({
        name: 'ForgotPassword',
        query: this.$route.query,
        params: { source: 'PARTNER' },
      });
    },
    togglePasswordShow() {
      this.showPassword = !this.showPassword;
    },
    showInternalError() {
      this.errorMessage =
        'Infelizmente tivemos um problema interno - Envie um email para suporte@finclass.com';

      setTimeout(() => (this.errorMessage = ''), MS_TO_HIDE_ERROR_MESSAGE);
    },
    saveDatalayer(step, option) {
      this.pushToDataLayer('checkout', {
        ecommerce: { checkout: { actionField: { step, option } } },
      });
    },
    submitLogin() {
      const email = this.email.trim().toLowerCase();

      this.loader = true;
      this.$store
        .dispatch('loginUser', { email, password: this.password })
        .then((resp) => {
          if (!resp.status) {
            if (resp.error[0].field && resp.error[0].errorType) {
              this.errorMessage = 'Por favor, verifique seu email e/ou senha';
              setTimeout(() => (this.errorMessage = ''), MS_TO_HIDE_ERROR_MESSAGE);
            } else if (resp.error_plain) {
              this.errorMessage = resp.error_plain;
              setTimeout(() => (this.errorMessage = ''), MS_TO_HIDE_ERROR_MESSAGE);
              this.goToRegister();
            } else {
              this.showInternalError();
            }
          } else {
            this.errorMessage = '';

            const object = {
              email,
              password: this.password,
              dummyUserToken: this.dummyUserToken,
              userToken: resp.data.token,
            };

            this.$store.dispatch('completeProfile', object).then((response) => {
              const isCompletedProfile = response.status;
              const message = !isCompletedProfile ? 'Não foi possível completar seu perfil.' : '';
              const dlKey = isCompletedProfile ? 'entrar-login-claro' : 'entrar-login-claro-erro';

              this.$store
                .dispatch('getUserData')
                .then(() => this.saveDatalayer(2, dlKey))
                .catch(() => console.err('Login failed'))
                .finally(() =>
                  this.$router.push({ name: 'Home', params: { redirectReason: message } })
                );
            });
          }
        })
        .catch(() => this.showInternalError())
        .finally(() => (this.loader = false));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';
@import '../assets/scss/_buttons.scss';
@import '../assets/scss/_inputs.scss';
@import '../assets/scss/_dividerMessage.scss';

.pl__introduction {
  font-size: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  margin-top: 1.5rem;
}

.pl__title {
  font-size: 2rem;
  max-width: 85%;
  margin-top: -0.5rem;
}

.pl__error {
  font-size: 0.875rem;
  margin: 1rem 0;
  color: $error;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.pl__form {
  width: 100%;
  margin-top: 1rem;

  .form-group {
    &.pl__form-forgot {
      display: flex;
      justify-content: flex-end;

      .pl__form-forgot--inner {
        display: flex;
        align-items: flex-start;
        line-height: 140%;
        font-size: 0.875rem;
        opacity: 0.9;
        margin-right: 1rem;

        > img {
          margin-left: 0.875rem;
        }
      }
    }

    > input,
    .password,
    .btn-primary {
      max-width: 100%;

      > input {
        max-width: 100%;
      }
    }

    .dividerMessage {
      &::before,
      &::after {
        width: 20%;
      }
    }

    &.pl__form-policy {
      margin-bottom: 3.5rem;
      font-size: 0.875rem;
      font-weight: 400;
      color: $white;
      opacity: 0.9;
      line-height: 140%;
      text-align: left;

      a {
        display: inline-block;
        text-decoration-line: underline;
        transition: color 0.3s;
        &:hover {
          color: $dark-900;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .pl__error {
    font-size: 1rem;
  }

  .pl__form .form-group {
    &.pl__form-forgot .pl__form-forgot--inner {
      font-size: 1rem;
    }
  }
}

@media (min-width: 1000px) {
  .pl__title {
    max-width: 80%;
  }

  .pl__error {
    font-size: 1.125rem;
  }
}

@media (min-width: 1600px) {
  .pl__title {
    max-width: 55%;
  }
}
</style>
