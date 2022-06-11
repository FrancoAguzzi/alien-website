import http from '@/http';
import finclub from './finclub';
import captura from './captura';
import { createStore } from 'vuex';
import { utils as utilsMixins } from '@/mixins/utils';
import createdPersistedState from 'vuex-persistedstate';

const baseURL = `https://api.finclass.com/${process.env.VUE_APP_STAGE}/`;

export default createStore({
  modules: {
    finclub,
    captura,
  },
  state: {
    token: null,
    user: {},
    keepWatching: undefined,
    country: null,
    loaderHome: false,
    loader: false,
    publicKey: null,
    uid: null,
    openLifetimeOffer: false,
    userIsFounder: false,
    userIsLifetime: false,
    hasTemporaryPreventionForLifetimeUsers: false,
    ticketGenerated: {
      barcode: null,
      transactionID: null,
      planPrice: null,
      expiresAt: null,
      ticketUrl: null,
      signatureType: null,
    },
    lastPublishedFinsession: { id: '', liveNow: false },
    topBarWarning: [],
    showTopBarWarning: false,
    pointWarning: [],
    lastUsedCreditCard: {
      isExpired: false,
      brand: '',
      expirationDate: '',
      holderName: '',
      last4Digits: '',
    },
    currentSignature: {
      filled: false,
      paymentGateway: null,
      paymentMethod: null,
      isRecurrent: null,
      cycleStartDate: null,
      cycleEndDate: null,
      isRenewed: null,
      isExpired: null,
      remainingDays: null,
    },
    gtm: {
      renewalFlowType: null,
    },
  },
  mutations: {
    SET_USER_DATA(state, { user }) {
      state.user = user;
    },
    SET_KEEP_WATCHING(state, courses) {
      state.keepWatching = courses;
    },
    SET_USER_TOKEN(state, { token }) {
      state.token = token;
    },
    SET_USER_ID(state, uid) {
      state.uid = uid;
    },
    SET_USER_COUNTRY(state, { country }) {
      state.country = country;
    },
    LOGOOUT(state) {
      state.token = null;
      state.currentSignature = {
        filled: false,
        paymentGateway: null,
        paymentMethod: null,
        isRecurrent: null,
        cycleStartDate: null,
        cycleEndDate: null,
        isRenewed: null,
        isExpired: null,
        remainingDays: null,
      };
    },
    TOOGLELOADER(state, value) {
      state.loaderHome = value;
    },
    TOOGLELOADERGENERAL(state, show) {
      state.loader = show;
    },
    UPDATEUSERPROGRESS(state, value) {
      state.user.userFollow = [
        ...state.user.userFollow.filter((follow) => follow.followLesson !== value.followLesson),
        value,
      ];
    },
    SETPUBLICKEY(state) {
      state.publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuieieX4AJZR81FUXi61B
yTt2x90D1/Wwj7MCzQLw2530l+stxCyLlY7GXsTpwxMcSzC2MnsSvH/eTA5dcUXc
5mYXzt0OOwbKziA64MJlp13sbFqX09mPFXBb5TksKR5IA40bZYb/OyP/a7HXYnr4
K7Ei597EwP6/eHCxtNmRkMmf1Nngy0a58rZjcAUkrUg+d25KcB4MBWg8In44b3dj
rjDI7q9vxo8aYOGDxpYdyqi6FEp8QGZ7V9Yua2B5KdGiB+aTYmlSTrHUpP3kGndK
NwvFFeE5Avb90hIEVPK4aU+8+u5954DpkE3S+P8R0sP6AzmX8WdYzFa7rblAARfy
IQIDAQAB`;
    },
    SHOW_LIFETIME_OFFER(state, value) {
      state.openLifetimeOffer = value;
    },
    SET_USER_IS_FOUNDER(state, value) {
      state.userIsFounder = value;
    },
    SET_USER_IS_LIFETIME(state, value) {
      state.userIsLifetime = value;
    },
    SET_HAS_TEMPORARY_PREVENTION_FOR_LIFETIME_USERS(state, value) {
      state.hasTemporaryPreventionForLifetimeUsers = value;
    },
    SET_TICKET_GENERATED(state, ticket) {
      state.ticketGenerated = ticket;
    },
    SET_LAST_PUBLISHED_FINSESSION(state, finsession) {
      state.lastPublishedFinsession = finsession;
    },
    LOGOUT(state) {
      state.user = {};
      state.token = null;
    },
    ADD_TOP_BAR_WARNING_ID(state, newId) {
      if (state.topBarWarning.includes(newId)) return;

      state.topBarWarning = [...state.topBarWarning, newId];
    },
    REMOVE_TOP_BAR_WARNING_ID(state, idToRemove) {
      const index = state.topBarWarning.findIndex((id) => id === idToRemove);
      if (index >= 0) {
        state.topBarWarning.splice(index, 1);
      }
    },
    SET_SHOW_TOP_BAR_WARNING(state, show) {
      state.showTopBarWarning = show;
    },
    ADD_POINT_WARNING_ID(state, newId) {
      if (state.pointWarning.includes(newId)) return;

      state.pointWarning = [...state.pointWarning, newId];
    },
    REMOVE_POINT_WARNING_ID(state, idToRemove) {
      const index = state.pointWarning.findIndex((id) => id === idToRemove);
      if (index >= 0) {
        state.pointWarning.splice(index, 1);
      }
    },
    SET_LAST_USED_CREDIT_CARD(state, lastUsedCreditCard) {
      state.lastUsedCreditCard = lastUsedCreditCard;
    },
    SET_CURRENT_SIGNATURE(state, signatureData) {
      state.currentSignature = { ...signatureData, filled: true };
    },
    RESET_RENEWAL_DATA(state) {
      state.currentSignature = {
        filled: false,
        paymentGateway: null,
        paymentMethod: null,
        isRecurrent: null,
        cycleStartDate: null,
        cycleEndDate: null,
        isRenewed: null,
        isExpired: null,
        remainingDays: null,
      };

      state.lastUsedCreditCard = {
        isExpired: false,
        brand: '',
        expirationDate: '',
        holderName: '',
        last4Digits: '',
      };

      state.topBarWarning = [];
      state.showTopBarWarning = false;
      state.pointWarning = [];
    },
    SET_RENEWAL_FLOW_TYPE(state, flowType) {
      state.gtm.renewalFlowType =
        flowType === 'TOP_BAR_WARNING' ? 'TOP_BAR_WARNING' : 'POINT_WARNING';
    },
  },
  actions: {
    loginUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        fetch(baseURL + 'user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }).then(async (response) => {
          const respo = await response.json().then((res) => res);
          if (respo.status) {
            commit('TOOGLELOADER', true);

            // https://www.geeksforgeeks.org/how-to-set-up-a-cookie-that-never-expires-in-javascript/
            const maximunTimeAllowedInInt32Bit = new Date(2147483647 * 1000);
            utilsMixins.methods.setCookie('subscriber_user', true, maximunTimeAllowedInInt32Bit);

            commit('SET_USER_TOKEN', {
              token: respo.data.token,
            });
          }
          resolve(respo);
        });
      });
    },
    getUserData({ commit }) {
      return new Promise((resolve, reject) => {
        http
          .get('/user/readMe')
          .then((response) => {
            if (response.data.status) {
              commit('SET_USER_DATA', {
                user: response.data.data,
              });
            }
            resolve(response.data);
          })
          .catch((err) => {
            commit('LOGOOUT');
            commit('TOOGLELOADER');
          });
      });
    },
    setKeepWatching({ commit }, courses) {
      commit('SET_KEEP_WATCHING', courses);
    },
    setRegisterUserCountry({ commit }, country) {
      commit('SET_USER_COUNTRY', {
        country,
      });
    },
    showPeriniBanner({ commit }, value) {
      commit('SHOW_PERINI_BANNER', value);
    },
    setTokenPayment({ commit }, token) {
      commit('TOOGLELOADER', true);
      commit('SET_USER_TOKEN', {
        token: token,
      });
    },
    setPublicKey({ commit }) {
      commit('SETPUBLICKEY');
    },
    setUserID({ commit }, uid) {
      commit('SET_USER_ID', uid);
    },
    showLifetimeOffer({ commit }, value) {
      commit('SHOW_LIFETIME_OFFER', value);
    },
    setUserIsFounder({ commit }, value) {
      commit('SET_USER_IS_FOUNDER', value);
    },
    setHasTemporaryPreventionForLifetimeUsers({ commit }, value) {
      commit('SET_HAS_TEMPORARY_PREVENTION_FOR_LIFETIME_USERS', value);
    },
    setUserIsLifetime({ commit }, value) {
      commit('SET_USER_IS_LIFETIME', value);
    },
    setTicketGenerated({ commit }, ticket) {
      commit('SET_TICKET_GENERATED', ticket);
    },
    setLastPublishedFinsession({ commit }, finsession) {
      commit('SET_LAST_PUBLISHED_FINSESSION', finsession);
    },
    doLogout({ commit }) {
      commit('LOGOUT');
      window.location.reload();
    },
    addTopBarWarningId({ commit }, newId) {
      commit('ADD_TOP_BAR_WARNING_ID', newId);
    },
    removeTopBarWarningId({ commit }, idToRemove) {
      commit('REMOVE_TOP_BAR_WARNING_ID', idToRemove);
    },
    updateShowTopBarWarning({ commit }, show) {
      commit('SET_SHOW_TOP_BAR_WARNING', show);
    },
    addPointWarningId({ commit }, newId) {
      commit('ADD_POINT_WARNING_ID', newId);
    },
    removePointWarningId({ commit }, idToRemove) {
      commit('REMOVE_POINT_WARNING_ID', idToRemove);
    },
    setLastUsedCreditCard({ commit }, lastUsedCreditCard) {
      commit('SET_LAST_USED_CREDIT_CARD', lastUsedCreditCard);
    },
    setCurrentSignature({ commit }, signatureData) {
      commit('SET_CURRENT_SIGNATURE', signatureData);
    },
    resetRenewalData({ commit }) {
      commit('RESET_RENEWAL_DATA');
    },
    setRenewalFlowType({ commit }, flowType) {
      commit('SET_RENEWAL_FLOW_TYPE', flowType);
    },
    completeProfile({ commit }, userData) {
      return new Promise((resolve, reject) => {
        fetch(baseURL + 'user/completeProfile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
          .then((raw) => raw.json())
          .then((response) => {
            if (response.status) {
              commit('SET_USER_TOKEN', {
                token: response.data.token,
              });
            }
            resolve(response);
          })
          .catch((err) => reject(err));
      });
    },
  },
  plugins: [
    createdPersistedState({
      key: '__alien',
    }),
  ],
  getters: {
    isLogged: (state) => Boolean(state.token),
    dataUser: (state) => state.user,
    keepWatching: (state) => state.keepWatching,
    userCountry: (state) => state.country,
    loaderHome: (state) => Boolean(state.loaderHome),
    loader: (state) => Boolean(state.loader),
    publickey: (state) => state.publicKey,
    uid: (state) => state.uid,
    openLifetimeOffer: (state) => state.openLifetimeOffer,
    userIsFounder: (state) => state.userIsFounder,
    userIsLifetime: (state) => state.userIsLifetime || state.hasTemporaryPreventionForLifetimeUsers,
    ticketGenerated: (state) => state.ticketGenerated,
    lastPublishedFinsession: (state) => state.lastPublishedFinsession,
    token: (state) => state.token,
    topBarWarning: (state) => state.topBarWarning,
    showTopBarWarning: (state) => state.showTopBarWarning,
    pointWarning: (state) => state.pointWarning,
    getLastUsedCreditCard: (state) => state.lastUsedCreditCard,
    currentSignature: (state) => state.currentSignature,
    renewalFlowType: (state) => state.gtm.renewalFlowType,
  },
});
