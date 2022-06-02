<template>
  <header class="header">
    <nav class="header__list">
      <li class="header__list-item">
        <a class="item" href="/">
          <img class="item__logo" src="@/assets/img/logo-preta-notext.png" alt="" />
        </a>
      </li>
      <li class="header__list-item">
        <a class="item item__redirect" href="https://www.instagram.com/alien_art_tattoo/">
          <img src="@/assets/img/instagram.svg" alt="Instagram Redirection" />
        </a>
        <a
          class="item item__redirect whatsapp"
          href="https://api.whatsapp.com/message/GBZRVMH6C43DJ1?autoload=1&app_absent=0"
        >
          <img src="@/assets/img/whatsapp.svg" alt="Whatsapp Redirection" />
        </a>
      </li>
    </nav>
  </header>

  <main class="main">
    <!-- TEXTO + VIDEO -->
    <section class="main__welcome">
      <div class="main__welcome-wrapper">
        <h1 class="main__welcome-title">SEJA BEM-VINDO <br />À EXPERIÊNCIA ALIEN</h1>
        <h2 class="main__welcome-subtitle">
          Lorem ipsum dolor sit amet
          <strong style="color: #000">consectetur adipisicing elit.</strong> Provident omnis
          voluptatum debitis nihil ipsam. Veritatis neque praesentium tempora vitae animi sequi
          rerum at, ullam minima
          <strong style="color: #000">fuga a natus accusamus doloremque</strong> nostrum commodi
          quas eveniet, officia voluptate dolorum fugiat architecto repellendus.
        </h2>
        <button class="main__welcome-cta">CTA LABEL</button>
      </div>
      <video
        id="background-video"
        class="main__welcome-video"
        autoplay
        loop
        muted
        :poster="videoPosterPhoto"
      >
        <source :src="getVideoSrc" type="video/mp4" />
      </video>
      <div class="main__welcome-shadow"></div>
    </section>

    <!-- ROHIL + CONTATO -->
    <section class="main__presentation">
      <h3 class="pres__title">ROHIL GUERREIRO</h3>
      <div>
        <div class="pres__rohil"></div>
        <p class="pres__description">
          O Rohil é um artista venezuelano com aproximadamente <b>10 anos de experiência</b>, antes
          de iniciar na tatuagem cursava psicologia e vendia seus quadros para pagar a faculdade.
          Após alguns semestres resolveu largar o curso pois um amigo lhe apresentou o universo da
          tattoo e ele viu uma possibilidade de
          <b>unir a psicologia, espiritualidade e a arte!</b> Então ao longo de sua trajetória no
          mundo da tattoo desenvolveu uma técnica de trabalho onde utiliza das
          <b>geometrias, códigos, referência e história</b> e cria uma arte baseada na sua
          personalidade! Além de ser um <b>trabalho único</b> e exclusivamente criado pra você, é
          uma arte que agrega e se integra ao seu corpo,
          <b>potencializando a pessoa que você é.</b>
        </p>
      </div>
    </section>

    <section class="main__poster">
      <div class="image"></div>
      <div class="box"></div>
    </section>

    <Feedbacks />

    <section class="main__contact">
      <div class="form">
        <h3 class="form__title">CONTATE-NOS:</h3>
        <div class="form__name">
          <label for="name">Nome</label>
          <input v-model="name" type="text" name="name" id="name" />
        </div>
        <div class="form__phone">
          <label for="name">Mensagem</label>
          <textarea v-model="message" />
        </div>
        <button @click="getInContact" class="form__submit">ENVIAR</button>
      </div>
    </section>

    <footer class="footer">
      <nav class="footer__list">
        <li class="footer__list-item">
          <a class="item" href="/">
            <img class="item__logo" src="@/assets/img/logo-preta-notext.png" alt="" />
          </a>
        </li>
        <li class="footer__list-item">
          <a class="item item__redirect" href="https://www.instagram.com/alien_art_tattoo/">
            <img src="@/assets/img/instagram.svg" alt="Instagram Redirection" />
          </a>
          <a
            class="item item__redirect whatsapp"
            href="https://api.whatsapp.com/message/GBZRVMH6C43DJ1?autoload=1&app_absent=0"
          >
            <img src="@/assets/img/whatsapp.svg" alt="Whatsapp Redirection" />
          </a>
        </li>
      </nav>
    </footer>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
import Feedbacks from '@/components/Feedbacks.vue';

