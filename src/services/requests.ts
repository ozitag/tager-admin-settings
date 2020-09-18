import { request, ResponseBody } from '@tager/admin-services';
import { OutgoingValueUnion } from '@tager/admin-dynamic-field';

import { SettingItemType, SettingsSectionType } from '../typings/model';

/** Blog Posts */

export function getSettingsSectionList(): Promise<
  ResponseBody<Array<SettingsSectionType>>
> {
  return request.get({ path: '/admin/settings' });
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
