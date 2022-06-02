import axios from 'axios';
import store from '@/store';

const http = axios.create({
  baseURL: `https://api.finclass.com/${process.env.VUE_APP_STAGE}/`,
  headers: {
    'Content-Type': 'application/json',
    'X-gprim-specnav': window.navigator.userAgent,
    'X-gprim-specdev': 'WEB',
    'X-gprim-specver': '2.2.1',
  },
});

http.interceptors.request.use(
  function(config) {
    const token = store.state.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (err) => {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      await store.dispatch('doLogout');
    }
  }
);

export default http;
