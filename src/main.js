import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.use(store);
app.use(router);

app.directive('click-outside', {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = (event) => {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted: (el) => {
    document.removeEventListener('click', el.clickOutsideEvent);
  },
});

app.mount('#app');
