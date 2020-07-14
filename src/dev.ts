import Vue from 'vue';
import { configStore, i18n } from '@tager/admin-services';
import { AdminUiPlugin } from '@tager/admin-ui';
import { AdminLayoutPlugin, createRouter } from '@tager/admin-layout';

import '@tager/admin-ui/dist/admin-ui.css';

import {
  SETTINGS_ITEM_FORM_ROUTE,
  SETTINGS_ITEM_LIST_ROUTE,
} from './constants/routes';
import config from './config/config.json';
import App from './views/App.vue';

configStore.setConfig(config);

Vue.use(AdminUiPlugin);
Vue.use(AdminLayoutPlugin);

const router = createRouter(
  {
    routes: [SETTINGS_ITEM_LIST_ROUTE, SETTINGS_ITEM_FORM_ROUTE],
  },
  { useTitleSync: false }
);

i18n.init().then(() => {
  Vue.use(i18n.getPlugin());

  new Vue({
    router,
    render: (h) => h(App),
  }).$mount('#app');
});
