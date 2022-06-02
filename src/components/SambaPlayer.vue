<template>
  <div class="player">
    <div class="embed-container" id="player"></div>
    <div class="ctrl-player"></div>
  </div>
</template>
<script>
import '../assets/scripts/player/samba.min.js';
export default {
  data() {
    return {
      videoSettings: {
        playerHash: null,
        midiaID: null,
      },
    };
  },
  props: ['videoUrl', 'startSecond'],
  methods: {
    createAndConfigurePlayerSamba() {
      this.getPlayerHashNMidia();
      let playerdom = document.querySelector('#player');
      playerdom.innerHTML = '';
      if (playerdom.children.length === 0) {
        SambaPlayer.clearAllMediaEvents();
        var player;
        window.scrollTo(0, 0);
        player = new SambaPlayer(document.querySelector('#player'), {
          height: document.querySelector('.player').offsetWidth / 2,
          width: document.querySelector('.player').offsetWidth,
          ph: this.videoSettings.playerHash,
          m: this.videoSettings.midiaID,
          events: {
            onProgress: this.videoParamsEmitter,
            onFinish: this.videoParamsEmitter,
            onLoad: this.closeLoad,
          },
          playerParams: {
            captionTheme: ['eddd31', 'M'],
            wideScreen: true,
            resume: +this.startSecond,
          },
        });
      }
    },
    getPlayerHashNMidia() {
      this.videoSettings.playerHash = this.videoUrl
        .replace('https://fast.player.liquidplatform.com/pApiv2/embed/', '')
        .split('/')[0];
      this.videoSettings.midiaID = this.videoUrl
        .replace('https://fast.player.liquidplatform.com/pApiv2/embed/', '')
        .split('/')[1];
    },
    videoParamsEmitter(value) {
      this.$emit(value.event, value);
    },
  },
  mounted() {
    this.createAndConfigurePlayerSamba();
  },
  watch: {
    '$route.params.idLesson': function (idLesson) {
      this.createAndConfigurePlayerSamba();
    },
  },
};
</script>
<style lang="scss"></style>
