const state = {
  captureFormData: { name: '', message: '' },
};
const getters = {
  getCaptureFormData: (state) => state.captureFormData,
};
const mutations = {
  SET_CAPTURE_FORM_DATA(state, newVal) {
    state.captureFormData = newVal;
  },
};
const actions = {
  updateCaptureFormData({ commit }, newVal) {
    commit('SET_CAPTURE_FORM_DATA', newVal);
  },
};

export default { state, getters, mutations, actions };
