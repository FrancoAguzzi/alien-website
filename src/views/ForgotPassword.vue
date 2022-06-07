<template>
  <div>
    <HeaderOffline />
    <section class="s-forgot form-user bg-form">
      <div class="box">
        <div class="container-form">
          <div class="steps">
            <span>passo:</span>
            <ul>
              <li class="current">{{ stepper }}</li>
              <li>3</li>
            </ul>
          </div>
          <h3>Recuperar senha</h3>
          <div class="error-msg" v-show="msgError !== null">
            <small>{{ msgError }}</small>
          </div>
          <div :class="stepper === 1 ? 'types-forgot show' : 'types-forgot'">
            <div class="types-forgot-title">
              <span>E-mail </span>
            </div>
            <div class="tab-content">
              <div :class="'tab-pane'">
                <p>Enviaremos uma mensagem de texto com um código de redefinição da sua senha.</p>
                <form @submit.prevent="recoverByPhone" autocomplete="off">
                  <CountryPhoneSelect
                    :userSelected="userContact"
                    @setInputPhone="setPhone($event)"
                    @setCountryCh="setCountry($event)"
                  />
                  <div class="form-group">
                    <button
                      :disabled="!validators.phone"
                      class="btn-primary"
                      type="button"
                      id="js-continue-type-phone"
                    >
                      Continuar
                    </button>
                  </div>
                  <div class="form-group">
                    <a @click="goToLogin" class="btn-cancel">Cancelar</a>
                  </div>
                </form>
              </div>
              <div :class="'tab-pane active'">
                <p>Preencha o campo abaixo que enviaremos um link de recuperação de senha.</p>
                <form @submit.prevent="recoverByEmail" autocomplete="off">
                  <div class="form-group">
                    <input
                      type="email"
                      placeholder="Digite seu e-mail"
                      v-model="userContact.email"
                    />
                  </div>
                  <div class="form-group">
                    <button :disabled="validators.email" type="submit" class="btn-primary">
                      <LoaderBtn v-show="loader" />
                      Continuar
                    </button>
                  </div>
                  <div class="form-group">
                    <a @click="goToLogin" class="btn-cancel">Cancelar</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div :class="stepper === 2 ? 'area-code-verification show' : 'area-code-verification'">
            <p>
              Insira o código enviado para o número ou e-mail
              <!--strong>{{+55 11 9 7777 - 9888}}</strong-->
            </p>
            <form @submit.prevent="sendValidationToken" autocomplete="off">
              <div class="form-group">
                <div class="code">
                  <input
                    type="text"
                    v-model="tokenRecover"
                    class="token"
                    maxlength="6"
                    @input="inputToken($event.target.value)"
                  />
                </div>
              </div>
              <div class="form-group">
                <button
                  :disabled="!validators.token"
                  type="submit"
                  class="btn-primary"
                  id="js-btn-confirm-code"
                >
                  <LoaderBtn v-show="loader" />
                  Confirmar
                </button>
              </div>
              <div class="form-group">
                <button
                  :disabled="timer > 0"
                  type="button"
                  class="btn-primary btn-resend"
                  id="js-btn-confirm-resend"
                  @click.prevent="recoverByEmail"
                >
                  <span v-if="timer > 0">
                    Enviar novamente o código em
                    <strong> 00:{{ timer > 9 ? timer : '0' + timer }}</strong>
                  </span>
                  <span v-else> Enviar código novamente </span>
                </button>
              </div>
            </form>
          </div>
          <div class="new-password" :class="stepper === 3 ? 'show' : ''">
            <form @submit.prevent="sendNewPassword" autocomplete="off">
              <div class="form-group">
                <label for="">Senha</label>
                <div class="password">
                  <input
                    v-model="userContact.password"
                    :type="!showPassword ? 'password' : 'text'"
                    placeholder="Insira sua senha"
                    @input="validateNewPassword($event.target.value)"
                  />
                  <button
                    class="js-btn-show-password"
                    type="button"
                    @click="showPassword = !showPassword"
                  >
                    <!-- <img src="@/assets/img/eye.svg" alt="" /> -->
                  </button>
                </div>
                <small v-show="!validators.password"
                  >Insira uma senha com pelo menos 8 caracteres</small
                >
              </div>
              <div class="form-group">
                <label for="">Confirmar senha</label>
                <div class="password">
                  <input
                    v-model="userContact.passwordConfirm"
                    :type="!showPasswordConfirm ? 'password' : 'text'"
                    placeholder="Insira sua senha"
                    @blur="checkPasswordAreSame"
                  />
                  <button
                    class="js-btn-show-password"
                    type="button"
                    @click="showPasswordConfirm = !showPasswordConfirm"
                  >
                    <!-- <img src="@/assets/img/eye.svg" alt="" /> -->
                  </button>
                </div>
                <small v-show="!validators.passwordConfirm">Senhas não coincidem</small>
              </div>
              <div class="form-group">
                <button class="btn-primary" type="submit">
                  <LoaderBtn v-show="loader" />
                  Criar nova senha
                </button>
              </div>
              <div class="form-group">
                <p class="dica">👉 Crie uma senha com pelo menos 8 caracteres.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
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
import HeaderOffline from '@/components/HeaderOffline.vue';
import CountryPhoneSelect from '@/components/CountryPhoneSelect';
import AlertToasty from '@/components/AlertToasty';
import LoaderBtn from '@/components/LoaderBtn';
import { utils } from '@/mixins/utils.js';
import http from '@/http';

