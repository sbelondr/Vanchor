import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueCompositionAPI from '@vue/composition-api';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// Install BootstrapVue
Vue.use(VueCompositionAPI);
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')