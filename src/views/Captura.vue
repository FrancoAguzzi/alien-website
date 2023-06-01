<template>
  <header class="header">
    <nav class="header__list">
      <li class="header__list-item">
        <a class="item" href="/captura">
          <img class="item__logo" src="@/assets/img/logo-preta-notext.png" alt="" />
        </a>
      </li>
      <li class="header__list-item">
        <a class="item item__redirect" href="https://www.instagram.com/alien_art_tattoo/">
          <img src="@/assets/img/instagram.svg" alt="Instagram Redirection" />
        </a>
        <a class="item item__redirect whatsapp"
          href="https://api.whatsapp.com/message/GBZRVMH6C43DJ1?autoload=1&app_absent=0">
          <img src="@/assets/img/whatsapp.svg" alt="Whatsapp Redirection" />
        </a>
      </li>
    </nav>
  </header>

  <main class="main">
    <!-- TEXTO DE CAPTURA -->
    <section class="main__first">
      <h1 class="main__first-title">Te mostro a tatuagem que está escondida em suas ideias!</h1>
      <h2 class="main__first-subtitle">
        O que mais estou acostumado são clientes que chegam até mim, com
        <b style="color: #000">ideias e histórias incríveis</b> mas que não conseguem unir elas com
        <b style="color: #000">a arte da tatuagem</b> e é exatamente aí que eu entro. Me apego aos
        <b style="color: #000">detalhes</b> desde a nossa conversa inicial até o final da nossa
        sessão, isso para que você conte ainda mais <b style="color: #000">quem você é</b> através
        de outra linguagem, <b style="color: #000">a linguagem da arte.</b>
      </h2>
    </section>

    <section class="main__agenda">
      <h1 class="main__agenda-title">
        Agenda aberta para 2023!
      </h1>

      <AgendasList />
    </section>

    <!-- TEXTO + VIDEO -->
    <!-- <section class="main__welcome">
      <div class="main__welcome-wrapper">
        <h1 class="main__welcome-title">SEJA BEM-VINDO <br />À EXPERIÊNCIA ALIEN</h1>
        <h2 class="main__welcome-subtitle">
          <b style="color: #000">Minhas tatuagens começam muito antes do dia da sessão</b> de fato.
          Elas começam em nossa primeira conversa, onde busco
          <b style="color: #000">entender ao máximo você</b>, não apenas em suas ideias/histórias
          principais mas também em suas falas, expressões, ações e arquétipos. Isso faz com que as
          tatuagens sejam <b style="color: #000">únicas e especiais para quem as carrega</b>, minha
          atenção e energia estão totalmente voltadas para você e para a arte.
        </h2>
        <button class="main__welcome-cta">SAIBA MAIS</button>
      </div>
      <video
        id="background-video"
        class="main__welcome-video"
        autoplay
        loop
        muted
        :poster="getVideoPoster"
      >
        <source :src="getVideoSrc" type="video/mp4" />
      </video>
      <div class="main__welcome-shadow"></div>
    </section> -->

    <!-- ROHIL + CONTATO -->

    <section class="main__poster">
      <div class="main__poster-image"></div>
    </section>

    <section class="main__presentation">
      <h3 class="pres__title">ROHIL GUERREIRO</h3>
      <div>
        <div class="pres__rohil"></div>
        <p class="pres__description">
          Rohil é um artista venezuelano com aproximadamente <b>10 anos de experiência</b>. Antes de
          iniciar na tatuagem cursava psicologia e vendia seus quadros para pagar a faculdade, após
          alguns semestres resolveu largar o curso pois um amigo lhe apresentou o universo da tattoo
          e ele viu uma possibilidade de <b>unir a psicologia, espiritualidade e a arte!</b> Então
          ao longo de sua trajetória no mundo da tattoo desenvolveu uma técnica de trabalho onde
          utiliza das <b>geometrias, códigos, referência e história</b> e cria uma arte baseada na
          sua personalidade! Além de ser um <b>trabalho único</b> e exclusivamente criado pra você,
          é uma arte que agrega e se integra ao seu corpo,
          <b>potencializando a pessoa que você é.</b>
        </p>
      </div>
    </section>

    <Feedbacks />

    <section class="main__contact">
      <form class="form" @submit.prevent="getInContact" method="POST"
        action="https://script.google.com/macros/s/AKfycbzFN7fwppoquz9SwCcdgKxiOb1eLaIli9ZUKcMliJL7MjeHnfic9UChrODMrSaetdxJkw/exec">
        <h3 class="form__title">CONTATE-NOS:</h3>

        <div class="form__name">
          <label for="name">Nome*</label>
          <input v-model="name" type="text" name="Nome" id="name" required />
        </div>

        <div class="form__email">
          <label for="email">E-mail</label>
          <input v-model="email" type="email" name="Email" id="email" />
        </div>

        <div class="form__phone">
          <label for="phone">Telefone</label>
          <input v-mask="'(##) # ####-####'" v-model="phone" type="tel" name="Telefone" id="phone" />
        </div>

        <div class="form__message">
          <label for="message">Mensagem</label>
          <textarea v-model="message" name="Mensagem" id="message" />
        </div>

        <button @submit.prevent="getInContact" type="submit" class="form__submit">ENVIAR</button>
      </form>
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
          <a class="item item__redirect whatsapp"
            href="https://api.whatsapp.com/message/GBZRVMH6C43DJ1?autoload=1&app_absent=0">
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
import AgendasList from '@/components/AgendasList.vue';

