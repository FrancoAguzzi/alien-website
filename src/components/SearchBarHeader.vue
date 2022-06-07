<template>
  <div class="search-input" id="search-input">
    <div class="container">
      <form @submit.prevent="search" autocomplete="off">
        <input
          type="text"
          v-model="searchInput"
          placeholder="Pesquise por título, autor ou genêro"
          required
        />
        <div>
          <input type="submit" value="Pesquisar" />
          <button type="button" id="js-close-search" @click="onClose">
            <!-- <img src="@/assets/img/x-close.svg" alt="" /> -->
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showUserDropDown: false,
      searchInput: null,
    };
  },
  methods: {
    onClose() {
      this.$emit('clicked', false);
    },
    search() {
      this.onClose();
      this.$route.name !== 'Search'
        ? this.$router.push({ name: 'Search', params: { resultSearch: this.searchInput } })
        : this.$router.replace({ name: 'Search', params: { resultSearch: this.searchInput } });
    },
  },
  watch: {
    $route(to, from) {
      this.onClose();
    },
  },
};
</script>

<style scoped lang="scss">
@import '../assets/scss/_colors.scss';
header .search-input {
  background: #000;
  width: 100%;
  opacity: 0;
  pointer-events: all;
  -webkit-transform: translateY(-80px);
  -ms-transform: translateY(-80px);
  transform: translateY(-80px);
  pointer-events: none;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 4000;
}
header .search-input form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 100%;
}
header .search-input form input[type='text'] {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-size: 1.125rem;
  line-height: 145%;
  letter-spacing: -0.005em;
  color: #ffffff;
  margin-right: 2.5rem;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 3px;
  margin: 0 auto 0px auto;
}
header .search-input form input[type='text']::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.6);
}
header .search-input form input[type='text']::-moz-placeholder {
  color: rgba(255, 255, 255, 0.6);
}
header .search-input form input[type='text']:-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.6);
}
header .search-input form input[type='text']::-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.6);
}
header .search-input form input[type='text']::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
header .search-input form > div {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
header .search-input form input[type='submit']:hover {
  background: #fff;
  color: #000;
}
header .search-input form button {
  width: 48px;
  height: 48px;
  background-color: #202227;
  border-radius: 6px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}
header .search-input form button:hover {
  background-color: #17181b;
}
.search-input {
  background: $dark-900;
  width: 100%;
  height: 80px;
  opacity: 0;
  pointer-events: all;
  transform: translateY(-80px);
  pointer-events: none;
  transition: all 0.3s;
  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    input[type='text'] {
      flex: 1;
      font-size: 1.125rem;
      line-height: 145%;
      letter-spacing: -0.005em;
      color: #ffffff;
      caret-color: $dark-900;
      margin-right: 2.5rem;
      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }
    }
    > div {
      display: flex;
      align-items: center;
    }
    input[type='submit'] {
      width: 160px;
      height: 48px;
      border: 1px solid #ffffff;
      border-radius: 6px;
      text-align: center;
      font-weight: 600;
      font-size: 1rem;
      color: #ffffff;
      cursor: pointer;
      margin-right: 1.5rem;
      transition: all 0.3s;
      &:hover {
        background: #fff;
        color: $dark-900;
      }
    }
    button {
      width: 48px;
      height: 48px;
      background-color: #202227;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      &:hover {
        background-color: #17181b;
      }
    }
  }
}
@media (max-width: 450px) {
  .search-input {
    height: auto;
    padding: 20px 0px;
    form {
      flex-direction: column;
      align-items: flex-start;
      box-sizing: border-box;
      input[type='text'] {
        width: 100%;
        margin-right: 0;
        margin-bottom: 20px;
        border: 1px solid $dark-100 !important;
      }
      input[type='submit'] {
        flex: 1;
        height: 32px;
      }
      > div {
        width: 100%;
        justify-content: space-between;
        margin-top: 3vh;
        button {
          &#js-close-search {
            height: 34px;
            width: 34px;
          }
        }
      }
    }
  }
}
</style>
