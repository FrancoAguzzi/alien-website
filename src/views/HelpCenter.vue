<template>
  <div>
      <!-- :icon="require('@/assets/img/central-ajuda.svg')" -->
    <TitlePages
      title="Central de ajuda"
      subtitle="Precisando de ajuda? Entre em contato com nosso time de suporte ou veja nosso FAQ."
    />

    <section class="s-ajuda">
      <div class="container">
        <div class="left-container">
          <h3>Perguntas frequentes</h3>
          <ul V-if="faqs">
            <li v-for="({ faqQuestion, faqAnswer, faqAddress }, index) in faqs" :key="index">
              <h4>{{ faqQuestion }}</h4>
              <p>{{ faqAnswer }}</p>
              <a
                v-if="faqAddress"
                :href="splitFaqAddress(faqAddress, 'url')"
                rel="noopener"
                class="faq-link"
              >
                {{ splitFaqAddress(faqAddress, 'label') }}
                <!-- <img src="@/assets/img/arrow-right.svg" alt="Saiba mais" /> -->
              </a>
            </li>
          </ul>
        </div>
        <div class="right-container">
          <button class="js-btn-modal-contato" type="button" @click="talkToUsOpen = !talkToUsOpen">
            <!-- <img src="@/assets/img/icon-contato.svg" alt="" /> -->
            <span>Fale conosco</span>
          </button>
          <button
            type="button"
            @click="bugReportOpen = !bugReportOpen"
            class="js-btn-modal-reportar-erro"
          >
            <!-- <img src="@/assets/img/icon-report.svg" alt="" /> -->
            <span>Reportar um erro</span>
          </button>
        </div>
      </div>
    </section>

    <TalkToUsModal :isOpen="talkToUsOpen" @closeModal="closeTalkToUsModal($event)" />

    <BugReportModal :isOpen="bugReportOpen" @closeModal="closeBugReportModal($event)" />
  </div>
</template>

<script>
import http from '@/http';
import TitlePages from '@/components/TitlePages';
import TalkToUsModal from '@/components/TalkToUsModal';
import BugReportModal from '@/components/BugReportModal.vue';

export default {
  name: 'HelpCenter',
  components: {
    TitlePages,
    TalkToUsModal,
    BugReportModal,
  },
  data() {
    return {
      talkToUsOpen: false,
      bugReportOpen: false,
      faqs: [],
    };
  },
  created() {
    http.get('/settings/getFAQ').then((response) => {
      this.faqs = response.data.data;
    });
  },
  methods: {
    closeTalkToUsModal(value) {
      this.talkToUsOpen = value;
    },
    closeBugReportModal(value) {
      this.bugReportOpen = value;
    },
    splitFaqAddress(url, type) {
      // The property will have a semicolon to separate the values (eg. label;https://example.com).
      const [label, link] = url.split(';');

      if (type === 'label') {
        return label.includes('http') ? 'Saiba mais' : label.trim();
      }

      return link ? link.trim() : label;
    },
  },
};
</script>
<style lang="scss">
@import '../assets/scss/_colors.scss';
@import '../assets/scss/_inputs.scss';

.s-ajuda {
  padding-top: 5rem;
  padding-bottom: 7.5rem;
  .container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .left-container {
    flex: 1;
    max-width: 840px;
    h3 {
      color: $dark-100;
      font-weight: bold;
      margin-bottom: 2rem;
    }
    ul {
      li {
        padding-bottom: 40px;
        margin-bottom: 40px;
        border-bottom: 1px solid $dark-500;

        > h4 {
          margin-bottom: 16px;
          line-height: 120%;
        }

        > p {
          line-height: 150%;
        }

        .faq-link {
          margin-top: 16px;
          font-size: 1rem;
          font-weight: 600;
          color: $white;
          display: flex;
          align-items: center;

          > img {
            width: 16px;
            height: 24px;
            margin-left: 4px;
          }
        }

        &:last-child {
          margin-bottom: 0px;
        }
      }
    }
  }
  .right-container {
    position: sticky;
    top: 120px;
    flex: 1;
    max-width: 290px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    button {
      width: 100%;
      height: 9.5rem;
      border: 1px solid #424449;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 2.5rem;
      transition: border-color 0.3s;
      &:hover {
        border-color: $dark-900;
        span {
          color: $dark-900;
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
      span {
        display: block;
        margin-top: 1rem;
        font-weight: 600;
        font-size: 18px;
        transition: color 0.3s;
      }
    }
  }
  @media (max-width: 1200px) {
    .left-container {
      max-width: 650px;
    }
  }
  @media (max-width: 991px) {
    padding: 2.5rem 0px;
    .container {
      flex-direction: column;
      align-items: flex-start;
    }
    .left-container {
      max-width: 100%;
    }
    .right-container {
      position: relative;
      top: 0;
      margin-top: 2.5rem;
      flex-direction: revert;
      justify-content: space-between;
      width: 100%;
      max-width: 100%;
      button {
        margin-bottom: 0;
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  @media (max-width: 450px) {
    .left-container {
      ul {
        li {
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
      }
    }
    .right-container {
      button {
        span {
          text-align: center;
          font-size: 1.2em;
        }
      }
    }
  }
}
</style>
