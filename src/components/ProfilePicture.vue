<template>
  <div
    v-if="userPhoto"
    class="photo"
    :style="{
      'background-image': getUrlWithoutProtocol,
    }"
  ></div>
  <div v-else class="photo">
    <span class="photo__letter" v-if="userFirstname">{{ returnFirstLetter(userFirstname) }}</span>
  </div>
</template>

<script>
export default {
  name: 'ProfilePicture',
  props: {
    userPhoto: { type: String, required: false, default: '' },
    userFirstname: { type: String, required: true, default: '' },
  },
  computed: {
    getUrlWithoutProtocol() {
      const urlHasHttps = this.userPhoto.includes('https');
      const urlWithoutHttps = this.userPhoto.split('https://')[1];
      const urlHasHttp = this.userPhoto.includes('http');
      const urlWithoutHttp = this.userPhoto.split('http://')[1];

      const photo = urlHasHttps ? urlWithoutHttps : urlHasHttp ? urlWithoutHttp : this.userPhoto;
      return `url(//${photo}?timestamp=${new Date().toISOString()})`;
    },
  },
  methods: {
    returnFirstLetter(str) {
      return str.charAt(0);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.photo {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.photo__letter {
  color: $dark-600 !important;
}
</style>