export default {
  name: 'Captura',
  components: { Feedbacks },
  data() {
    return {
      isMobile: false,
      name: '',
      message: '',
      videoPosterPhoto:
        'https://res.cloudinary.com/dwtl1a1x2/image/upload/v1652733073/alien%20photos/_RNJ6988_mhrir3.jpg',
      videoSrc: {
        mobile:
          'https://res.cloudinary.com/dwtl1a1x2/video/upload/v1652733447/alien%20videos/FinalVideo_1644942823.756507_ximkun.mp4',
        desktop:
          'https://res.cloudinary.com/dwtl1a1x2/image/upload/v1652733073/alien%20videos/_RNJ6988_mhrir3.jpg',
      },
    };
  },
  mounted() {
    this.updateIsMobile();
    window.addEventListener('resize', this.updateIsMobile);
  },
  computed: {
    getVideoSrc() {
      return this.isMobile ? this.videoSrc.mobile : this.videoSrc.desktop;
    },
  },
  methods: {
    ...mapActions(['updateCaptureFormData']),
    updateIsMobile() {
      this.isMobile = window.matchMedia('(max-width: 700px)').matches;
    },
    getInContact() {
      this.updateCaptureFormData({ name: this.name, message: this.message });
      this.$router.push({ name: 'Obrigado' });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';

.main {
  z-index: $second-layer;
  position: relative;
  margin: 0 auto;

  &__welcome {
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    overflow: hidden;

    &-shadow {
      width: calc(100vw - 500px);
      height: calc(100vh - 134.5px);
      box-shadow: inset 0px 0px 30px 33px rgba(0, 0, 0, 0.315);
      position: absolute;
      top: 0;
      right: 0;
    }

    &-wrapper {
      z-index: $second-layer;
      // box-shadow: 0 0 30px 30px $white;
      padding-bottom: 40px;
    }

    &-title {
      font-size: 32px;
      min-width: 340px;
      max-width: 140px;
      text-shadow: 2px 2px $dark-50;
      padding-left: 40px;
    }

    &-subtitle {
      padding-left: 40px;
      color: $dark-300;
      padding-right: 100px;
    }

    &-cta {
      padding: 10px 20px;
      border: 4px solid $dark-900;
      background: transparent;
      font-family: 'Proxima Nova Bold';
      margin: 20px 40px 0 50px;
      font-size: 22px;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        bottom: -12px;
        left: -8px;
        width: 164px;
        height: 4px;
        background-color: $dark-900;
      }

      &:after {
        content: '';
        position: absolute;
        top: 4px;
        left: -11px;
        width: 4px;
        height: 50px;
        background-color: $dark-900;
        transform: rotateZ(0deg);
      }
    }

    @media screen and (min-width: 1200px) {
      flex-direction: row;

      &-wrapper {
        min-width: 500px;
      }

      &-title {
        margin-top: 80px;
      }

      &-video {
        max-height: calc(100vh - 134.5px);
        z-index: $last-layer;
      }
    }
  }

  &__presentation {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 24px 60px;
    // box-shadow: 0px 0px 20px 20px $white;
    z-index: $first-layer;
    margin: 0 auto;

    .pres {
      &__rohil {
        width: 220px;
        height: 220px;
        border-radius: 50%;
        align-self: flex-end;
        float: right;
        margin: 0 0 10px 30px;
        background: url('../assets/img/rohil.png');
        background-size: cover;
        shape-outside: circle(50%);
        box-shadow: inset 0px 0px 20px 20px $white;
      }

      &__title {
        color: $dark-900;
        border: 4px solid $dark-900;
        border-right: none;
        border-left: none;
        padding: 15px 10px;
        text-align: center;
        font-size: 28px;
        width: 1024px;
      }

      &__description {
        color: $dark-300;
        font-size: 1.25rem;
        line-height: 120%;
        max-width: 1024px;

        b {
          color: $dark-900;
        }
      }

      @media screen and (min-width: 1200px) {
        box-shadow: none;
        max-width: 1024px;
        margin: 0 auto;
      }
    }
  }

  &__poster {
    width: 100vw;
    max-width: 100vw;
    overflow: hidden;
    overflow: hidden;
    position: relative;

    .image {
      background: url('../assets/img/tatuando.jpeg');
      background-size: cover;
      background-position: center;
      height: 550px;
      width: 110%;
      margin: 0 -5%;
      box-shadow: inset 0 0 20px 20px $white;
      z-index: $last-layer;
      position: relative;
    }

    .box {
      background: url('../assets/img/tatuando.jpeg');
      background-size: cover;
      background-position: center;
      width: 110%;
      height: 550px;
      clip-path: polygon(0 10%, 100% 10%, 100% 90%, 0 90%);
      margin-left: -5vw;
      margin-right: -5vw;
      z-index: $second-layer;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  &__contact {
    border-top: 4px solid $dark-900;
    padding: 100px 24px 80px;
    background-color: $dark-900;
    z-index: $last-layer;
    position: relative;

    .form {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;

      &__title {
        color: $white;
        text-shadow: 2px 2px $dark-600;
        font-size: 1.75rem;
        text-align: center;
      }

      &__name,
      &__phone {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        &:first-child {
          margin-bottom: 30px;
        }

        label {
          font-size: 1.375rem;
          color: $white;
          margin-bottom: 10px;
          background-color: $dark-900;
          position: relative;
          z-index: $first-layer;

          &:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 3px;
            background-color: $white;
            bottom: -6px;
            left: 0;
          }
        }
      }

      input,
      textarea {
        margin-top: 12px;
        padding: 10px;
        font-size: 1rem;
        box-shadow: inset 0 0 10px $dark-100;
        border-radius: 4px;
        border: none;
      }

      textarea {
        height: 150px;
        font-family: 'Proxima Nova Regular';
      }

      &__submit {
        margin-top: 20px;
        border: 4px solid $white;
        background-color: transparent;
        color: $white;
        font-family: 'Proxima Nova Bold';
        font-size: 18px;
        padding: 15px 0 !important;
        text-align: center;
      }
    }

    @media screen and (min-width: 1200px) {
      padding-top: 50px;
    }
  }
}

.header,
.footer {
  z-index: $first-layer;
  position: relative;

  &__list {
    background-color: $white;
    display: flex;
    justify-content: space-between;
    padding: 10px 30px 10px 20px;
    margin: 0;
    list-style: none;
    align-items: center;

    .item__logo {
      width: 240px;
    }

    .item__redirect {
      color: $dark-900;

      img {
        width: 90px;
        margin-bottom: -10px;
      }

      &.whatsapp img {
        width: 40px;
        margin-bottom: 0;
        margin-left: 10px;
      }
    }

    @media screen and (min-width: 768px) {
      padding: 10px 40px;
    }

    @media screen and (min-width: 1440px) {
      .item__redirect.whatsapp img {
        margin-left: 30px;
      }
    }
  }
}

.header {
  // box-shadow: 0px 0px 20px 20px $white;
}

.footer {
  &__list {
    background-color: $dark-900;

    img {
      filter: invert(1);
    }
  }
}
</style>
