<template>
  <h2 class="pr__title">Parabéns por assinar a Finclass!</h2>
  <p class="pr__description">
    Complete o seu perfil agora para iniciar a sua jornada de aprendizado em investimentos.
  </p>
  <p class="pl__error" v-if="errorMessage">{{ errorMessage }}</p>
  <form @submit.prevent="submitRegister" autocomplete="off" class="pr__form">
    <div class="form-group">
      <label for="">Nome</label>
      <input
        type="text"
        v-model="name.firstname"
        v-letter
        maxlength="50"
        @input="validateInputs('firstname'), validateName($event.target.value, 'firstname')"
        placeholder="Insira seu nome"
        autofocus
        required
        :class="{ 'error-input': errors.hasOwnProperty('firstname') }"
      />
    </div>
    <div class="form-group">
      <label for="">Sobrenome</label>
      <input
        type="text"
        v-model="name.lastname"
        v-letter
        maxlength="50"
        @input="validateInputs('lastname'), validateName($event.target.value, 'lastname')"
        placeholder="Insira seu sobrenome"
        required
        :class="{ 'error-input': errors.hasOwnProperty('lastname') }"
      />
    </div>
    <div class="form-group">
      <label for="">E-mail</label>
      <input
        type="email"
        v-model="mail"
        v-lowercase
        @input="validateInputs('email')"
        required
        placeholder="Digite seu e-mail"
        :class="{ 'error-input': errors.hasOwnProperty('mail') }"
      />
    </div>
    <div class="form-group">
      <label for="">Senha</label>
      <div class="password">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          @input="validatePassword($event.target.value)"
          placeholder="Insira 8 dígitos ou mais"
          :class="{ 'error-input': errors.hasOwnProperty('password') }"
        />
        <button class="js-btn-show-password" type="button">
          <!-- <img src="@/assets/img/eye.svg" @click="togglePasswordShow" alt="Visualizar a senha" /> -->
        </button>
      </div>
    </div>
    <div class="agreement">
      <label class="checkbox-custom terms">
        Quero receber ofertas e novidades da Finclass.*
        <input type="checkbox" v-model="lgpd" />
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="form-group">
      <button type="submit" class="btn-primary" :disabled="hasErrors">
        <LoaderBtn v-show="loader" />
        Concluir cadastro
      </button>
    </div>
    <div class="form-group">
      <h5 class="dividerMessage">Já tem uma conta?</h5>
    </div>
    <div class="form-group">
      <button type="button" @click="goToLogin" class="btn-primary outline">
        Entrar
      </button>
    </div>
    <div class="form-group pr__form-policy">
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
import { encrypt } from '@/mixins/encrypt.js';
import { utils } from '@/mixins/utils.js';
import { validators } from '@/mixins/validators.js';

