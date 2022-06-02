<template>
  <section class="main__feedbacks">
    <h2 class="main__feedbacks-title">CLIENTES</h2>
    <ul ref="slider" class="main__feedbacks-list">
      <li
        v-for="({ tattoo, text, clientName, clientIg }, index) in feedbacks"
        :key="index"
        class="card"
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
    </ul>
    <div class="main__feedbacks-arrows">
      <button @click="navigateTo(currentPage - 1)" class="arrow"></button>
      <button @click="navigateTo(currentPage + 1)" class="arrow"></button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Feedbacks',
  data() {
    return {
      currentPage: 0,
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
  methods: {
    navigateTo(slide) {
      const slideWidth = 290 + 44;

      if (slide) {
        this.$refs.slider.scroll(slideWidth * slide, 0);
        this.currentPage = slide;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.main__feedbacks {
  padding: 60px 0 80px;
  background-color: $white;
  max-width: 100vw;
  overflow: hidden;
  box-shadow: 0px 0px 20px 40px $white;

  &-title {
    font-size: 32px;
    color: $dark-900;
    text-align: center;
    margin-bottom: 40px;
  }

  &-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 1024px;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    user-select: none;
    padding: 0;
    // margin: 0 auto;
    // padding-left: 50%;
  }

  &-arrows {
    display: flex;
    justify-content: space-between;
  }
}

.card {
  display: inline-block;
  // margin: 0 32px;
  position: relative;
  min-width: 435px;
  min-height: 630px;
  cursor: pointer;
  transition: all 0.3s;
  background-size: cover;
  background-position: left;
  background-repeat: no-repeat;
  // border-radius: 6px;
  overflow-y: hidden;

  // &.highlighted {
  //   width: 340px;
  //   height: 480px;
  // }

  &:first-child {
    margin-left: unset;
  }

  &:last-child {
    margin-right: unset;
  }

  &:after {
    content: '';
    width: 8px;
    height: 8px;
    background-color: $white;
    position: absolute;
    right: -36px;
    top: calc(50% - 4px);
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
