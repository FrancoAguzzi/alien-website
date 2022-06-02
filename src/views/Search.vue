<template>
  <div>
    <section class="s-search">
      <div class="result">
        <div class="container">
          <div class="back" @click="backButton">
            <img src="@/assets/img/arrow-back-gray.svg" alt="" />
          </div>
          <div class="wrap-search">
            <input
              type="text"
              class="search-input"
              v-model="currentTerm"
              @keypress.enter="getSearchValue(currentTerm)"
              placeholder="Pesquise por título, autor ou genêro para buscar"
            />
            <div class="img-btn">
              <img
                src="@/assets/img/search-loupe.svg"
                alt="Ícone de Busca"
                @click="getSearchValue(currentTerm)"
              />
            </div>
          </div>
        </div>
      </div>

      <FadeAnimation>
        <main v-if="filteredResult.length > 0 && !loader">
          <div class="container">
            <div class="top">
              <h4 v-show="filteredResult.length > 0">
                {{ filteredResult.length }} resultados para <span>"{{ searchedTerm }}"</span>
              </h4>
            </div>
            <div class="all">
              <div v-for="(item, index) in filteredResult" :key="index" class="result-card-wrapper">
                <!-- cards -->
              </div>
            </div>
          </div>
        </main>
        <main v-else-if="loader">
          <div class="container">
            <div class="top">
              <SkeletonLoading :customSizes="{ width: '20rem', height: '1.5rem' }" />
            </div>
            <div class="all">
              <SkeletonCardList :listSize="5" :hasMargin="false" />
            </div>
          </div>
        </main>
        <div v-else class="empty-results">
          <div class="txt">
            <img src="@/assets/img/icon-empty-results.svg" alt="" class="icon" />
            <h3>Nenhum resultado disponível</h3>
            <p>Tente palavras-chave diferentes. Experimente buscar tema, autor, profissional...</p>
            <img src="@/assets/img/points-blue.svg" alt="" />
          </div>
        </div>
      </FadeAnimation>
    </section>
  </div>
</template>

<script>
import http from '@/http';
import { mapGetters } from 'vuex';
import debounce from 'lodash/debounce';
import { logoutUserMix } from '@/mixins';
import { utils } from '@/mixins/utils.js';
import SkeletonLoading from '@/components/SkeletonLoading';
import FadeAnimation from '@/components/animations/FadeAnimation';
import SkeletonCardList from '@/components/skeletons/SkeletonCardList';

