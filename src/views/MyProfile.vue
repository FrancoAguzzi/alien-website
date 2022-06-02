<template>
  <div>
    <section class="s-perfil">
      <div class="container">
        <MenuLeftpProfile />
        <ContentProfile>
          <div class="title-area">
            <h3>MeuID</h3>
            <p>Todos os seus dados pessoais em um só lugar</p>
          </div>
          <div class="area-id">
            <div class="box-user-profile">
              <div class="head"></div>
              <div class="info-geral">
                <div class="user">
                  <div class="left-container-user">
                    <ProfilePicture
                      :userPhoto="dataUser?.userPhoto"
                      :userFirstname="dataUser?.userFirstname"
                    ></ProfilePicture>
                    <div class="info-id-user">
                      <h3>
                        {{ dataUser?.userFirstname }}
                        {{ dataUser?.userLastname }}
                      </h3>
                      <div class="upload">
                        <!-- accept="image/jpg" -->
                        <input
                          type="file"
                          id="fileInput"
                          @change="updateProfileImage($event.target.files[0])"
                        />
                        <img src="@/assets/img/icon-upload.svg" alt="" />
                        <span>Alterar foto de perfil</span>
                      </div>
                      <p>
                        Usuário desde
                        <strong>{{ formatDate(dataUser?.userRegister) }}</strong>
                      </p>
                    </div>
                  </div>
                  <div class="right-container-user">
                    <ul>
                      <li>
                        <img src="@/assets/img/icon-camera.svg" alt="" />
                        <span>{{ total.videos }} cursos</span>
                      </li>
                      <li>
                        <img src="@/assets/img/icon-hours.svg" alt="" />
                        <span>{{ Math.ceil(total.hours / 3600000) }}h assistidas</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="conquistas">
                  <div class="title-conquistas">
                    <div class="icon">
                      <img src="@/assets/img/icon-conquistas.svg" alt="" />
                    </div>
                    <h5>Conquistas</h5>
                  </div>
                  <div class="area-slide-conquista">
                    <div class="slide-conquistas">
                      <SwiperArrowSlide prefix="achievements" :slidesPerView="{ '1210': 6.2 }">
                        <div
                          class="card-conquista swiper-slide"
                          v-for="(badge, index) in badgeList"
                          :key="index"
                        >
                          <img
                            :src="badge.archievementsThumb"
                            alt=""
                            @click="setModalData(badge)"
                          />
                        </div>
                      </SwiperArrowSlide>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentProfile>
      </div>

      <Modal
        :class="badgeModal ? 'show-modal' : ''"
        :id="'js-modal-fale-conosco'"
        :classes="'small'"
      >
        <button class="close js-close-modal" type="button" @click="badgeModal = !badgeModal">
          <img src="@/assets/img/close.svg" alt="" />
        </button>
        <div class="icon">
          <img src="img/icon-contato.svg" alt="" />
        </div>
        <div class="content">
          <h3>Conquista</h3>
          <img :src="modal.image" />
          <h4>{{ modal.title }}</h4>
          <p>{{ modal.description }}</p>
          <br />
          <p><strong>Data da conquista</strong>: {{ modal.date }}</p>
        </div>
      </Modal>
    </section>

    <AlertToasty
      v-show="status.show"
      @closeModal="closeModal($event)"
      :status="status.code"
      :message="status.message"
      :title="status.title"
    />
  </div>
</template>

<script>
import SwiperArrowSlide from '@/components/SwiperArrowSlide';
import MenuLeftpProfile from '@/components/MenuLeftpProfile';
import ContentProfile from '@/components/ContentProfile';
import AlertToasty from '@/components/AlertToasty';
import Modal from '@/components/Modal';
import Slider from '@/components/Slider';
import ProfilePicture from '@/components/ProfilePicture';
import { mapGetters } from 'vuex';
import Utils from '@/Utils';
import debounce from 'lodash/debounce';
import http from '@/http';
import { utils } from '@/mixins/utils.js';
import 'swiper/swiper.scss';

