<template>
  <div class="needHelp">
    <div class="icon">
      <img src="@/assets/img/icon-help.svg" alt="" />
    </div>

    <h6 v-if="isLogged" class="needHelp__text">
      Precisa de ajuda? <span @click="toggleTalkToUsModalOpen(true)">Falar com atendimento</span>
    </h6>
    <h6 v-else class="needHelp__text">
      Precisa de ajuda? <a href="mailto:suporte@finclass.com">Falar com atendimento</a>
    </h6>

    <TalkToUsModal :isOpen="talkToUsOpen" @closeModal="toggleTalkToUsModalOpen($event)" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TalkToUsModal from '@/components/TalkToUsModal';

export default {
  name: 'NeedHelp',
  components: { TalkToUsModal },
  data() {
    return {
      talkToUsOpen: false,
    };
  },
  computed: {
    ...mapGetters(['isLogged']),
  },
  methods: {
    toggleTalkToUsModalOpen(value) {
      this.talkToUsOpen = value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

.needHelp {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  > div.icon {
    width: 32px;
    height: 32px;
  }

  &__text {
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 145%;
    letter-spacing: -0.005em;
    color: $white;

    > span {
      color: $dark-900;
      cursor: pointer;
    }

    > a {
      display: inline-block;
      color: $dark-900;
      cursor: pointer;
    }
  }
}
</style>
