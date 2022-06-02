import { mapActions } from 'vuex';
import { utils } from '@/mixins/utils.js';
import { KEEP_STORAGE_KEY } from '@/Utils/selectsValues.js';

export const logoutUserMix = {
  mixins: [utils],
  methods: {
    ...mapActions(['resetRenewalData']),
    cleanLocalStorageExceptSomeValues() {
      const pairsToKeep = Object.keys(window.localStorage)
        .filter((key) => key.includes(KEEP_STORAGE_KEY))
        .map((key) => {
          const value = window.localStorage.getItem(key);
          return { key, value };
        });

      window.localStorage.clear();

      for (let i = 0; i < pairsToKeep.length; i++) {
        const { key, value } = pairsToKeep[i];
        window.localStorage.setItem(key, value);
      }
    },
    logoutUser(hasReason = false) {
      this.$store.commit('LOGOOUT');
      this.resetRenewalData();

      window.sessionStorage.clear();
      this.cleanLocalStorageExceptSomeValues();

      this.$router.push({
        name: 'Login',
        params: {
          redirectReason:
            hasReason === true // necessary because calls by reference send the PointerEvent implicitly
              ? 'Seu token expirou e você foi redirecionado para o login. Por favor, conecte-se novamente!'
              : '',
        },
      });
    },
    handleGeneralException() {
      if (this.tokenIsInvalid()) {
        this.logoutUser(true);
      } else {
        this.$router.push({
          name: 'Home',
          params: {
            redirectReason:
              'Tivemos um problema no tratamento das informações. Por favor, tente novamente!',
          },
        });
      }
    },
  },
};