export default {
  name: 'MyProfile',
  mixins: [utils],
  components: {
    SwiperArrowSlide,
    MenuLeftpProfile,
    ContentProfile,
    Modal,
    Slider,
    AlertToasty,
    ProfilePicture,
  },
  data() {
    return {
      badgeList: [],
      totalSlides: 7,
      badgeModal: false,
      modal: {
        title: null,
        description: null,
        date: null,
        image: null,
      },
      total: {
        hours: 0,
        videos: 0,
      },
      status: {
        message: null,
        code: null,
        show: false,
        title: null,
      },
    };
  },
  computed: {
    ...mapGetters(['dataUser']),
  },
  methods: {
    clearErrorToasty() {
      setTimeout(() => {
        this.status.show = false;
        this.status.message = null;
        this.status.code = null;
        this.status.title = null;
      }, 3000);
    },
    openToasty(show, message, status, title) {
      this.status.show = show;
      this.status.message = message;
      this.status.code = status;
      this.status.title = title;
      this.clearErrorToasty();
    },
    updateProfileImage(file) {
      if (this.checkIfImageIsValid(file)) {
        this.$store.commit('TOOGLELOADERGENERAL', true);
        const base64 = new FileReader();
        base64.readAsDataURL(file);
        base64.onload = (e) => {
          http
            .post('/user/uploadPhoto', {
              userID: this.dataUser?.userID,
              picBase64: e.target.result,
            })
            .then(() => {
              this.$store.dispatch('getUserData').then((response) => {
                this.$store.commit('TOOGLELOADERGENERAL', false);
                this.openToasty(true, 'Sua foto de perfil foi atualizada.', 200, 'Sucesso!');
              });
            });
        };
      } else {
        document.getElementById('fileInput').value = '';
        this.openToasty(
          true,
          'Por favor, insira uma imagem em JPEG com tamanho inferior a 4MB.',
          500,
          'Arquivo inválido'
        );
      }
    },
    setModalData(badge) {
      this.badgeModal = !this.badgeModal;
      this.modal.title = badge.archievementsTitle;
      this.modal.description = badge.archievementsBody;
      this.modal.date = Utils.formatInstant(badge.archievementsRegister);
      this.modal.image = badge.archievementsThumb;
    },
    resizeWatcher() {
      this.totalSlides = document.documentElement.clientWidth > 600 ? 7 : 4;
      window.addEventListener('resize', () => {
        this.totalSlides = document.documentElement.clientWidth > 600 ? 7 : 4;
      });
    },
    formatDate(date) {
      return Utils.formatInstant(date);
    },
  },
  created() {
    this.$store.commit('TOOGLELOADERGENERAL', true);
    this.resizeWatcher();
    this.dataUser?.userAchievements.map((badge) => {
      if (
        this.badgeList.map((bdg) => bdg.archievementsTitle).indexOf(badge.archievementsTitle) < 0
      ) {
        this.badgeList.push(badge);
      }
    });
    http.post('/courses/progress/', {}).then((response) => {
      response.data.data.map((lesson) => {
        this.total.hours += lesson.followSeconds;
        this.total.videos += 1;
      });
      this.displayContent = true;
      this.$store.commit('TOOGLELOADERGENERAL', false);
    });
  },
  updated: debounce(function() {
    this.$nextTick(function() {
      this.$store.commit('TOOGLELOADER', false);
      this.$store.commit('TOOGLELOADERGENERAL', false);
      window.scrollTo(0, 0);
    });
  }, 1000),
};
</script>

<style lang="scss" scoped>
.upload {
  width: 150px;
  position: relative;
  display: flex;
  align-items: center;
  margin: 8px 0;
  cursor: pointer;
  input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    opacity: 0;
    width: 150px;
    height: 100%;
    cursor: pointer;
  }
  span {
    font-size: 0.875rem;
    line-height: 145%;
    letter-spacing: -0.005em;
    color: #00e7f9;
    margin-left: 0.5rem;
    cursor: pointer;
  }
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin: 3rem 0;
    width: 35%;
  }
  h4 {
    margin-bottom: 3vh;
  }
  p:last-child {
    display: flex;
    font-size: 0.9rem;
  }
  @media (max-width: 450px) {
    h4,
    p {
      text-align: center;
    }
  }
}
</style>
