<template>
  <div>
    <Header />
    <Banner :isLoading="false" />
    <BannerMobile />
  </div>
</template>

<script>
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import BannerMobile from '@/components/BannerMobile';

export default {
  name: 'Home',
  components: {
    Header,
    Banner,
    BannerMobile,
  },
};
</script>

<style></style>
