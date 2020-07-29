import { request, ResponseBody } from '@tager/admin-services';

import { SettingsItemType } from '../typings/model';

/** Blog Posts */

export function getSettingsItemList(): Promise<
  ResponseBody<Array<SettingsItemType>>
> {
  return request.get({ path: '/admin/settings' });
}

export function getSettingsItem(
  itemId: number | string
): Promise<ResponseBody<SettingsItemType>> {
  return request.get({ path: `/admin/settings/${itemId}` });
}

export type SettingsItemUpdatePayload = { value: string | number | null };

export function updateSettingsItem(
  itemId: number | string,
  payload: SettingsItemUpdatePayload
): Promise<ResponseBody<SettingsItemType>> {
  return request.put({ path: `/admin/settings/${itemId}`, body: payload });
}
