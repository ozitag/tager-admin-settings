import { CustomRouteConfig } from '@tager/admin-layout';

import SettingsItemList from '../views/SettingsItemList.vue';
import SettingsItemForm from '../views/SettingsItemForm.vue';

import { COMMON_SETTINGS_ROUTE_PATHS } from './paths';

const HOME_BREADCRUMB = { path: '/', label: 'Home' };

export const SETTINGS_ITEM_LIST_ROUTE: CustomRouteConfig = {
  path: COMMON_SETTINGS_ROUTE_PATHS.ITEM_LIST,
  component: SettingsItemList,
  name: 'Common settings',
  meta: {
    getBreadcrumbs: (route) => [
      HOME_BREADCRUMB,
      { path: route.path, label: route.name },
    ],
  },
};

export const SETTINGS_ITEM_FORM_ROUTE: CustomRouteConfig = {
  path: COMMON_SETTINGS_ROUTE_PATHS.ITEM_FORM,
  component: SettingsItemForm,
  name: 'Common settings form',
  meta: {
    getBreadcrumbs: (route) => [
      HOME_BREADCRUMB,
      {
        path: COMMON_SETTINGS_ROUTE_PATHS.ITEM_LIST,
        label: SETTINGS_ITEM_LIST_ROUTE.name,
      },
      { path: route.path, label: route.name },
    ],
  },
};