export default {
  components: {
    HeaderOffline,
    CountryPhoneSelect,
    LoaderBtn,
    AlertToasty,
  },
  mixins: [utils],
  props: {
    source: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      timer: 30,
      tokenRecover: null,
      msgError: null,
      stepper: 1,
      userContact: {
        country: {
          flag: require('@/assets/img/brasil-area.svg'),
          country: 'Brasil',
          code: '+55',
        },
        phone: null,
        email: null,
        password: null,
        passwordConfirm: null,
        hashSixDigits: null,
      },
      showPassword: false,
      showPasswordConfirm: false,
      validators: {
        email: false,
        phone: false,
        token: false,
        password: true,
        passwordConfirm: true,
      },
      loader: false,
      status: {
        message: null,
        code: null,
        show: false,
        title: null,
      },
    };
  },
  methods: {
    setCountry(country) {
      this.userContact.country.flag = country.flag;
      this.userContact.country.country = country.country;
      this.userContact.country.code = country.code;
    },
    setPhone(value) {
      this.userContact.phone = value;
      value.length > 6 ? (this.validators.phone = true) : (this.validators.phone = false);
    },
    inputToken(value) {
      this.tokenRecover = this.numericOnly(value);
      this.tokenRecover.length === 6
        ? (this.validators.token = true)
        : (this.validators.token = false);
    },
    setEmail() {
      this.msgError = !this.validateEmail(this.userContact.email)
        ? null
        : 'Insira um e-mail válido';
      setTimeout(() => {
        this.msgError = null;
      }, 2000);
      return !this.validateEmail(this.userContact.email);
    },
    recoverByEmail() {
      if (this.setEmail()) {
        this.loader = true;
        http
          .post('/user/forgot/sendToken', { email: this.userContact.email, method: 'email' })
          .then((response) => {
            this.loader = false;
            if (response.data.status) {
              this.stepper = 2;
              this.msgError = null;
              this.userContact.email = response.data.forgotData.target;
              this.setTimerButton();
            } else {
              this.stepper = 1;
              this.msgError = 'Usuário não encontrado ou excedeu o número de solicitações';
            }
          });
      }
    },
    recoverByPhone() {
      http
        .post('/user/forgot/sendToken', { email: this.userContact.email, method: 'email' })
        .catch((erro) => {
          this.msgError = 'Ocorreu um erro interno';
        });
    },
    sendValidationToken() {
      this.loader = true;
      http
        .post('/user/forgot/validationCode', {
          email: this.userContact.email,
          sixDigit: this.tokenRecover,
        })
        .then((response) => {
          this.loader = false;
          if (response.data.status) {
            this.stepper = 3;
            this.msgError = null;
            this.userContact.hashSixDigits = response.data.hashSixDigits;
          } else {
            this.msgError = response.data?.error[0]?.errorType;
          }
        });
    },
    sendNewPassword() {
      this.loader = true;
      http
        .post('/user/forgot/changePassword', {
          email: this.userContact.email,
          hashSixDigits: this.userContact.hashSixDigits,
          password: this.userContact.password,
          confirm_password: this.userContact.passwordConfirm,
        })
        .then((response) => {
          this.loader = false;
          if (response.data.status) {
            this.openToasty(
              true,
              'Você será redirecionado para a tela de login.',
              200,
              'Senha alterada com sucesso!'
            );
            setTimeout(() => {
              this.goToLogin();
            }, 3000);
          } else {
            this.openToasty(true, 'Ocorreu um erro ao tentar alterar sua senha', 500, '');
          }
        });
    },
    validateNewPassword(value) {
      this.validators.password = value.length >= 8;
    },
    checkPasswordAreSame() {
      this.validators.passwordConfirm =
        this.userContact.password === this.userContact.passwordConfirm;
    },
    setTimerButton() {
      const x = setInterval(() => {
        this.timer--;
        if (this.timer === 0) {
          clearInterval(x);
        }
      }, 1000);
    },
    clearErrorToasty() {
      setTimeout(() => {
        this.status.show = false;
        this.status.message = null;
        (this.status.code = null), this.status.title - null;
      }, 3000);
    },
    openToasty(show, message, status, title) {
      this.status.show = show;
      this.status.message = message;
      this.status.code = status;
      this.status.title = title;
      this.clearErrorToasty();
    },
    goToLogin() {
      if (this.source === 'PARTNER') {
        this.$router.push({ name: 'PartnerWelcome', query: { ...this.$route.query, form: 2 } });
        return;
      }

      this.$router.push({ name: 'Login', query: this.$route.query });
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
@import '../assets/scss/_colors.scss';
@import '../assets/scss/_buttons.scss';
@import '../assets/scss/_inputs.scss';

.bg-form {
  // background: url('../assets/img/bg-login.png') no-repeat right center;
}

.s-forgot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;

  .types-forgot {
    margin-top: 2rem;
    width: 100%;
    display: none;

    .types-forgot-title {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 100%;
      margin-bottom: 1.5rem;
      border-bottom: 2px solid $dark-700;

      span {
        padding-top: 8px;
        padding-bottom: 18px;
        opacity: 1;
        font-weight: 600;
        font-size: 18px;
      }

      &:after {
        content: '';
        width: 100%;
        border-top: 2px solid #00e7f9;
        position: absolute;
        left: 0;
        bottom: -2px;
        transition: all 3s;
      }
    }

    .tab-content {
      .tab-pane {
        display: none;
        &.active {
          display: block;
        }
        p {
          text-align: center;
          max-width: 300px;
          margin: 0 auto;
          margin-bottom: 40px;
        }
      }
    }
  }
  .area-code-verification {
    display: none;
    margin-top: 1rem;
    width: 100%;
    p {
      text-align: center;
      margin-bottom: 3.9375rem;
      line-height: 1.5rem;
      strong {
        display: block;
        text-align: center;
      }
    }
    .code {
      display: flex;
      justify-content: space-between;
      align-items: center;
      input[type='text'] {
        width: 100%;
        height: 64px;
        text-align: center;
        font-weight: 600;
        font-size: 1.25rem;
      }
    }
    .clock-expiration {
      margin-top: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 2.5rem;
      img {
        margin-right: 0.875rem;
      }
    }
  }
  .new-password {
    margin-top: 28px;
    width: 100%;
    display: none;
    .dica {
      text-align: center;
      font-size: 0.875rem;
      strong {
        font-weight: bold;
      }
    }
  }
  .confirmation {
    display: none;
  }
  .show {
    display: block;
  }
  @media (max-width: 450px) {
    height: auto;
    align-items: flex-start;
    padding: 120px 15px 40px 15px;
    min-height: 100vh;
    .area-code-verification {
      .code {
        input[type='text'] {
          width: 100%;
          height: 50px;
        }
      }
    }
  }
}

.form-user {
  .box {
    width: 100%;
    max-width: 464px;
    margin: 0 auto;
    background: #0f1116;
    border: 1px solid #172026;
    border-radius: 8px;
    padding-top: 4rem;
    padding-bottom: 2.0625rem;
    .steps {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
      > span {
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 140%;
        text-transform: uppercase;
        color: #86888d;
        margin-right: 8px;
      }
      ul {
        display: flex;
        align-items: center;
        li {
          position: relative;
          margin-left: 18px;
          font-weight: 600;
          font-size: 0.875rem;
          line-height: 140%;
          text-transform: uppercase;
          color: #86888d;
          &:before {
            content: '';
            width: 2px;
            height: 2px;
            background: #00e7f9;
            display: inline-block;
            border-radius: 50%;
            position: absolute;
            left: -10px;
            top: 9px;
          }
          &.current {
            color: #fff;
          }
          &:first-child {
            margin-left: 0px;
            &:before {
              display: none;
            }
          }
        }
      }
    }
    h3 {
      text-align: center;
    }
  }
  @media (max-width: 450px) {
    .box {
      height: auto;
      padding: 40px 20px;
    }
  }
}

.container-form {
  width: 100%;
  max-width: 384px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  form {
    width: 100%;
    .form-group {
      .password {
        max-width: 100%;
      }
      input[type='text'],
      input[type='password'],
      input[type='email'] {
        max-width: 100%;
      }
    }
    .btn-primary {
      max-width: 100%;
    }
  }
}

.form-group .btn-resend {
  font-size: 0.8em;
  &:disabled {
    span {
      color: #fff !important;
    }
  }
  span {
    color: $dark-700 !important;
  }
}

.error-msg {
  margin-top: 1rem;
  small {
    font-size: 0.87rem;
    color: #f00;
  }
}
</style>
