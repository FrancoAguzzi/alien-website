<template>
  <p class="error-message" v-if="registerFormError !== {}">
    {{ registerFormError[Object.keys(registerFormError)[0]] }}
  </p>
  <div class="form-group">
    <label for="">Nome completo</label>
    <input
      type="text"
      id="register-name"
      v-model="registerForm.name"
      v-letter
      @input="formatName($event.target.value, 'name'), validateInputs('name')"
      @focus="currentFocus = 'name'"
      ref="name"
      required
      maxlength="50"
      :autofocus="'autofocus'"
      placeholder="Digite seu nome"
      :class="{ 'error-input': registerFormError.hasOwnProperty('name') }"
    />
  </div>
  <div class="form-group">
    <label for="">E-mail</label>
    <input
      type="email"
      id="register-email"
      v-model="registerForm.email"
      v-lowercase
      @input="validateInputs('email')"
      @focus="currentFocus = 'other'"
      required
      placeholder="Digite seu e-mail"
      :class="{ 'error-input': registerFormError.hasOwnProperty('email') }"
    />
  </div>
  <div class="form-group">
    <label for="">Celular</label>
    <input
      type="text"
      id="register-phone"
      v-model="registerForm.phone"
      @input="formatPhone($event.target.value), validateInputs('phone')"
      @focus="currentFocus = 'other'"
      maxlength="15"
      placeholder="(11) 99999-9999"
      :class="{ 'error-input': registerFormError.hasOwnProperty('phone') }"
    />
  </div>
  <div class="form-group">
    <label for="">Senha</label>
    <div class="password">
      <input
        :type="showPassword ? 'text' : 'password'"
        id="register-password"
        v-model="registerForm.password"
        @input="validatePassword($event.target.value)"
        @focus="currentFocus = 'other'"
        required
        placeholder="Insira sua senha"
        :class="{ 'error-input': registerFormError.hasOwnProperty('password') }"
      />
      <button class="js-btn-show-password" type="button">
        <img src="@/assets/img/eye.svg" @click="togglePasswordShow" alt="Visualizar a senha" />
      </button>
    </div>
  </div>
  <div class="agreement" :style="{ display: hideBottom ? 'none' : 'flex' }">
    <label class="checkbox-custom terms">
      Quero receber ofertas e novidades da Finclass.
      <input type="checkbox" v-model="registerForm.lgpd" />
      <span class="checkmark"></span>
    </label>
  </div>
</template>

<script>
import { utils } from '@/mixins/utils.js';
import { validators } from '@/mixins/validators.js';

export default {
  name: 'ShortCheckoutRegister',
  mixins: [utils, validators],
  props: {
    registerForm: {
      type: Object,
      default() {
        return { name: null, email: null, phone: null, password: null, lgpd: true };
      },
    },
    registerFormError: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      showPassword: false,
      timer: null,
      currentFocus: '',
      hideBottom: false,
    };
  },
  methods: {
    togglePasswordShow() {
      this.showPassword = !this.showPassword;
    },
    formatName(name) {
      let fullName = '';
      name
        .toLowerCase()
        .split(' ')
        .forEach((word) => {
          fullName += ` ${word.replace(word.charAt(0), word.charAt(0).toUpperCase())}`;
        });

      this.registerForm.name = fullName.replace(/^[\s]|[^a-zA-ZÀ-ú\s]/g, '');
    },
    formatPhone(phone) {
      if (phone !== null && phone !== '') {
        this.registerForm.phone = this.numberCellPhone(phone.substring(0, 11));
      }
    },
    validateInputs(inputName) {
      var inputSelected = {
        name: this.lessThanTwoWords(this.registerForm[inputName]),
        email: this.email(this.registerForm[inputName]),
        phone: this.required(this.registerForm[inputName]),
      };

      if (inputSelected[inputName]) {
        const complement =
          inputName === 'name'
            ? 'deve conter nome e sobrenome'
            : 'deve ser preenchido corretamente';
        this.registerFormError[inputName] = `Campo ${this.inputError(inputName)} ${complement}`;
      } else {
        delete this.registerFormError[inputName];
      }
    },
    validatePassword(value) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (value.length < 8) {
          this.registerFormError.password = 'Insira uma senha com pelo menos 8 caracteres';
        } else {
          delete this.registerFormError.password;
        }
      }, 250);
    },
  },
  watch: {
    currentFocus: function(cur, old) {
      document.activeElement.parentNode.scrollIntoView({ block: 'end', behavior: 'smooth' });

      if (cur === 'name' && this.isMobileDevice()) {
        this.hideBottom = true;
      } else {
        this.hideBottom = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';
@import '../assets/scss/_inputs.scss';

.error-message {
  font-size: 0.875rem;
  margin: 1rem 0;
  color: #f00;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.agreement {
  margin-top: 1rem;
  display: flex;
  justify-content: center;

  .terms {
    line-height: 110%;
  }
}
</style>
