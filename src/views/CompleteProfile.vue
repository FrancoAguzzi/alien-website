<template>
  <div>
    <div class="pw__container">
      <div class="pw__img" :class="isRegisterFormActive ? 'register' : 'login'">
        <!-- <img src="../assets/img/logo-color.svg" alt="Finclass - Logo" class="pw__form-img" /> -->
      </div>
      <div class="pw__form">
        <!-- <img src="../assets/img/logo-color.svg" alt="Finclass - Logo" class="pw__form-img" /> -->
        <complete-profile-register
          v-if="isRegisterFormActive"
          :dummyUserToken="dummyUserToken"
          @toggle-form="toggleForm"
          @open-toasty="openToasty"
        />
        <complete-profile-login v-else :dummyUserToken="dummyUserToken" @toggle-form="toggleForm" />
      </div>
    </div>

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
import AlertToasty from '@/components/AlertToasty';
import CompleteProfileRegister from '@/components/CompleteProfileRegister';
import CompleteProfileLogin from '@/components/CompleteProfileLogin.vue';

const FORMS = { REGISTER: 1, LOGIN: 2 };

export default {
  name: 'CompleteProfile',
  components: { AlertToasty, CompleteProfileRegister, CompleteProfileLogin },
  computed: {
    dummyUserToken() {
      return this.$route.query.userToken ?? 'emptytoken';
    },
    isRegisterFormActive() {
      return this.activeForm === FORMS.REGISTER;
    },
  },
  data() {
    return {
      activeForm: null,
      status: { message: null, code: null, show: false, title: null },
    };
  },
  methods: {
    toggleForm() {
      this.activeForm = this.activeForm === FORMS.REGISTER ? FORMS.LOGIN : FORMS.REGISTER;
      document.querySelector('.pw__form-img').scrollIntoView({ behavior: 'smooth', block: 'end' });
    },
    clearErrorToasty() {
      setTimeout(() => {
        this.status.show = false;
        this.status.message = null;
        this.status.title = null;
      }, 3000);
    },
    openToasty({ message, status, title }) {
      this.status.show = true;
      this.status.message = message;
      this.status.code = status;
      this.status.title = title;
      this.clearErrorToasty();
    },
  },
  created() {
    this.activeForm = parseInt(this.$route.query?.form) || FORMS.REGISTER;
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';
@import '../assets/scss/_buttons.scss';
@import '../assets/scss/_inputs.scss';
@import '../assets/scss/_dividerMessage.scss';

.pw__container {
  width: 100vw;
  margin: 0;
  padding: 0;
  display: flex;

  .pw__img {
    display: none;
  }

  .pw__form {
    height: 100%;
    width: 100%;
    padding: 3.5rem 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;

    .pw__form-img {
      max-width: 46%;
      max-height: 5%;
    }
  }

  @media (min-width: 1000px) {
    .pw__img {
      display: block;
      min-width: 50%;
      min-height: 100vh;
      position: relative;
      background-position: right top !important;
      background-size: cover !important;
      background-repeat: no-repeat !important;

      &.register {
        // background: linear-gradient(270deg, #000000 1.02%, rgba(0, 0, 0, 0) 37.63%),
        //   url('../assets/img/partner-register-bkg.png');
      }

      &.login {
        // background: linear-gradient(270deg, #000000 0%, rgba(0, 0, 0, 0) 32.97%),
          // url('../assets/img/partner-login-bkg.png');
      }

      > img {
        position: absolute;
        top: 5%;
        left: 5%;
        max-width: 180px;
        max-height: 30px;
      }
    }

    .pw__form {
      max-width: 31%;

      .pw__form-img {
        display: none;
      }
    }
  }
}
</style>