export default {
  components: { FadeAnimation, SkeletonLoading, SkeletonCardList },
  mixins: [logoutUserMix, utils],
  props: {
    resultSearch: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      showFilter: false,
      currentTerm: this.resultSearch,
      searchedTerm: this.resultSearch,
      filter: {
        content: false,
        category: false,
        order: false,
      },
      result: [],
    };
  },
  computed: {
    ...mapGetters(['loader']),
    filteredResult() {
      if (!Array.isArray(this.result) || !this.result?.length) {
        return [];
      }

      const allowedGroups = ['FINCLASSES', 'FINDOCS', 'FINBOOKS'];
      return this.result.filter(
        (course) =>
          course.hasOwnProperty('courseGroup') && allowedGroups.includes(course.courseGroup)
      );
    },
  },
  watch: {
    '$route.params.resultSearch': function(value) {
      this.getSearchValue(value);
    },
  },
  created() {
    this.getSearchValue(this.resultSearch);
  },
  updated: debounce(function() {
    this.$nextTick(function() {
      this.$store.commit('TOOGLELOADER', false);
      this.$store.commit('TOOGLELOADERGENERAL', false);
      window.scrollTo(0, 0);
    });
  }, 1000),
  methods: {
    getSearchValue(value) {
      this.$store.commit('TOOGLELOADERGENERAL', true);

      if (value) {
        this.searchedTerm = value;

        http
          .post('/courses/search', { search: value })
          .then((response) => {
            this.result = response.data.data;
            this.$store.commit('TOOGLELOADERGENERAL', false);
          })
          .catch((err) => {
            this.handleGeneralException();
          });
      } else {
        setTimeout(() => {
          this.$store.commit('TOOGLELOADERGENERAL', false);
        }, 1000);
      }
    },
    backButton() {
      this.$router.go(-1);
    },
    navigate(item, type) {
      if (type === 'FINCLASSES') {
        this.$router.push({
          name: 'ExpertDetails',
          params: { id: item.courseID },
        });
      } else {
        const path =
          item.courseLessonCount > 1
            ? `/chapter/${this.overwriteFindocsType(item.courseGroup)}/${item.courseID}`
            : `/watch/${this.overwriteFindocsType(item.courseGroup)}/${item.courseID}`;

        this.$router.push({ path });
      }
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/_colors.scss';

.s-search {
  margin-top: 88px;
  .result {
    background: #0f1116;
    padding: 52px 0px;
    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .wrap-search {
        width: 90%;
        display: flex;
        align-items: center;
        .img-btn {
          cursor: pointer;
          border: 1px solid $dark-100;
          padding: 5px;
          box-sizing: border-box;
          height: 40px;
          width: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0px 6px 6px 0px;
          img {
            width: 1.1rem;
            height: 1.1rem;
          }
          &:hover {
            background-color: $dark-600;
          }
        }
        .search-input {
          width: 100%;
          border: 1px solid $dark-100;
          border-radius: 6px 0px 0 6px;
          font-size: 1.1rem;
          padding: 10px;
          height: 40px;
        }
      }
      .back {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        cursor: pointer;
        height: 30px;
        width: 30px;
        border: 1px solid $dark-100;
        background-color: transparent;
        border-radius: 50%;
        font-size: 1.125rem;
        z-index: 3000;
        &:hover {
          background-color: $dark-600;
        }
      }
    }
  }
  main {
    padding-top: 53px;
    padding-bottom: 128px;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 40px;
      margin-bottom: 80px;
      border-bottom: 1px solid #202227;
      h4 {
        color: #868793;
        span {
          color: #fff;
        }
      }
      .default-results {
        .all-filters {
          display: none;
          align-items: center;
          .filter {
            margin-right: 3.125rem;
          }
          .close-filter {
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #64666b;
            border-radius: 6px;
            transition: background-color 0.3s;
            &:hover {
              background-color: #64666b;
            }
          }
        }
        .btn-white {
          border: 1px solid #64666b;
          width: 180px;
        }
      }
    }
    .all {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 2.5rem;

      .result-card-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        .no-spacing {
          margin: 0 !important;
          padding: 0 !important;
        }
      }
    }
  }
  .empty-results {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10rem 0px;
    .txt {
      display: flex;
      flex-direction: column;
      align-items: center;
      h3 {
        margin-top: 3.5rem;
        margin-bottom: 0.5rem;
      }
      p {
        opacity: 0.7;
        margin-bottom: 2.5rem;
      }
    }
  }

  @media (max-width: 1200px) {
    main {
      .top {
        margin-bottom: 40px;
      }
    }
  }

  @media (max-width: 991px) {
    main {
      padding-top: 40px;
      padding-bottom: 40px;
      .all {
        grid-template-columns: 1fr 1fr;
      }
    }
  }

  @media (max-width: 450px) {
    margin-top: 70px;
    .result {
      padding: 30px 0px;
      .container {
        .wrap-search {
          width: 80%;
          display: flex;
          align-items: center;
          z-index: 3000;
          .img-btn {
            cursor: pointer;
            border: 1px solid $dark-100;
            padding: 5px;
            box-sizing: border-box;
            height: 40px;
            width: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0px 6px 6px 0px;
            img {
              width: 1.1rem;
              height: 1.1rem;
            }
            &:hover {
              background-color: $dark-600;
            }
          }
          .search-input {
            width: 100%;
            border: 1px solid $dark-100;
            border-radius: 6px 0px 0 6px;
            font-size: 1.1rem;
            padding: 10px;
            height: 40px;
          }
        }
        .back {
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          cursor: pointer;
          height: 30px;
          width: 30px;
          border: 1px solid $dark-100;
          background-color: transparent;
          border-radius: 50%;
          font-size: 1.125rem;
          &:hover {
            background-color: $dark-600;
          }
        }
      }
    }
    main {
      .all {
        grid-template-columns: 1fr;
      }
      .top {
        flex-direction: column;
        align-items: flex-start;
        padding-bottom: 30px;
        margin-bottom: 30px;
        .default-results {
          width: 100%;
          margin-top: 20px;
          .all-filters {
            position: relative;
            flex-direction: column;
            align-items: flex-start;
            .filter {
              margin-right: 0;
              margin-bottom: 1.25rem;
              &:last-child {
                margin-bottom: 0px;
              }
              & > div {
                flex-direction: column;
                align-items: flex-start;
                button {
                  margin-left: 0;
                }
              }
              .drop {
                left: 0;
                right: 0;
                top: 45px;
              }
            }
            .close-filter {
              position: absolute;
              top: 0;
              right: 0;
            }
          }
        }
      }
    }
    .empty-results {
      padding: 40px 0px;
      .txt {
        p {
          text-align: center;
          max-width: 305px;
          line-height: 22px;
        }
      }
    }
  }

  @media (hover: none) {
    .result {
      .container {
        .wrap-search {
          .img-btn {
            &:hover {
              background-color: transparent;
            }
          }
        }
        .back {
          &:hover {
            background-color: transparent;
          }
        }
      }
    }
  }
}
</style>
