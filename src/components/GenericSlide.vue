<template>
  <div class="container">
    <div class="content">
      <div class="wrap-titles">
        <img :src="icon" class="title-icon" />
        <router-link :to="showAllRoute" v-if="showAll">
          ver todos <img src="@/assets/img/arrow-right.svg" alt="" />
        </router-link>
      </div>

      <SwiperArrowSlide :prefix="showAllRoute">
        <li v-for="item in content" :key="item.courseID" class="swiper-slide">
          <!-- cards -->
        </li>
      </SwiperArrowSlide>
    </div>
  </div>
</template>

<script>
import SwiperArrowSlide from '@/components/SwiperArrowSlide';

export default {
  components: {
    SwiperArrowSlide,
  },
  props: {
    content: { type: Array, required: true },
    showAllRoute: { type: String, required: true, default: '/finclasses' },
    icon: { type: String, required: false },
    showAll: { type: Boolean, required: false, default: false },
    routerPathName: { type: String, required: false, default: '/expert-details/' },
    isFinclasses: { type: Boolean, required: false, default: true },
    isFinseries: { type: Boolean, required: false, default: false },
  },
  mounted() {
    if (this.content) {
      this.content.sort((active, soon) => active.courseRequireToken - soon.courseRequireToken);
      this.content.sort((a, b) =>
        a.courseRelease < b.courseRelease ? 1 : b.courseRelease < a.courseRelease ? -1 : 0
      );
    }
  },
  methods: {
    navigate(card) {
      const path = `${this.routerPathName}/${card.courseID}`;
      this.$router.push({ path });
      if (window.location.href.includes(this.routerPathName)) {
        window.location.href = window.location.origin + path;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.content {
  width: 100%;
  padding: 48px 0;
  position: relative;
  .swiper-slide {
    width: fit-content !important;
  }
  .title-icon {
    margin-bottom: 2vh;
  }

  .wrap-titles {
    display: flex;
    justify-content: space-between;

    a {
      font-weight: bold;
      display: flex;
      width: fit-content;
      align-items: center;

      img {
        width: 10px;
        margin-left: 5px;
      }
    }
  }
}
</style>
