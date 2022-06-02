<template>
  <div :class="showUserDropDown ? 'user open-dropdown' : 'user'">
    <button id="js-btn-drop-user" @click="showUserDropDown = !showUserDropDown">
      <ProfilePicture
        :userPhoto="dataUser?.userPhoto"
        :userFirstname="dataUser?.userFirstname"
      ></ProfilePicture>
      <span>
        {{ formatName(dataUser?.userFirstname) }}
        <PointWarning />
      </span>
      <img src="@/assets/img/arrow-down.svg" class="arrow" alt="" />
    </button>

    <div class="dropdown gtm-user-menu" id="js-dropdown-user">
      <ul>
        <li>
          <router-link to="/progress" @click="showUserDropDown = !showUserDropDown">
            <div class="icon">
              <img src="@/assets/img/icon-progresso.svg" alt="" />
            </div>
            <span>Meu progresso</span>
          </router-link>
        </li>
        <li>
          <router-link to="/my-profile/profile" @click="myProfileAction" id="dropdown-my-profile">
            <div class="icon">
              <img src="@/assets/img/icon-perfil.svg" alt="" />
            </div>
            <span>
              Meu perfil
              <PointWarning />
            </span>
          </router-link>
        </li>
        <li>
          <router-link to="/help-center" @click="showUserDropDown = !showUserDropDown">
            <div class="icon">
              <img src="@/assets/img/icon-central.svg" alt="" />
            </div>
            <span>Central de ajuda</span>
          </router-link>
        </li>
      </ul>
      <button @click="logoutUser" id="dropdown-logout">
        <div class="icon">
          <img src="@/assets/img/icon-exit.svg" alt="" />
        </div>
        <span>Desconectar</span>
      </button>
    </div>
  </div>
</template>

<script>
import Utils from '@/Utils';
import { logoutUserMix } from '@/mixins';
import { mapGetters, mapActions } from 'vuex';
import PointWarning from '@/components/PointWarning';
import ProfilePicture from '@/components/ProfilePicture';
import { dataLayerMixin } from '@/mixins/dataLayerMixin';

const SIGNATURE_ID = 'SIGNATURE';
const CREDIT_CARD_ID = 'CREDIT_CARD';

export default {
  components: { PointWarning, ProfilePicture },
  mixins: [logoutUserMix, dataLayerMixin],
  data() {
    return {
      showUserDropDown: false,
    };
  },
  computed: {
    ...mapGetters(['dataUser', 'pointWarning']),
    pointWarningDataLayerKey() {
      if (this.pointWarning.includes(CREDIT_CARD_ID)) {
        return 'changePaymentMethodStart';
      }
      if (this.pointWarning.includes(SIGNATURE_ID)) {
        return 'recurrencyOnStart';
      }
    },
  },
  methods: {
    ...mapActions(['setRenewalFlowType']),
    formatName(name) {
      return Utils.checkFullName(name) ? name.split(' ')[0] : name;
    },
    myProfileAction() {
      this.showUserDropDown = !this.showUserDropDown;

      this.setRenewalFlowType('POINT_WARNING');

      return this.pushToDataLayer(this.pointWarningDataLayerKey, {
        flow: 'POINT_WARNING',
        step: 'POINT_WARNING_DROP_DOWN_USER_MY_SIGNATURE',
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../assets/scss/_colors.scss';
header nav > div .user {
  position: relative;
  z-index: 2;
}
header nav > div .user.open-dropdown .dropdown {
  top: 50px;
  opacity: 1;
  pointer-events: all;
}
header nav > div .user.open-dropdown button .arrow {
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
header nav > div .user button {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border: 1px solis #f00;
}
header nav > div .user button .photo {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-right: 0.75rem;
  background-color: #fff;
  justify-content: center;
  font-size: 2rem;
  color: #000;
  background-size: cover;
  background-position: center;
}
header nav > div .user button .photo span {
  font-size: 1.3rem;
  margin: 3px auto 0 auto;
  color: $dark-100;
  line-height: auto;
}
header nav > div .user button .photo img {
  height: auto;
}
header nav > div .user button span {
  margin-right: 12px;
  position: relative;
  font-weight: bold;
  font-size: 1.125rem;
  line-height: 115%;
  letter-spacing: -0.005em;
  color: #ffffff;
  -webkit-transition: color 0.3s;
  -o-transition: color 0.3s;
  transition: color 0.3s;
}
header nav > div .user button .arrow {
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  -o-transition: transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
}
header nav > div .user button:hover span {
  color: #00e7f9;
}
header nav > div .user .dropdown {
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 45px;
  opacity: 0;
  pointer-events: none;
  background: #202227;
  border-radius: 6px;
  width: 240px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}
header nav > div .user .dropdown ul {
  width: 100%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  padding: 24px;
  border-bottom: 2px solid #313338;
}
header nav > div .user .dropdown ul li {
  margin-left: 0px;
  margin-bottom: 24px;
}
header nav > div .user .dropdown ul li:last-child {
  margin-bottom: 0px;
}
header nav > div .user .dropdown ul li a {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  opacity: 1;
}
header nav > div .user .dropdown ul li a:before {
  display: none;
}
header nav > div .user .dropdown ul li a .icon {
  width: 22px;
  margin-right: 0.75rem;
}
header nav > div .user .dropdown ul li a span {
  position: relative;
  font-size: 1rem;
  -webkit-transition: color 0.3s;
  -o-transition: color 0.3s;
  transition: color 0.3s;

  > .pointWarning {
    right: -15px;
  }
}
header nav > div .user .dropdown ul li a span:hover {
  color: #00e7f9;
}
header nav > div .user .dropdown button {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 1rem 1.5rem;
  -webkit-transition: background-color 0.3s;
  -o-transition: background-color 0.3s;
  transition: background-color 0.3s;
}
header nav > div .user .dropdown button .icon {
  width: 22px;
  margin-right: 0.75rem;
}
header nav > div .user .dropdown button span {
  margin-right: 0px;
  font-weight: 600;
  font-size: 1rem;
  color: #ff6682;
}
header nav > div .user .dropdown button:hover {
  background: #2c2f36;
}
</style>
