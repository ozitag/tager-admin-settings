import Vue, { CreateElement } from 'vue';
import VueCompositionApi, { createApp } from '@vue/composition-api';
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

const router = createRouter(
  {
    routes: [SETTINGS_ITEM_LIST_ROUTE, SETTINGS_ITEM_FORM_ROUTE],
  },
  { useTitleSync: false }
);

Vue.use(VueCompositionApi);

i18n.init().then(() => {
  const app = createApp({
    router,
    render: (h: CreateElement) => h(App),
  });

  app.use(i18n.getPlugin());
  app.use(AdminUiPlugin);
  app.use(AdminLayoutPlugin);

  app.mount('#app');
});
