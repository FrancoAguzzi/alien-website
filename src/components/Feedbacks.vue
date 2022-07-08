<template>
  <section class="main__feedbacks">
    <h2 class="main__feedbacks-title">CLIENTES QUE TIVERAM SUAS IDEIAS ETERNIZADAS POR MIM:</h2>

    <!-- Carousel -->
    <Flickity ref="flickity" :options="flickityOptions" class="main__feedbacks-carousel flickity">
      <FeedbacksCard
        v-for="({ tattoo, clientIg, clientName, text }, index) in feedbacks"
        :key="index"
        :tattoo="tattoo"
        :clientIg="clientIg"
        :clientName="clientName"
        :text="text"
      ></FeedbacksCard>
    </Flickity>

    <!-- Grid -->
    <div class="main__feedbacks-list">
      <FeedbacksCard
        v-for="({ tattoo, clientIg, clientName, text }, index) in feedbacks"
        :key="index"
        :tattoo="tattoo"
        :clientIg="clientIg"
        :clientName="clientName"
        :text="text"
      ></FeedbacksCard>
    </div>

    <p class="main__feedbacks-subtitle">
      Veja como a <b style="color: #000">clareza</b> e o <b style="color: #000">entendimento</b>,
      fizeram com que eles tivessem <b style="color: #000">a tatuagem que sempre imaginaram</b>, mas
      que ainda não havia sido mostrada a eles...
    </p>
  </section>
</template>

<script>
import Flickity from 'vue-flickity';
import FeedbacksCard from './FeedbacksCard.vue';

export default {
  name: 'Feedbacks',
  components: { Flickity, FeedbacksCard },
  data() {
    return {
      currentPage: 0,
      flickityOptions: {
        initialIndex: 1,
        prevNextButtons: true,
        pageDots: true,
        wrapAround: false,
        fullscreen: true,
        adaptiveHeight: true,
        lazyLoad: true,
        cellAlign: 'center',
      },
      feedbacks: [
        {
          tattoo:
            'https://res.cloudinary.com/dwtl1a1x2/image/upload/v1652815051/alien%20photos/IMG_9768_m6wnum.jpg',
          text: 'Cara essa foi minha primeira tattoo. Foi uma experiência transformadora, eu tinha uma ideia de arte que o Rohil foi muito além e colocou todos os sentimentos que queria demonstrar nessa tatto! Futuramente já quero fazer o fechamento do braço e continuar essa história!',
          clientName: 'Danilo Fonte',
          clientIg: {
            link: '',
            label: '@danilo.s.fonte',
          },
        },
        {
          tattoo:
            'https://res.cloudinary.com/dwtl1a1x2/image/upload/v1652815051/alien%20photos/IMG_9764_bej7xl.jpg',
          text: 'Obrigado @rohilart e equipe Studio Alien, pela dedicação e conexão neste trabalho, que sem dúvidas, não é uma simples tatuagem!!!',
          clientName: 'Gustavo Ab',
          clientIg: {
            link: '',
            label: '@gustavobrk',
          },
        },
        {
          tattoo:
            'https://res.cloudinary.com/dwtl1a1x2/image/upload/v1652815051/alien%20photos/IMG_9763_ld1uyk.jpg',
          text: 'Tattoo foda do mestre @rohilart que com poucos infos conseguiu pegar a essência do que eu queria + a arte dele, chegando neste trampo sensacional, complexo e repleto de significado. Abraço e assim que possível colando ai pra fazer o outro braço! Valeu!',
          clientName: 'Guilherme Franco',
          clientIg: {
            link: '',
            label: '@guilhefranco',
          },
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.main__feedbacks {
  padding: 80px 0 60px;
  background-color: $white;
  max-width: 100vw;
  overflow: hidden;
  box-shadow: 0px 0px 20px 40px $white;

  &-title {
    font-size: 1.375rem;
    color: $dark-900;
    text-align: center;
    margin: 0 40px 40px;
    line-height: 30px;
    position: relative;
    background-color: $white;

    &:before,
    &:after {
      content: '';
      position: absolute;
      height: 4px;
      width: 1000vw;
      left: 100%;
      top: 50%;
      background-color: $dark-900;
    }

    &:after {
      left: unset;
      right: 100%;
    }

    @media screen and (min-width: 425px) {
      max-width: 400px;
      font-size: 1.5rem;
      margin: 0 auto 40px;
    }
  }

  &-subtitle {
    margin: 100px auto 0;
    padding: 0 20px;
    color: $dark-300;
    font-size: 1.25rem;
    line-height: 130%;
    text-align: center;
    font-style: italic;

    @media screen and (min-width: 425px) {
      max-width: 600px;
    }

    @media screen and (min-width: 768px) {
      font-size: 1.5rem;
    }
  }

  &-carousel {
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    user-select: none;
    margin: 0 auto;
    max-width: 100vw;

    @media screen and (min-width: 435px) {
      max-width: 435px;
    }

    @media screen and (min-width: 1024px) {
      max-width: 900px;
    }

    @media screen and (min-width: 1216px) {
      display: none;
    }
  }

  &-list {
    display: none;

    @media screen and (min-width: 1216px) {
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(auto-fit, 375px);
      grid-gap: 30px;

      .card {
        margin: 0;
      }
    }
  }
}
</style>
