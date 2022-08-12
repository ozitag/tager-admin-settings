import { Nullable } from "@tager/admin-services";
import { FieldUnion, universalFieldUtils } from "@tager/admin-dynamic-field";

import { SettingItemType } from "../../typings/model";
import { SettingsItemUpdatePayload } from "../../services/requests";

export type FormValues = Nullable<FieldUnion>;

const INITIAL_VALUES: FormValues = null;

export function getSettingsFormValues(
  settingItem: Nullable<SettingItemType>
): FormValues {
  if (!settingItem) {
    return INITIAL_VALUES;
  }

  return universalFieldUtils.createFormField(
    settingItem.config,
    settingItem.value
  );
}

export function convertSettingItemFormValuesToUpdatePayload(
  values: FormValues
): SettingsItemUpdatePayload {
  if (!values) {
    throw new Error("values cannot be null");
  }

  return { value: universalFieldUtils.getOutgoingValue(values) };
}
