<template>
  <Modal :class="isOpen ? 'show-modal' : ''">
    <button class="close js-close-modal" type="button" @click="isOpen = false">
      <!-- <img src="@/assets/img/close.svg" alt="" /> -->
    </button>
    <div class="mw__content">
        <!-- src="@/assets/img/icon-heart-favorite-checkmark-circle.svg" -->
      <img
        alt="Ícone do bem-vindo"
        class="mw__image"
      />
      <h4 class="mw__title">
        Seja bem-vindo{{ dataUser.firstname ? `, ${dataUser.firstname}` : '!' }}
      </h4>
      <h4 class="mw__subtitle">
        Parabéns por ser um usuário Finclass.
      </h4>
      <p class="mw__description">
        Para você ter uma melhor experiência, baixe nosso aplicativo disponivel para Android e IOS
      </p>
      <div class="mw__buttons">
        <a href="https://apps.apple.com/us/app/finclass/id1575280028" rel="noopener">
            <!-- src="@/assets/img/extensive-footer/apple_footer.svg" -->
          <img
            rel="preload"
            class="str"
            alt="Apple Store"
          />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.finclass.app" rel="noopener">
            <!-- src="@/assets/img/extensive-footer/google_footer.svg" -->
          <img
            rel="preload"
            class="str"
            alt="Google Store"
          />
        </a>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal';
import { mapGetters } from 'vuex';

export default {
  name: 'ModalWelcome',
  components: { Modal },
  computed: {
    ...mapGetters(['dataUser']),
  },
  data() {
    return {
      isOpen: true,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_colors.scss';

.mw__content {
  margin-top: 2.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .mw__image {
    width: 2.625rem;
    height: 2.625rem;
  }

  .mw__title {
    margin-top: 0.5rem;
    text-align: center;
  }

  .mw__subtitle {
    text-align: center;
    opacity: 0.6;
  }

  .mw__description {
    margin-top: 1rem;
    line-height: 145%;
    text-align: center;
  }

  .mw__buttons {
    margin: 2rem auto 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-around;

    a {
      padding: 10px 30px;
      margin-right: 1rem;
      border: 1px solid $white;
      border-radius: 6px;

      .str {
        width: 120px;
        height: auto;

        &:hover {
          border-radius: 6px;
          transition: all ease-in-out 0.3s;
        }
      }

      &:hover {
        border-radius: 6px;
        transition: all ease-in-out 0.3s;
        background-color: $dark-900;
      }
    }
  }
}
</style>
