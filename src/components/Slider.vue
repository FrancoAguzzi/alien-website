<template>
  <div class="slider-component">
    <button :disabled="disab" type="button" class="left-control" @click="slideLeft"></button>
    <div class="content-slider">
      <slot></slot>
    </div>
    <button :disabled="disab" type="button" class="right-control" @click="slideRight"></button>
  </div>
</template>
<script>
export default {
  props: ['controls'],
  data() {
    return {
      disab: false,
    };
  },
  methods: {
    slideLeft() {
      var scrollAmount = 300;
      this.disab = true;
      var container = document.querySelector('.content-slider');
      var slideTimer = setInterval(function () {
        container.scrollLeft -= 10;
        scrollAmount -= 10;
        if (scrollAmount === 0) {
          window.clearInterval(slideTimer);
        }
      }, 25);
      this.disab = false;
    },
    slideRight() {
      var scrollAmount = 0;
      this.disab = true;
      var container = document.querySelector('.content-slider');
      var slideTimer = setInterval(function () {
        container.scrollLeft += 10;
        scrollAmount += 10;
        if (scrollAmount >= 300) {
          window.clearInterval(slideTimer);
        }
      }, 25);
      this.disab = false;
    },
    scrollHorizontal() {
      const slider = document.querySelector('.content-slider');
      let isDown = false;
      let startX;
      let scrollLeft;
      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
      });
      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
      });
      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
      });
    },
  },
  mounted() {
    this.scrollHorizontal();
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';
.slider-component {
  width: 100%;
  display: grid;
  grid-template-columns: 2% 96% 2%;
  .left-control {
    transform: rotate(180deg);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      width: 75%;
    }
  }
  .right-control {
    transform: rotate(360deg);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      width: 75%;
    }
  }
  .content-slider {
    position: relative;
    height: auto;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    scrollbar-width: thin;
    scrollbar-color: #0093dc #00e7f9;
    padding-bottom: 10px;
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    &::-webkit-scrollbar {
      height: 3px;
      border-radius: 50%;
      border: 1px solid #00e7f9;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
      width: 3px;
      height: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background: #00e7f9;
    }
  }
  @media (max-width: 450px) {
    display: none;
  }
}
</style>
