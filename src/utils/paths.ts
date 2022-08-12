import { compile } from "path-to-regexp";

import { COMMON_SETTINGS_ROUTE_PATHS } from "../constants/paths";

export function getSettingItemListUrl(): string {
  return COMMON_SETTINGS_ROUTE_PATHS.ITEM_LIST;
}

export function getSettingItemFormUrl(params: { itemId: number }): string {
  return compile(COMMON_SETTINGS_ROUTE_PATHS.ITEM_FORM)(params);
}