export default {
  name: 'CompleteProfileRegister',
  components: { LoaderBtn },
  emits: ['toggle-form', 'open-toasty'],
  mixins: [dataLayerMixin, encrypt, utils, validators],
  props: {
    dummyUserToken: {
      type: String,
      required: true,
    },
  },
  computed: {
    hasErrors() {
      return Object.keys(this.errors).length > 0;
    },
    errorMessage() {
      return this.errors && this.hasErrors ? this.errors[Object.keys(this.errors)[0]] : null;
    },
  },
  data() {
    return {
      name: { firstname: null, lastname: null },
      mail: null,
      password: null,
      lgpd: false,
      loader: false,
      showPassword: false,
      timer: null,
      errors: {},
    };
  },
  methods: {
    goToLogin() {
      this.$emit('toggle-form');
    },
    saveDatalayer(step, option) {
      this.pushToDataLayer('checkout', {
        ecommerce: { checkout: { actionField: { step, option } } },
      });
    },
    togglePasswordShow() {
      this.showPassword = !this.showPassword;
    },
    showErrorToast() {
      this.$emit('open-toasty', {
        message: 'Por favor, tente novamente em alguns instantes',
        status: 500,
        title: 'Erro ao processar sua requisição.',
      });
    },
    showSuccessToast(message) {
      this.$emit('open-toasty', { message, status: 200 });
    },
    validateInputs(inputName) {
      const inputSelected = {
        firstname: this.required(this.name.firstname),
        lastname: this.required(this.name.lastname),
        email: this.email(this.mail),
      };

      if (inputSelected[inputName]) {
        this.errors[inputName] = `Campo ${this.inputError(
          inputName
        )} deve ser preenchido corretamente`;
      } else {
        delete this.errors[inputName];
      }
    },
    validateName(name, input) {
      let fullName = '';
      name
        .toLowerCase()
        .split(' ')
        .forEach((word) => {
          fullName += ` ${word.replace(word.charAt(0), word.charAt(0).toUpperCase())}`;
        });

      this.name[input] = fullName.replace(/^[\s]|[^a-zA-ZÀ-ú\s]/g, '');
    },
    validatePassword(value) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (value.length < 8) {
          this.errors.password = 'Insira uma senha com pelo menos 8 caracteres';
        } else {
          delete this.errors.password;
        }
      }, 250);
    },
    submitRegister() {
      this.loader = true;

      const url = ''.includes('?')
        ? window.location.href.split('?')[0] + '/?' + window.location.href.split('?')[1]
        : window.location.href;

      const object = {
        firstname: this.name.firstname.trim(),
        lastname: this.name.lastname.trim(),
        email: this.mail.toLowerCase(),
        password: this.password,
        meta: { marketingConsent: this.lgpd, url },
        dummyUserToken: this.dummyUserToken,
      };

      if (!this.hasErrors) {
        this.$store
          .dispatch('completeProfile', object)
          .then(async (response) => {
            if (!response.status) {
              this.showErrorToast();
            } else {
              this.$store
                .dispatch('getUserData')
                .then(() => {
                  this.$router.push({ name: 'Home' });
                  this.pushToDataLayer('login', { login: 'entrar-cadastro-claro' });
                })
                .catch(() => this.goToLogin());
            }
          })
          .catch((err) => this.showErrorToast())
          .finally(() => (this.loader = false));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';
@import '../assets/scss/_buttons.scss';
@import '../assets/scss/_inputs.scss';
@import '../assets/scss/_dividerMessage.scss';

.pr__title {
  font-size: 1.75rem;
  max-width: 70%;
  margin-top: 1rem;
}

.pr__description {
  line-height: 145%;
}

.pl__error {
  font-size: 0.875rem;
  margin: 1rem 0;
  color: $error;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.pr__form {
  width: 100%;
  margin-top: 0.5rem;

  .form-group {
    margin-bottom: 1rem;

    > input,
    .password,
    .btn-primary {
      max-width: 100%;

      > input {
        max-width: 100%;
      }
    }

    .dividerMessage {
      margin: 2rem 0 1.5rem;

      &::before,
      &::after {
        width: 30%;
      }
    }

    &.pr__form-policy {
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

  .agreement {
    margin: 1.5rem 0 1rem;

    > .checkbox-custom {
      margin: 0;

      .checkmark {
        top: -3px;
      }
    }
  }
}

@media (min-width: 768px) {
  .pl__error {
    font-size: 1rem;
  }
}

@media (min-width: 1000px) {
  .pr__title {
    font-size: 2rem;
    max-width: 70%;
  }

  .pr__description {
    max-width: 80%;
  }

  .pl__error {
    font-size: 1.125rem;
  }
}

@media (min-width: 1440px) {
  .pr__form {
    display: flex;
    flex-wrap: wrap;

    .form-group {
      width: 100%;

      &:first-child {
        max-width: 49%;
      }

      &:nth-child(2) {
        max-width: 49%;
        margin-left: 2%;
      }

      .dividerMessage {
        margin: 1rem 0 0;
      }
    }
  }
}

@media (min-width: 1600px) {
  .pr__title {
    max-width: 50%;
  }

  .pr__description {
    max-width: 65%;
  }
}
</style>
