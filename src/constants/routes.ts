import { CustomRouteConfig } from '@tager/admin-layout';

import SettingsSectionList from '../views/SettingsSectionList';
import SettingsItemForm from '../views/SettingsItemForm';

import { COMMON_SETTINGS_ROUTE_PATHS } from './paths';

const HOME_BREADCRUMB = { url: '/', text: 'Home' };

export const SETTINGS_ITEM_LIST_ROUTE: CustomRouteConfig = {
  path: COMMON_SETTINGS_ROUTE_PATHS.ITEM_LIST,
  component: SettingsSectionList,
  name: 'Common settings',
  meta: {
    getBreadcrumbs: (route) => [
      HOME_BREADCRUMB,
      { url: route.path, text: route.name ?? '' },
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
        url: COMMON_SETTINGS_ROUTE_PATHS.ITEM_LIST,
        text: SETTINGS_ITEM_LIST_ROUTE.name ?? '',
      },
      { url: route.path, text: route.name ?? '' },
    ],
  },
};
