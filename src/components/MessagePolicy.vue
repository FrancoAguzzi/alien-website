<template>
  <div class="msg-policy" id="js-msg-termos">
    * Em caso de problemas, entre em contato com o nosso suporte através do email
    <a href="mailto:suporte@finclass.com" target="_blank">suporte@finclass.com</a>
    .
    <br />
    <br />
    Ao ”clicar” no botão {{ buttonLabel }}, você aceita nosso
    <router-link :to="`/${policyBaseRoute}/1`" target="_blank">termos de uso</router-link>
    e
    <router-link :to="`/${policyBaseRoute}/7`" target="_blank">
      política de privacidade
    </router-link>
    <br />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MessagePolicy',
  props: {
    buttonLabel: {
      type: String,
      default: 'Continuar',
    },
  },
  computed: {
    ...mapGetters(['isLogged']),
    policyBaseRoute() {
      return this.isLogged ? 'policy' : 'privacy-policy';
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/_colors.scss';
@import '../assets/scss/_buttons.scss';
@import '../assets/scss/_inputs.scss';

.msg-policy {
  margin: 64px 0;
  text-align: center;
  max-width: 313px;
  font-size: 0.875rem;
  .captcha-policy {
    text-align: center;
    padding: 0.6rem;
  }
  a {
    display: inline-block;
    text-decoration-line: underline;
    transition: color 0.3s;
    &:hover {
      color: $dark-900;
    }
  }
}

@media (max-width: 1440px) {
  .msg-policy {
    margin-top: 30px;
  }
}
</style>
