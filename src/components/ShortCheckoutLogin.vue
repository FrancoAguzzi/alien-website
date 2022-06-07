<template>
  <div class="form-group">
    <label for="">E-mail</label>
    <input
      type="email"
      id="login-email"
      v-model="loginForm.email"
      v-lowercase
      autofocus
      required
      placeholder="Digite seu e-mail"
    />
  </div>
  <div class="form-group">
    <label for="">Senha</label>
    <div class="password">
      <input
        :type="showPassword ? 'text' : 'password'"
        id="login-password"
        v-model="loginForm.password"
        required
        placeholder="Insira sua senha"
      />
      <button class="js-btn-show-password" type="button">
        <!-- <img src="@/assets/img/eye.svg" @click="togglePasswordShow" alt="Visualizar a senha" /> -->
      </button>
    </div>
    <button type="button" @click="navigateToRoute('forgot-password')" class="forgot">
      Recuperar senha 
      <!-- <img src="@/assets/img/clock.svg" alt="Recuperar senha" /> -->
    </button>
  </div>
</template>

<script>
export default {
  name: 'ShortCheckoutLogin',
  props: {
    loginForm: {
      type: Object,
      default() {
        return { email: null, password: null };
      },
    },
  },
  data() {
    return {
      showPassword: false,
    };
  },
  methods: {
    togglePasswordShow() {
      this.showPassword = !this.showPassword;
    },
    navigateToRoute(route) {
      this.$router.push({ path: route, query: this.$route.query });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';
@import '../assets/scss/_inputs.scss';

.forgot {
  width: 100%;
  max-width: 370px;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  line-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  img {
    margin-left: 0.875rem;
  }
}
</style>
