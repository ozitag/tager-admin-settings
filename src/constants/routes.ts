import type { RouteRecordRaw } from "vue-router";

import SettingsSectionList from "../views/SettingsSectionList";
import SettingsItemForm from "../views/SettingsItemForm";

import { COMMON_SETTINGS_ROUTE_PATHS } from "./paths";

export const SETTINGS_ITEM_LIST_ROUTE: RouteRecordRaw = {
  path: COMMON_SETTINGS_ROUTE_PATHS.ITEM_LIST,
  component: SettingsSectionList,
  name: "Common settings",
  meta: {
    getBreadcrumbs: (route, i18n) => [
      { url: "/", text: i18n.t("settings:home") },
      { url: route.path, text: i18n.t("settings:commonSettings") },
    ],
  },
};

export const SETTINGS_ITEM_FORM_ROUTE: RouteRecordRaw = {
  path: COMMON_SETTINGS_ROUTE_PATHS.ITEM_FORM,
  component: SettingsItemForm,
  name: "Common settings form",
  meta: {
    getBreadcrumbs: (route, i18n) => [
      { url: "/", text: i18n.t("settings:home") },
      {
        url: COMMON_SETTINGS_ROUTE_PATHS.ITEM_LIST,
        text: i18n.t("settings:commonSettings"),
      },
      { url: route.path, text: i18n.t("settings:commonSettingsForm") },
    ],
  },
};
