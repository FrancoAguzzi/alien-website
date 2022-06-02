<template>
  <section class="s-content-theme">
    <div class="container">
      <h3>Descubra por tema</h3>

      <div class="swiper-content">
        <SwiperArrowSlide prefix="themes" :slidesPerView="{ '1210': 5, '375': 3.2 }">
          <div v-for="theme in sortedThemes" :key="theme?.value" class="swiper-slide">
            <button
              @click="searchByTags(theme.value)"
              :class="{ active: activeTab === theme.value }"
              class="theme-button"
            >
              {{ theme.label }}
            </button>
          </div>
        </SwiperArrowSlide>

        <FadeAnimation>
          <SwiperArrowSlide
            v-if="!isLoading"
            prefix="themes-content"
            :slidesPerView="{ '375': 1.3 }"
            class="slide-tema"
          >
            <div v-for="(card, index) in sliderItens" :key="index" class="swiper-slide">
              <SortCard :content="card" />
            </div>
          </SwiperArrowSlide>
          <div v-else class="skeleton-slide">
            <SkeletonSortByTheme v-for="index in 4" :key="index" class="skeleton-card" />
          </div>
        </FadeAnimation>

        <FadeAnimation>
          <div v-if="!isLoading" class="slide-mobile">
            <ul>
              <li class="list" v-for="(card, index) in sliderItens" :key="index">
                <div class="image">
                  <img :src="card.courseMedias.mediaPoster" />
                </div>
                <div class="content">
                  <strong>{{ card.courseTitle }}</strong>
                  <h4>{{ card.courseCenter }}</h4>
                  <p>{{ card.courseDescription }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div v-else class="slide-mobile">
            <ul>
              <li v-for="index in 3" :key="index" class="list">
                <div class="image">
                  <SkeletonLoading :customSizes="{ width: '100%', height: '100%' }" />
                </div>
                <div class="content skeleton-overwrite-justify">
                  <SkeletonSortByThemeMobile />
                </div>
              </li>
            </ul>
          </div>
        </FadeAnimation>
      </div>
    </div>
  </section>
</template>

<script>
// Components
import Slider from '@/components/Slider';
import SortCard from '@/components/SortCard';
import SwiperArrowSlide from '@/components/SwiperArrowSlide';
import FadeAnimation from '@/components/animations/FadeAnimation';
import SkeletonLoading from '@/components/SkeletonLoading';
import SkeletonSortByTheme from '@/components/skeletons/SkeletonSortByTheme';
import SkeletonSortByThemeMobile from '@/components/skeletons/SkeletonSortByThemeMobile';

// Helpers
import { logoutUserMix } from '@/mixins';
import { utils } from '@/mixins/utils.js';
import http from '@/http';

export default {
  name: 'SortByTheme',
  components: {
    Slider,
    SortCard,
    SwiperArrowSlide,
    FadeAnimation,
    SkeletonLoading,
    SkeletonSortByTheme,
    SkeletonSortByThemeMobile,
  },
  data() {
    return {
      activeTab: 'INTRODUTORIOS',
      themes: [
        {
          label: 'Introdutórios',
          value: 'INTRODUTORIOS',
        },
        {
          label: 'Criptoativos',
          value: 'CRIPTOATIVOS',
        },
        {
          label: 'Finanças',
          value: 'FINANCAS',
        },
        {
          label: 'Trading',
          value: 'TRADING',
        },
        {
          label: 'Economia Comportamental',
          value: 'ECONOMIA COMPORTAMENTAL',
        },
        {
          label: 'Gestão de Portfólio',
          value: 'GESTAO DE PORTFOLIO',
        },
        {
          label: 'Análise Fundamentalista',
          value: 'ANALISE FUNDAMENTALISTA',
        },
        {
          label: 'Negócios',
          value: 'BUSINESS',
        },
        {
          label: 'Economia',
          value: 'ECONOMIA',
        },
        {
          label: 'Renda Fixa',
          value: 'RENDA FIXA',
        },
        {
          label: 'Derivativos',
          value: 'DERIVATIVOS',
        },
        {
          label: 'Fundos',
          value: 'FUNDOS',
        },
      ],
      sliderItens: [],
      sliderTotal: 3,
      isLoading: false,
    };
  },
  computed: {
    sortedThemes() {
      const sorted = this.themes.sort((a, b) => {
        if (a.label === 'Introdutórios' || b.label === 'Introdutórios') {
          return 1;
        }

        return a.label > b.label ? 1 : -1;
      });

      return sorted;
    },
  },
  mounted() {
    this.searchByTags('INTRODUTORIOS');
  },
  mixins: [logoutUserMix, utils],
  methods: {
    resizeWatcher() {
      this.sliderTotal = document.documentElement.clientWidth > 600 ? 3 : 1;
      window.addEventListener('resize', () => {
        this.sliderTotal = document.documentElement.clientWidth > 600 ? 3 : 1;
      });
    },
    searchByTags(_theme) {
      this.isLoading = true;

      let allowedTags = [
        'FINDOCS', // TODO: update along with backend
        'FINSERIES',
        'MENTORING',
        'BUSINESS',
        'STARTUPS',
        'MARKET',
        'FINANCES',
        'INTRODUTORIOS',
        'FINANCAS',
        'TRADING',
        'ECONOMIA COMPORTAMENTAL',
        'GESTAO DE PORTFOLIO',
        'ANALISE FUNDAMENTALISTA',
        'RENDA FIXA',
        'NEGOCIOS',
        'ECONOMIA',
        'FUNDOS',
        'DERIVATIVOS',
        'CRIPTOATIVOS',
      ];

      if (allowedTags.includes(_theme)) {
        this.activeTab = _theme;
        http
          .post(`/courses`, { courseTags: new Array(_theme) })
          .then((response) => {
            if (response.data.status) {
              this.sliderItens = response.data.data.filter((item) => !item.courseRequireToken);
            }
          })
          .catch((err) => {
            this.handleGeneralException();
          })
          .finally(() => (this.isLoading = false));
      } else {
        this.activeTab = '';
        http
          .post(`/courses`, { limit: 5 })
          .then((response) => {
            if (response.data.status) {
              this.sliderItens = response.data.data.filter((item) => !item.courseRequireToken);
            }
          })
          .catch((err) => {
            this.handleGeneralException();
          })
          .finally(() => (this.isLoading = false));
      }
    },
  },
  created() {
    this.resizeWatcher();
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.s-content-theme {
  background: linear-gradient(180deg, rgba(32, 34, 39, 0.5) 0%, rgba(32, 34, 39, 0) 100%);
  padding-top: 3rem;
  padding-bottom: 7.5rem;

  h3 {
    color: $dark-100;
    margin-bottom: 2.5rem;

    @media (max-width: 450px) {
      margin: 0 15px;
    }
  }

  .docs-card {
    margin-left: 0;
  }

  .swiper-content {
    @media (max-width: 450px) {
      padding: 0 15px;
    }

    button {
      width: 100%;
      padding: 25px 0;
      height: 100%;
      border: 2px solid #202227;
      border-radius: 6px;
      text-align: center;
      font-weight: 600;
      font-size: 1.125rem;
      letter-spacing: -0.005em;
      transition: all 0.3s;
      cursor: pointer;

      &.active {
        background-color: $dark-100;
      }
      &:hover {
        background-color: $dark-100;
      }

      @media (max-width: 450px) {
        height: 55px;
        padding: 10px 5px;
        font-size: 0.7rem;
      }
    }
  }

  .tab-content {
    margin-top: 3rem;

    .tab-pane {
      position: relative;
      display: none;
      &.active {
        display: block;
      }
    }
  }
  .slide-tema {
    display: block;
  }
  .slide-mobile {
    display: none;
  }
  @media (max-width: 1200px) {
    padding: 4rem 0px;
    .container {
      padding: 0;
    }
    h3 {
      padding: 0px 0px;
    }
    ul {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 15px;
      padding: 0px 24px;
      li {
        a {
          width: 100%;
        }
      }
    }
  }
  @media (max-width: 600px) {
    ul {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 450px) {
    padding: 2.5rem 0px;
    h3 {
      margin-bottom: 1.5rem;
    }
    .container {
      > div {
        width: 100%;
        overflow-x: auto;
        margin-top: 25px;
        scrollbar-color: transparent transparent;
        &::-webkit-scrollbar {
          height: 0;
        }
      }
    }
    ul {
      width: fit-content;
      display: flex;
      grid-gap: 0;
      padding: 0px 15px;
      li {
        margin-right: 15px;
        &:first-child {
          margin-left: 0;
        }
        a {
          line-height: 100%;
          min-width: 100px;
          padding: 13px 15px;
          border: none;
          border-radius: 0px;
          &.active {
            background-color: transparent;
            border-bottom: 2px solid #00e7f9;
          }
        }
      }
    }
    .slide-tema {
      margin-top: 0;
      display: none;
    }
    .slide-mobile {
      display: block;
      ul {
        display: block;
        width: 100%;
        padding: 0;
        .list {
          display: grid;
          grid-template-columns: 80px calc(100% - 80px);
          align-items: center;
          width: 100%;
          padding: 15px 15px;
          gap: 10px;
          .image {
            width: 80px;
            height: 115px;
            border-radius: 6px;
            background-size: cover;
            background-position: center;
            img {
              width: 100%;
              height: 100%;
              border-radius: 6px;
            }
          }
          .content {
            padding: 0 0 0 10px;
            box-sizing: border-box;
            height: 115px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            strong {
              color: $dark-900;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-top: 10px;
            }
            h4 {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              margin-top: 7px;
            }
            p {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              font-size: 14px;
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
}

/**
 * Skeleton Classes
 */
.skeleton-slide {
  display: flex;
  justify-content: space-between;

  @media (max-width: 450px) {
    display: none;
  }
}

.skeleton-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.skeleton-overwrite-justify {
  justify-content: flex-start !important;
}
</style>
