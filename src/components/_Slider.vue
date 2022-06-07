<template>
  <div class="container">
    <div class="slider">
      <img :src="icon" />
      <div
        class="wrap-card"
        @mousedown="startTouch($event)"
        @mouseup="endTouch($event)"
        @touchstart="startTouch($event)"
        @touchend="endTouch($event)"
      >
        <div
          class="card"
          v-for="(card, index) in splitContent()"
          :key="index"
          :style="`width: calc(90% / ${gridAmount});`"
        >
          <div class="card-experts">
            <img :src="card.courseMedias.mediaThumb" />
            <div class="info">
              <span>{{ card.courseTitle }}</span>
              <h3>{{ card.courseCenter }}</h3>
              <div>
                <p>{{ card.courseExtras.finclass.centerCompany }}</p>
                <p>{{ card.courseExtras.finclass.centerDescription }}</p>
              </div>
              <div class="actions">
                <router-link :to="`/expert-details/${card.courseID}`" class="btn-details">
                  <div class="icon"></div>
                  detalhes
                </router-link>
                <button class="btn-favorites js-btn-favorite"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination-wrap">
        <button
          :disabled="disabled"
          type="button"
          @click="leftSlide()"
          :class="slide === 0 ? '' : 'show'"
        >
          <!-- <img src="@/assets/img/arrow-right.svg" alt="" /> -->
        </button>
        <button
          :disabled="disabled"
          type="button"
          @click="rightSlide()"
          :class="slide === finContent.length - gridAmount ? '' : 'show'"
        >
          <!-- <img src="@/assets/img/arrow-right.svg" alt="" /> -->
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gridAmount: 1,
      slide: 0,
      disabled: false,
      mouse: {
        start: 0,
        end: 0,
      },
    };
  },
  props: ['title', 'finContent', 'icon'],
  methods: {
    splitContent() {
      return this.finContent.slice(this.slide, this.slide + this.gridAmount);
    },
    rightSlide() {
      this.disabled = true;
      const wrapper = document.querySelector('.wrap-card');
      wrapper.classList.remove('slideRight');
      wrapper.classList.remove('slideLeft');
      setTimeout(() => {
        wrapper.classList.add('slideRight');
        this.slide =
          this.slide++ >= this.finContent.length - this.gridAmount
            ? this.finContent.length - this.gridAmount
            : this.slide++;
        this.disabled = false;
      }, 300);
    },
    leftSlide() {
      this.disabled = true;
      const wrapper = document.querySelector('.wrap-card');
      wrapper.classList.remove('slideLeft');
      wrapper.classList.remove('slideRight');
      setTimeout(() => {
        wrapper.classList.add('slideLeft');
        this.slide = this.slide-- <= 0 ? 0 : this.slide--;
        this.disabled = false;
      }, 500);
    },
    startTouch(event) {
      this.mouse.start =
        event.changedTouches !== undefined ? event.changedTouches[0].clientX : event.clientX;
    },
    endTouch(event) {
      this.mouse.end =
        event.changedTouches !== undefined ? event.changedTouches[0].clientX : event.clientX;
      this.mouse.start < this.mouse.end ? this.leftSlide() : this.rightSlide();
    },
  },
};
</script>
<style lang="scss">
.slider {
  width: 100%;
  padding: 48px 0;
  position: relative;
  overflow-x: hidden;
  .wrap-card {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
    height: 420px;
    overflow: hidden;
    &.slideLeft {
      animation-name: slideLeft;
      animation-duration: 400ms;
      animation-fill-mode: forwards;
    }
    &.slideRight {
      animation-name: slideRight;
      animation-duration: 400ms;
      animation-fill-mode: forwards;
    }
    .card {
      margin: 0;
      &:first-child {
        padding-left: 12px;
      }
      &:last-child {
        padding-right: 12px;
      }
    }
  }
  .pagination-wrap {
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 100%;
    top: 40%;
    opacity: 0;
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    button {
      width: 12px;
      cursor: pointer;
      visibility: hidden;
      &.show {
        visibility: visible;
      }
      img {
        width: 100%;
      }
      &:first-child {
        transform: scaleX(-1);
      }
    }
  }
  &:hover {
    .pagination-wrap {
      opacity: 1;
    }
  }
  @media (max-width: 450px) {
    .wrap-card {
      justify-content: center;
    }
  }
}

@keyframes slideLeft {
  from {
    right: 25%;
  }
  to {
    right: 0px;
  }
}
@keyframes slideRight {
  from {
    left: 25%;
  }
  to {
    left: 0px;
  }
}
</style>
