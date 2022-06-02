<template>
  <div class="docs-card" @click="setURL(content)">
    <div class="doc-content">
      <div class="image-card">
        <img :src="content.courseMedias.mediaBanner" alt="" />
      </div>
      <div class="general-titles">
        <h3>{{ content.courseTitle }}</h3>
        <p>{{ content.courseCenter }}</p>
      </div>
    </div>
    <div class="shadow-hover"></div>
  </div>
</template>

<script>
import { utils } from '@/mixins/utils.js';

export default {
  props: ['content', 'bottom'],
  mixins: [utils],
  methods: {
    setURL(content) {
      const path = this.buildCourseURL(content.courseGroup, content.courseID);
      this.$router.push({ path });
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/_fonts.scss';
@import '../assets/scss/_colors.scss';
.docs-card {
  display: inline-block;
  margin: 0 5px;
  position: relative;
  max-width: 400px;
  width: 100%;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  margin-top: 3vh;
  .doc-content {
    width: 100%;
    bottom: 0;
    z-index: 2;
    position: relative;
    .image-card {
      display: flex;
      justify-content: center;
      width: 100%;

      img {
        border-radius: 6px;
        height: 100%;
        max-height: 161px;
        transition: transform 0.5s ease;

        @media (max-width: 500px) {
          max-height: 139px;
        }
      }
    }
    .general-titles {
      background-image: linear-gradient(180deg, transparent, #00000055);
      bottom: 0;
      width: 100%;
      height: auto;
      margin: 0;

      h3 {
        font-weight: 600;
        font-size: 1.25rem;
        line-height: 110%;
        color: #fff;
        margin: 1vh 0 0 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 100%;
        @media (max-width: 450px) {
          font-size: 1.1rem;
        }
      }
      p {
        margin-top: 0.5vh;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 100%;

        @media (max-width: 450px) {
          margin-top: 0.2vh;
        }
      }
    }
    .general-titles-bottom {
      opacity: 0;
      padding: 0.3vw;
      &.bottom {
        opacity: 1;
      }
      h3 {
        font-weight: 600;
        font-size: 1.25rem;
        line-height: 110%;
        color: #fff;
        margin: 1vh 0 0 0;
      }
      p {
        margin-top: 0.5vh;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 100%;
      }
    }
  }
  .shadow-hover {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(180deg, transparent, #00000055);
    position: absolute;
    bottom: 0;
    left: 0;
    animation-name: hover;
    animation-fill-mode: forwards;
    animation-duration: 200ms;
    display: none;
    z-index: 1;
  }
  &:hover {
    img {
      transform: scale(1.01);
    }
  }
  &.no-hover {
    pointer-events: none !important;
  }
  @media (max-width: 450px) {
    @media (hover: none) {
      &:hover {
        .shadow-hover {
          display: block;
        }
        .doc-content {
          .center-company {
            animation-play-state: paused;
          }
          .center-description {
            animation-play-state: paused;
          }
        }
      }
    }
    width: 260px;
  }
}

@keyframes hover {
  from {
    height: 0;
  }
  to {
    height: 50%;
  }
}
</style>
