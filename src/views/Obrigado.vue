<template>
  <main class="typ">
    <img src="@/assets/img/nave.webp" alt="Ícone de nave espacial" class="typ__ship" />
    <h1 class="typ__title">ESTABELECENDO CONTATO{{ dots }}</h1>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Obrigado',
  data() {
    return {
      dots: '.',
    };
  },
  computed: {
    ...mapGetters(['getCaptureFormData']),
  },
  mounted() {
    window.setInterval(() => {
      if (this.dots.length > 2) {
        this.dots = '.';
      } else {
        this.dots = this.dots.concat('.');
      }
    }, 1000);

    window.setTimeout(() => {
      let dontHaveName = false;
      let dontHaveMessage = false;

      if (!this.getCaptureFormData.name) {
        dontHaveName = true;
      }
      if (!this.getCaptureFormData.message) {
        dontHaveMessage = true;
      }

      const whatsappBaseUrl = 'https://api.whatsapp.com';
      const alienNumber = '5548999157833';

      const messageStart = dontHaveName
        ? 'Olá! '
        : `Olá, me chamo ${this.getCaptureFormData.name}! `;
      const messageFinal = dontHaveMessage
        ? 'Gostaria de conhecer mais sobre a Alien.'
        : this.getCaptureFormData.message;
      const message = encodeURI(messageStart + messageFinal);

      window.location.href = `${whatsappBaseUrl}/send?phone=${alienNumber}&text=${message}`;
    }, 2000);
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';

@keyframes shipAnimation {
  50% {
    transform: translateY(-50px);
  }
  100% {
    transform: translateY(0);
  }
}

.typ {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;

  &__ship {
    animation: shipAnimation 2s infinite;
    width: 200px;
  }

  &__title {
    color: $dark-600;
    font-size: 1.75rem;
    z-index: $first-layer;
  }

  @media screen and (min-width: 1440px) {
    &__ship {
      width: 300px;
    }

    &__title {
      font-size: 2rem;
      margin-top: -40px;
    }
  }
}
</style>
