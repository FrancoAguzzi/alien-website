<template>
  <section class="main__feedbacks">
    <h2 class="main__feedbacks-title">CLIENTES QUE TIVERAM SUAS IDEIAS ETERNIZADAS POR MIM:</h2>
    <Flickity ref="flickity" :options="flickityOptions" class="main__feedbacks-list flickity">
      <li
        v-for="({ tattoo, clientIg, clientName, text }, index) in feedbacks"
        :key="index"
        class="card carousel-cell"
        :style="{ backgroundImage: `url(${tattoo})` }"
      >
        <div class="card__content">
          <a class="card__content-clientIg" :href="clientIg.link">{{ clientIg.label }}</a>
          <p class="card__content-clientName">{{ clientName }}</p>
          <div class="card__content-text">
            <p>{{ text }}</p>
          </div>
        </div>
        <div class="shadow-hover"></div>
      </li>
    </Flickity>
    <p class="main__feedbacks-subtitle">
      Veja como a <b style="color: #000">clareza</b> e o <b style="color: #000">entendimento</b>,
      fizeram com que eles tivessem <b style="color: #000">a tatuagem que sempre imaginaram</b>, mas
      que ainda não havia sido mostrada a eles...
    </p>
  </section>
</template>

<script>
import Flickity from 'vue-flickity';

export default {
  name: 'Feedbacks',
  components: { Flickity },
  data() {
    return {
      currentPage: 0,
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: true,
        pageDots: true,
        wrapAround: true,
        fullscreen: true,
        adaptiveHeight: true,
        lazyLoad: true,
        cellAlign: 'center',
      },
      feedbacks: [
        {
          tattoo:
            'https://res.cloudinary.com/dwtl1a1x2/image/upload/v1652815051/alien%20photos/IMG_9768_m6wnum.jpg',
          text: 'Foi foda cara! Bom pra cacete, tava deitadão de boa e do nada zuuuuuuuuuum uma nave me abduziu pra um outro planeta. Olhei ao redor e vi vários homens carecas com tatuagem até o pescoço saudando um ser que chamavam de Pic.',
          clientName: 'João Kuerten',
          clientIg: {
            link: '',
            label: '@joao.kuerten',
          },
        },
        {
          tattoo:
            'https://res.cloudinary.com/dwtl1a1x2/image/upload/v1652815051/alien%20photos/IMG_9764_bej7xl.jpg',
          text: 'Foi foda cara! Bom pra cacete, tava deitadão de boa e do nada zuuuuuuuuuum uma nave me abduziu pra um outro planeta. Olhei ao redor e vi vários homens carecas com tatuagem até o pescoço saudando um ser que chamavam de Pic.',
          clientName: 'Rohil Guerreiro',
          clientIg: {
            link: '',
            label: '@rohilart',
          },
        },
        {
          tattoo:
            'https://res.cloudinary.com/dwtl1a1x2/image/upload/v1652815051/alien%20photos/IMG_9766_jj5rhv.jpg',
          text: 'Foi foda cara! Bom pra cacete, tava deitadão de boa e do nada zuuuuuuuuuum uma nave me abduziu pra um outro planeta. Olhei ao redor e vi vários homens carecas com tatuagem até o pescoço saudando um ser que chamavam de Pic.',
          clientName: 'Franco Aguzzi',
          clientIg: {
            link: '',
            label: '@franco.aguzzi',
          },
        },
        {
          tattoo:
            'https://res.cloudinary.com/dwtl1a1x2/image/upload/v1652815051/alien%20photos/IMG_9763_ld1uyk.jpg',
          text: 'Foi foda cara! Bom pra cacete, tava deitadão de boa e do nada zuuuuuuuuuum uma nave me abduziu pra um outro planeta. Olhei ao redor e vi vários homens carecas com tatuagem até o pescoço saudando um ser que chamavam de Pic.',
          clientName: 'Lucas Schimidt',
          clientIg: {
            link: '',
            label: '@lucas.schimidt',
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

  &-list {
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

    @media screen and (min-width: 1600px) {
      max-width: 1200px;
    }
  }
}

.card {
  display: inline-block;
  margin: 0 30px;
  position: relative;
  min-width: 375px;
  min-height: 630px;
  cursor: pointer;
  transition: all 0.3s;
  background-size: cover;
  background-position: left;
  background-repeat: no-repeat;
  overflow-y: hidden;

  &:first-child {
    &:before {
      content: 'Clique para ler o depoimento 👽';
      position: absolute;
      left: 10px;
      top: 10px;
      color: $white;
      font-family: 'Proxima Nova Light';
      font-size: 0.875rem;

      @media screen and (min-width: 1024px) {
        content: '';
      }
    }
  }

  &__content {
    max-width: 100%;
    padding: 32px 16px 14px;
    position: absolute;
    z-index: 20;
    bottom: -125px;
    background-image: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8) 20%);
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &-clientIg {
      letter-spacing: -0.005em;
      color: $dark-900;
      opacity: 0.7;
      transition: opacity 0.3s;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100%;
      font: 600 20px/145% 'Proxima Nova Bold';
      margin: 0 0 10px;
    }

    &-clientName {
      display: block;
      font: 600 14px/145% 'Proxima Nova Semibold';
      letter-spacing: -0.005em;
      color: $dark-900;
      display: block;
      margin: 0 0 4px;
    }

    &-text {
      font-size: 1.125rem;
      line-height: 145%;
      letter-spacing: -0.005em;
      color: $dark-900;
      opacity: 0.7;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      min-height: 60px;
      max-height: 60px;
      margin-top: 20px;
      font-family: 'Proxima Nova Regular';
      text-align: right;

      &:before {
        content: '';
        position: absolute;
        height: 2px;
        background-color: $dark-900;
        width: 275px;
        top: 103px;
        right: 0;
      }
    }
  }

  .shadow-hover {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(180deg, transparent, #ffffff80);
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0%;
    z-index: 1;
    transition: all 0.3s;
  }

  &:hover {
    .shadow-hover {
      height: 100%;
      display: block;
    }

    .card__content {
      bottom: 0;
      transition: all 0.3s;

      &-text {
        opacity: 1;
        max-height: unset;
      }
    }
  }
}
</style>
