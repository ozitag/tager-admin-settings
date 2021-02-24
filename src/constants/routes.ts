import { CustomRouteConfig } from '@tager/admin-layout';

import SettingsSectionList from '../views/SettingsSectionList';
import SettingsItemForm from '../views/SettingsItemForm';

import { COMMON_SETTINGS_ROUTE_PATHS } from './paths';

export const SETTINGS_ITEM_LIST_ROUTE: CustomRouteConfig = {
  path: COMMON_SETTINGS_ROUTE_PATHS.ITEM_LIST,
  component: SettingsSectionList,
  name: 'Common settings',
  meta: {
    getBreadcrumbs: (route, t) => [
      { url: '/', text: t('settings:home') },
      { url: route.path, text: t('settings:commonSettings') },
    ],
  },
};

export const SETTINGS_ITEM_FORM_ROUTE: CustomRouteConfig = {
  path: COMMON_SETTINGS_ROUTE_PATHS.ITEM_FORM,
  component: SettingsItemForm,
  name: 'Common settings form',
  meta: {
    getBreadcrumbs: (route, t) => [
      { url: '/', text: t('settings:home') },
      {
        url: COMMON_SETTINGS_ROUTE_PATHS.ITEM_LIST,
        text: t('settings:commonSettings'),
      },
      { url: route.path, text: t('settings:commonSettingsForm') },
    ],
  },
};
