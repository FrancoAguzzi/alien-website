<template>
  <header class="header-page-forms" :class="header ? 'fixed-header' : ''">
    <div class="container">
      <button type="button" @click="navigate('/login')">
        <img src="@/assets/img/logo-color.svg" alt="" class="logo" />
      </button>
      <button type="button" @click="navigate('/login')" class="btn-white">Entrar</button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderOffline',
  data() {
    return {
      header: false,
    };
  },
  created() {
    window.addEventListener('scroll', () => {
      window.scrollY > 50 ? (this.header = true) : (this.header = false);
    });
  },
  methods: {
    navigate(path) {
      this.$router.push({ path, query: this.$route.query });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2030;
  &.fixed-header {
    background: rgba(0, 0, 0, 0.95);
    border-color: transparent;
  }
  &.header-page-forms {
    padding: 45px 0px;
    .container {
      justify-content: space-between;
    }
    .btn-white {
      max-width: 136px;
      border: 1px solid #64666b;
      background: transparent;
      color: #fff;
      &:hover {
        border: 1px solid #fff;
        background: #fff;
        color: $dark-900;
      }
    }
  }
  main {
    position: relative;
    z-index: 1;
    height: 88px;
    border-bottom: 1px solid rgba(134, 136, 141, 0.25);
    transition: all 0.3s;
    .logo {
      position: relative;
      z-index: 2;
    }
  }
  &.show-search {
    pointer-events: all;
    main {
      background: rgba(32, 34, 39, 0.8);
      backdrop-filter: blur(80px);
    }
    .search-input {
      opacity: 1;
      pointer-events: all;
      transform: translateY(0px);
    }
  }
  &.fixed-header {
    main {
      background: rgba(32, 34, 39, 0.8);
      border-color: transparent;
      backdrop-filter: blur(80px);
    }
  }
  .container {
    display: flex;
    align-items: center;
    height: 100%;
  }
  @media (max-width: 450px) {
    height: 70px;
    &.header-page-forms {
      .logo {
        max-width: 130px;
      }
    }
  }
}
</style>
