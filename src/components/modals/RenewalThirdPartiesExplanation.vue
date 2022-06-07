<template>
  <Modal v-if="modalData?.title" :class="{ 'show-modal': showModal }">
    <button @click="closeModal" class="close" type="button">
      <!-- <img src="@/assets/img/close.svg" alt="" /> -->
    </button>
    <div class="rtpeModal">
      <div v-if="modalData?.iconName" class="icon rtpeModal__icon">
        <img :src="require('@/assets/img/' + modalData?.iconName)" :alt="modalData?.title" />
      </div>
      <h4 v-if="modalData?.title" class="rtpeModal__title">
        {{ modalData?.title }}
      </h4>
      <h6 v-if="modalData?.subtitle" class="rtpeModal__subtitle">
        {{ modalData?.subtitle }}
      </h6>
      <ul class="rtpeModal__steps">
        <li v-for="(step, index) in modalData?.steps" :key="step">{{ index + 1 }}. {{ step }}</li>
      </ul>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal';
import { thirdPartiesExplanationData } from '@/Utils/selectsValues.js';

export default {
  name: 'RenewalThirdPartiesExplanation',
  emits: ['closeModal'],
  components: { Modal },
  props: {
    gateway: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    showModal: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    modalData() {
      if (!thirdPartiesExplanationData.hasOwnProperty(this.gateway)) return false;
      if (!thirdPartiesExplanationData[this.gateway].hasOwnProperty(this.type)) return false;

      return thirdPartiesExplanationData[this.gateway][this.type];
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_colors.scss';

.rtpeModal {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  &__icon {
    width: 32px;
    height: 32px;
  }

  &__title {
    font-weight: 700;
    font-size: 1.125rem;
    line-height: 115%;
    color: $white;
  }

  &__subtitle {
    margin-top: 24px;
    font-weight: 700;
    font-size: 1rem;
    line-height: 115%;
    letter-spacing: -0.005em;
    color: $white;
    opacity: 0.7;
  }

  &__steps {
    margin-top: 24px;
  }
}

@media (min-width: 768px) {
  .rtpeModal {
    padding: 36px 24px;

    &__title {
      margin-top: 22px;
    }

    &__subtitle {
      margin-top: 40px;
    }

    &__steps {
      margin-top: 32px;
    }
  }
}

@media (min-width: 1440px) {
  .rtpeModal {
    padding: 50px 36px 46px 28px;

    &__title {
      margin-top: 22px;
    }

    &__subtitle {
      margin-top: 40px;
    }

    &__steps {
      margin-top: 32px;
    }
  }
}
</style>
