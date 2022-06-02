<template>
  <Modal :class="isOpen ? 'show-modal' : ''">
    <button class="close js-close-modal" type="button" @click="isOpen = false">
      <img src="@/assets/img/close.svg" alt="" />
    </button>
    <div class="meae__content">
      <img src="@/assets/img/icon-email-warning.svg" alt="Alerta de e-mail" />
      <h4 class="meae__title">O e-mail inserido já existe</h4>
      <p class="meae__description">
        Já existe uma conta cadastrada com este e-mail. Basta efetuar o seu login para acessar a
        plataforma.
      </p>
      <button class="meae__button" @click="goToLogin">Login</button>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal';

export default {
  name: 'ModalEmailAlreadyExists',
  components: { Modal },
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    goToLogin() {
      // TODO: emitir um evento ou receber um link para redirecionar para o form step 2
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_colors.scss';

.meae__content {
  margin-top: 2.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .meae__title {
    margin-top: 0.5rem;
    text-align: center;
  }

  .meae__description {
    margin-top: 1rem;
    line-height: 145%;
    text-align: center;
  }

  .meae__button {
    margin: 2rem auto;
    background-color: $dark-900;
    border-radius: 6px;
    padding: 0.875rem 0;
    text-align: center;
    width: 100%;
    font-weight: bold;
    font-size: 1rem;
    line-height: 150%;
    color: $dark-900;
  }
}
</style>
