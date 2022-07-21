import { createStore } from 'vuex';

export default createStore({
  modules: {},
  state: {
    captureFormData: {
      name: '',
      message: ''
    }
  },
  getters: {
    getCaptureFormData: (state) => state.captureFormData
  },
  mutations: {
    SET_CAPTURE_FORM_DATA: (state, payload) => {
      state.captureFormData = payload
    }
  },
  actions: {
    updateCaptureFormData: ({ commit }, payload) => {
      commit('SET_CAPTURE_FORM_DATA', payload)
    }
  },
});
