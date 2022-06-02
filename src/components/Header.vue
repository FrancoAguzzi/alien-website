<template>
  <header class="header">
    <nav class="header__list">
      <li class="header__list-item">
        <a class="item" href="/">
          <img class="item__logo" src="@/assets/img/logo-preta-notext.png" alt="" />
        </a>
      </li>
      <li class="header__list-item">
        <a v-if="!isShop" class="item desktop" href="/shop">
          <p class="item__text">SHOP</p>
        </a>
        <a v-else class="item desktop" href="/login">
          <p class="item__text">FAZER LOGIN</p>
        </a>
        <button @click="toggleBurger" :class="['burger mobile', { open: burgerOpened }]">
          <span class="burger__lines"></span>
          <span class="burger__greenDot"></span>
        </button>
      </li>
    </nav>
    <nav :class="['header__burgerNav mobile', { open: burgerOpened }]">
      <li class="header__burgerNav-item"></li>
      <li class="header__burgerNav-item">
        <a v-if="!isShop" class="item" href="/shop">
          <p class="item__text">SHOP</p>
        </a>
        <a v-else class="item desktop" href="/login">
          <p class="item__text">FAZER LOGIN</p>
        </a>
      </li>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    isShop: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      burgerOpened: false,
    };
  },
  methods: {
    toggleBurger() {
      this.burgerOpened = !this.burgerOpened;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';

@keyframes greenDotBurgerAnimation {
  9% {
    transform: scale3d(1, 1, 1);
  }
  40% {
    left: -50vw;
    top: 200px;
  }
  // 27% {
  //   transform: scale3d(2, 2, 2);
  // }
  // 36% {
  //   transform: scale3d(1, 1, 1);
  // }
  // 100% {

  //   }
}

.mobile {
  display: block;

  @media screen and (min-width: 768px) {
    display: none;
  }
}

.desktop {
  display: none;

  @media screen and (min-width: 768px) {
    display: block;
  }
}

.header {
  position: relative;

  &__burgerNav {
    width: 100%;
    position: absolute;
    left: 0%;
    transform: translateY(-100vh);
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: $ufo-green;
    display: flex;
    flex-direction: column;
    z-index: $first-layer;

    &.open {
      transform: translateY(0%);
    }

    &-item {
      padding: 20px 55px;

      &:not(:last-child) {
        border-bottom: 1px solid $white;
      }

      .item__text {
        color: $dark-900;
      }
    }
  }

  &__list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    padding: 0 40px;
    margin: 0;
    z-index: $first-layer;

    &-item {
      display: flex;
      align-items: center;
    }

    .item {
      display: flex;
      align-items: center;

      img {
        width: 240px;
        margin-right: 60px;
      }

      &__text {
        font-family: 'Proxima Nova Bold';
        color: $dark-900;
      }
    }
  }

  .burger {
    cursor: pointer;
    width: 30px;
    height: 4px;
    position: relative;
    border: none;
    background: transparent;

    &__greenDot {
      animation: greenDotBurgerAnimation 0.4s infinite;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: $ufo-green;
      position: absolute;
      left: calc(50% - 1px);
      top: calc(50% - 2px);
      transform: scale3d(0, 0, 0);
    }

    &__lines:after,
    &:after,
    &__lines:before,
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: $dark-900;
      transition: all 0.2s;
    }

    &__lines:before,
    &:before {
      bottom: 8px;
    }

    &:after {
      top: 8px;
    }

    &__lines:after {
      top: 0px;
    }

    &.open {
      &:before {
        left: 12.5px;
        transform: rotateZ(45deg);
        transition: all 0.2s;
      }

      &:after {
        top: 10px;
        left: 12.5px;
        transform: rotateZ(-45deg);

        transition: all 0.2s;
      }

      .burger__lines:after {
        top: 10px;
        left: -7px;
        transform: rotateZ(45deg);
        transition: all 0.2s;
      }

      .burger__lines:before {
        top: -8px;
        left: -7px;
        transform: rotateZ(-45deg);
        transition: all 0.2s;
      }
    }
  }

  @media screen and (min-width: 768px) {
    padding: 0 80px;
  }
}
</style>