export default {
  name: 'Captura',
  components: { Feedbacks, AgendasList },
  data() {
    return {
      isMobile: false,
      name: '',
      email: '',
      phone: '',
      message: '',
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
    getVideoPoster() {
      return window.navigator.onLine
        ? 'https://res.cloudinary.com/dwtl1a1x2/image/upload/v1652733073/alien%20photos/_RNJ6988_mhrir3.jpg'
        : require('@/assets/img/alien-buda.webp');
    },
  },
  methods: {
    ...mapActions(['updateCaptureFormData']),
    updateIsMobile() {
      this.isMobile = window.matchMedia('(max-width: 700px)').matches;
    },
    getInContact(e) {
      this.updateCaptureFormData({ name: this.name, message: this.message });

      const data = new FormData(e.target);
      const action = e.target.action;
      fetch(action, {
        method: 'POST',
        body: data,
      }).then(() => {
        // this.$router.push({ name: 'Obrigado' });
      })

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

  &__first {
    position: relative;
    text-align: center;
    background-color: $white;
    padding: 0 0 40px;

    &-title {
      max-width: 1024px;
      margin: 0 auto;
      font-size: 36px;
      line-height: 38px;
      padding: 40px 40px 0;
      text-shadow: 2px 2px $dark-50;
    }

    &-subtitle {
      max-width: 1024px;
      margin: 0 auto;
      padding: 40px 25px 80px;
      color: $dark-300;
      line-height: 28px;
    }

    // &:before {
    //   content: '';
    //   position: absolute;
    //   left: 0;
    //   bottom: 8px;
    //   height: 4px;
    //   width: 40vw;
    //   max-width: 250px;
    //   background-color: $dark-900;
    // }

    // &:after {
    //   content: '';
    //   position: absolute;
    //   left: 0;
    //   bottom: 0;
    //   height: 4px;
    //   width: 50vw;
    //   max-width: 300px;
    //   background-color: $dark-900;
    // }

    @media screen and (min-width: 450px) {
      &-title {
        padding: 80px 40px 0;
      }

      &-subtitle {
        padding: 40px 30px 120px;
      }
    }

    @media screen and (min-width: 1200px) {

      &:before,
      &:after {
        left: auto;
        right: 0;
        bottom: 16px;
        width: 80vw;
        max-width: unset;
      }

      &:after {
        bottom: 0px;
        width: 85vw;
      }

      &-title {
        font-size: 48px;
        line-height: 48px;
        max-width: 800px;
        padding-top: 160px;
      }

      &-subtitle {
        font-size: 32px;
        line-height: 38px;
        padding-bottom: 160px;
      }
    }
  }

  &__agenda {
    background-image: linear-gradient(to right top, #212223, #4c4d4e, #7c7d7d, #b0b0b0, #e6e6e6);
    text-align: center;
    max-width: 1024px;
    transition: all;
    margin: 0 auto 120px;
    overflow-x: hidden;


    &-title {
      font-size: 36px;
      line-height: 38px;
      padding: 24px 40px;
      color: $white;
      position: relative;
      text-shadow: 2px 2px $dark-500;

      &:after {
        position: absolute;
        left: 22%;
        bottom: 0;
        height: 3px;
        width: 120%;
        background-color: $dark-900;
        content: '';
      }
    }
  }

  &__welcome {
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    overflow: hidden;
    position: relative;

    &-wrapper {
      z-index: $second-layer;
      box-shadow: 0 0 30px 30px $white;
      padding-bottom: 40px;
    }

    &-title {
      font-size: 32px;
      min-width: 340px;
      max-width: 140px;
      text-shadow: 2px 2px $dark-50;
      margin: 26px 20px;
    }

    &-subtitle {
      padding-left: 20px;
      color: $dark-300;
      padding-right: 40px;
    }

    &-cta {
      padding: 10px 20px;
      border: 4px solid $dark-900;
      background: transparent;
      font-family: 'Proxima Nova Bold';
      margin: 20px 40px 0 30px;
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

    @media screen and (min-width: 425px) {
      &-title {
        margin: 26px 40px;
      }

      &-subtitle {
        padding-left: 40px;
      }

      &-cta {
        margin-left: 50px;
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

      &-subtitle {
        line-height: 30px;
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
    z-index: $first-layer;
    margin: 40px auto;

    .pres {
      &__rohil {
        width: 220px;
        height: 220px;
        border-radius: 50%;
        align-self: flex-end;
        margin: 0 auto 10px;
        background: url('../assets/img/rohil.jpeg');
        background-size: cover;
        background-position: 50%;
        shape-outside: circle(50%);
        box-shadow: inset 0px 0px 20px 20px $white;
        outline: 10px solid $white;
        outline-offset: -2px;

        @media screen and (min-width: 425px) {
          margin: 0 0 10px 30px;
          float: right;
        }
      }

      &__title {
        color: $dark-900;
        border: 4px solid $dark-900;
        border-right: none;
        border-left: none;
        padding: 15px 10px;
        text-align: center;
        font-size: 28px;
        max-width: 1024px;
        width: 95%;
      }

      &__description {
        color: $dark-300;
        font-size: 1.1rem;
        line-height: 130%;
        max-width: 1024px;
        text-align: justify;

        b {
          color: $dark-900;
        }
      }

      @media screen and (min-width: 425px) {
        &__description {
          text-align: left;
          font-size: 1rem;
        }
      }

      @media screen and (min-width: 768px) {
        &__description {
          font-size: 1.2rem
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
    max-width: 100vw;
    position: relative;
    overflow: hidden;

    &-image {
      background: url('../assets/img/tatuando.webp');
      background-size: cover;
      background-position: center;
      height: 550px;
      width: 110%;
      margin: 0 -5%;
      box-shadow: inset 0 0 20px 20px $white;
      z-index: $last-layer;
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
      &__phone,
      &__email,
      &__message {
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
        cursor: pointer;
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
      width: 210px;
    }

    .item__redirect {
      color: $dark-900;

      img {
        width: 70px;
        margin-bottom: -10px;
      }

      &.whatsapp img {
        width: 30px;
        margin-bottom: 0;
        margin-left: 10px;
      }
    }

    @media screen and (min-width: 450px) {
      .item__logo {
        width: 240px;
      }

      .item__redirect {
        img {
          width: 90px;
        }

        &.whatsapp img {
          width: 40px;
        }
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

.footer {
  &__list {
    background-color: $dark-900;

    img {
      filter: invert(1);
    }
  }
}
</style>
