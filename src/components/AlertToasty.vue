<template>
  <div :class="['wrap-toasty', { top: isTopToasty }]">
    <div :class="['alert', classType[status]]">
      <div class="wrap-content">
        <div class="icon">
          <img :src="icon" alt="" />
        </div>
        <div class="txt">
          <strong>{{ title }}</strong>
          <p>{{ message }}</p>
        </div>
      </div>
      <button class="close js-close-alert" @click="closeModal">
        <img src="@/assets/img/close-notification.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertToasty',
  emits: ['closeModal'],
  data() {
    return {
      showModal: false,
      classType: {
        100: 'alert-info',
        200: 'alert-success',
        400: 'alert-warning',
        500: 'alert-error',
      },
    };
  },
  props: ['status', 'show', 'message', 'title', 'isTopToasty', 'showFinclubIcons'],
  created() {
    this.showModal = this.show;
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', false);
    },
  },
  computed: {
    icon: function() {
      let icon;
      if (+this.status === 100) {
        icon = this.showFinclubIcons ? 'alert-info' : 'finclub/icon-info';
      } else if (this.status === 200) {
        icon = this.showFinclubIcons ? 'alert-success' : 'finclub/icon-success-squared';
      } else if (+this.status === 400) {
        icon = this.showFinclubIcons ? 'alert-warning' : 'warning';
      } else {
        icon = this.showFinclubIcons ? 'alert-danger' : 'icon-error';
      }

      return require(`@/assets/img/${icon}.svg`);
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/_colors.scss';

.alert {
  position: fixed;
  bottom: 1.5rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 8px;
  padding: 20px 24px;
  width: 100%;
  max-width: 1060px;
  z-index: 2021;
}

.alert .icon {
  margin-right: 1.5rem;
}

.alert .wrap-content {
  max-width: 100%;
  display: grid;
  grid-template-columns: 1fr 11fr 1fr;
}

.alert .txt {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.alert .txt strong {
  font-weight: bold;
  font-size: 1rem;
  line-height: 115%;
  letter-spacing: -0.005em;
  color: #000;
}

.alert .txt p {
  font-size: 16px;
  line-height: 145%;
  letter-spacing: -0.005em;
  opacity: 0.7;
  max-width: 628px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  color: #000;
}

.alert button {
  position: absolute;
  right: 24px;
  top: 24px;
}

.alert {
  &.alert-success {
    border: 2px solid #74e79d;
    background-color: rgba(98, 212, 139, 0.9);
  }

  &.alert-warning {
    border: 2px solid #fff8bd;
    background-color: rgba(255, 245, 153, 0.9);
  }

  &.alert-error {
    border: 2px solid #ffaba0;
    background-color: rgba(250, 142, 141, 0.9);
  }
}

@media (max-width: 450px) {
  .alert {
    padding: 10px;
    width: 90%;
    button {
      top: 5px;
      right: 5px;
    }
  }
  .alert .icon {
    display: none;
    margin-right: 0;
  }
  .alert .txt p {
    word-wrap: break-word;
    max-width: 100%;
  }
  .alert .wrap-content {
    max-width: 100%;
    display: grid;
    grid-template-columns: 11fr 1fr;
    gap: 3vw;
  }
}

.alert.alert-error {
  border: 1px solid #ff6682;
}

.wrap-toasty {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  &.top {
    .alert {
      bottom: unset;
      top: 100px;
      left: 0;
      background: #0f1116;
      margin: 0 20px;
      border: 1px solid $dark-900;
      border-radius: 8px;
      padding: 10px 10px;
      background-color: $dark-900;
      z-index: 99;
      width: calc(100vw - 40px);
      max-width: unset;

      &.alert-info {
        border: 1px solid $white;
        background-color: $info-opacity10;
      }

      &.alert-error {
        border: 1px solid $error;
        background-color: $error-opacity10;
      }

      &.alert-success {
        border: 1px solid $dark-900;
        background-color: $dark-900;
      }

      &.alert-warning {
        border: 1px solid $warning;
        background-color: $warning-opacity10;
      }

      .wrap-content {
        display: flex;
        align-items: center;

        .icon {
          display: block !important;
          width: 16px;
          height: 16px;
          margin-right: 10px;
        }

        .txt p {
          color: $white;
          font-size: 0.875rem;
        }
      }

      .close {
        width: 30px;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}

@media screen and (min-width: 1440px) {
  .wrap-toasty.top {
    background-color: transparent;

    .alert {
      position: relative;
      top: 0;
      max-width: 320px;
      left: -20px;
      padding-right: 0;

      .wrap-content .icon {
        margin-right: 10px;
      }
    }
  }
}
</style>
