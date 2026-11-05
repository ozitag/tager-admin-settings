import { request, type ResponseBody } from "@tager/admin-services";
import { type OutgoingValueUnion } from "@tager/admin-dynamic-field";

import { type SettingItemType, type SettingsSectionType } from "../typings/model";

/** Blog Posts */

export function getSettingsSectionList(): Promise<
  ResponseBody<Array<SettingsSectionType>>
> {
  return request.get({ path: "/admin/settings" });
}

export function getSettingsItem(
  itemId: number | string
): Promise<ResponseBody<SettingItemType>> {
  return request.get({ path: `/admin/settings/${itemId}` });
}

export type SettingsItemUpdatePayload = {
  value: OutgoingValueUnion;
};

export function updateSettingsItem(
  itemId: number | string,
  payload: SettingsItemUpdatePayload
): Promise<ResponseBody<SettingItemType>> {
  return request.put({ path: `/admin/settings/${itemId}`, body: payload });
}
