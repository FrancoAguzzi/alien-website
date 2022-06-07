<template>
  <div>
    <section class="s-login bg-form">
      <div class="container-form">
        <!-- <img src="../assets/img/logo-color.svg" alt="" /> -->
        <div class="title-login">
          <h5>Acesse a maior plataforma de</h5>
          <h2>Educação financeira <br />do mundo!</h2>
          <small>{{ errorMessage }}</small>
        </div>
        <form @submit.prevent="loginuser" autocomplete="off">
          <div class="form-group">
            <label for="">E-mail</label>
            <input
              v-model="user.email"
              type="text"
              placeholder="Insira seu e-mail"
              @input="enableInput"
              autofocus
              tabindex="1"
              id="login-email"
            />
          </div>
          <div class="form-group overwrite-margin-bottom">
            <label for="" @click="enableInput" @input="enableInput">Senha</label>
            <div class="password">
              <input
                v-model="user.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Insira sua senha"
                tabindex="0"
                id="login-password"
              />
              <button class="js-btn-show-password" type="button">
                  <!-- src="@/assets/img/eye.svg" -->
                <img
                  @click="showPassword = !showPassword"
                  alt="Visualizar a senha"
                />
              </button>
            </div>
            <button type="button" @click="navigateToRoute('forgot-password')" class="forgot">
              Recuperar senha 
              <!-- <img src="@/assets/img/clock.svg" alt="Recuperar senha" /> -->
            </button>
          </div>
          <div class="form-group">
            <button type="submit" class="btn-primary" :disabled="enableInput()" id="login-sign-in">
              <LoaderBtn v-show="loader" />
              Entrar
            </button>
          </div>
          <div class="form-group">
            <h5 class="dividerMessage">Ainda não tem uma conta?</h5>
          </div>
          <div class="form-group">
            <button
              type="button"
              @click="goToCheckout"
              class="btn-primary outline"
              id="login-register"
            >
              Criar conta
            </button>
          </div>
        </form>
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
import { mapGetters } from 'vuex';
import { baseUrl } from '@/enviroment';
import { utils } from '@/mixins/utils.js';
import LoaderBtn from '@/components/LoaderBtn';
import AlertToasty from '@/components/AlertToasty';

export default {
  props: {
    redirectReason: {
      default: '',
      type: String,
    },
  },
  mixins: [utils],
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      loader: false,
      errorMessage: '',
      status: {
        message: null,
        code: null,
        show: false,
        title: null,
      },
      showPassword: false,
    };
  },
  components: {
    LoaderBtn,
    AlertToasty,
  },
  computed: {
    ...mapGetters(['isLogged', 'token']),
  },
  methods: {
    navigateToRoute(route) {
      this.$router.push({ path: route, query: this.$route.query });
    },
    loginuser() {
      this.loader = true;
      this.$store
        .dispatch('loginUser', {
          email: this.user.email.trim().toLowerCase(),
          password: this.user.password,
        })
        .then((resp) => {
          this.loader = false;
          if (!resp.status) {
            if (resp.error[0].field) {
              if (resp.error[0].errorType) {
                this.errorMessage = 'Por favor, verifique seu email e/ou senha';
              }
            } else if (resp.data.proceedToSubscription) {
              this.openToasty(true, resp.error_plain, 400, 'Como é bom ter você de volta! :D');

              setTimeout(() => {
                const userID = resp.data.userID;
                this.$router.push({
                  path: `/short-checkout/${userID}`,
                  query: { ...this.$route.query, step: 2 },
                });
              }, 2000);
            } else if (resp?.error === 'SUBSCRIPTION_PENDING_PAYMENT') {
              this.openToasty(
                true,
                'Você será redirecionado para cadastrar um novo cartão e continuar sua jornada...',
                500,
                'Sua renovação não foi realizada'
              );

              setTimeout(() => {
                this.$router.push({
                  name: 'ChangePayment',
                  params: { userID: resp.data.userID },
                });
              }, 3000);
            } else {
              this.errorMessage =
                'Infelizmente tivemos um problema interno - Envie um email para suporte@finclass.com';
            }
            this.loader = false;
            setTimeout(() => {
              this.errorMessage = '';
            }, 2000);
          } else {
            try {
              const token = this.token;

              OneSignal.sendTag('premium', 1);
              OneSignal.isPushNotificationsEnabled(function(isEnabled) {
                if (isEnabled) {
                  OneSignal.getUserId().then((id) => {
                    const myHeaders = new Headers();
                    myHeaders.append('Content-Type', 'application/json');
                    myHeaders.append('Authorization', `Bearer ${token}`);

                    const raw = JSON.stringify({
                      notificateWebPushKey: id,
                    });

                    const requestOptions = {
                      method: 'PATCH',
                      headers: myHeaders,
                      body: raw,
                      redirect: 'follow',
                    };

                    fetch(baseUrl + 'user/userSettings', requestOptions).catch((error) =>
                      console.log('error', error)
                    );
                  });
                }
              });
            } catch (e) {
              console.error('error');
            }

            this.errorMessage = '';
            this.$store.dispatch('getUserData').then(() => {
              this.$router.push({ name: 'Home' });
              setTimeout(() => {
                this.loader = false;
              }, 1500);
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.loader = false;
        });
    },
    enableInput() {
      return (
        Object.keys(this.user).filter((key) => this.user[key] === null || this.user[key] === '')
          .length > 0
      );
    },
    goToCheckout() {
      this.navigateToRoute('short-checkout');
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
  },
  created() {
    if (this.redirectReason) {
      this.openToasty(true, this.redirectReason, 400, '');
    }
    if (this.$route.fullPath.includes('undefined')) {
      window.location.href = this.$route.path;
    }
  },
};
</script>

<style lang="scss">
@import '../assets/scss/_colors.scss';
@import '../assets/scss/_buttons.scss';
@import '../assets/scss/_inputs.scss';
@import '../assets/scss/_dividerMessage.scss';

.s-login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 4vh 0;
  .title-login {
    margin: 40px 0px;
    h5 {
      text-align: center;
      text-transform: uppercase;
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    h2 {
      text-align: center;
    }
    small {
      font-size: 13px;
      text-align: center;
      margin-top: 15px;
      color: $error;
      display: block;
      -webkit-transition: all 0.3s;
      -o-transition: all 0.3s;
      transition: all 0.3s;
    }
  }

  @media (max-width: 450px) {
    height: auto;
    padding: 50px 15px;
    min-height: 100vh;
    align-items: flex-start;
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
      border: 1px solid transparent;
      position: relative;
      &.overwrite-margin-bottom {
        margin-bottom: 2.5rem;
      }
      .forgot {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        line-height: 40px;
        margin-top: 0.5rem;
        font-size: 0.875rem;
        position: absolute;
        right: 0;
        img {
          margin-left: 0.875rem;
        }
      }
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

.bg-form {
  // background: url('../assets/img/bg-login.png') no-repeat right center;
  @media (max-width: 1200px) {
    background-position-x: 50%;
  }
  @media (max-width: 450px) {
    background-position-x: 70%;
  }
}
</style>
