import {
  FieldConfigUnion,
  IncomingValueUnion,
} from '@tager/admin-dynamic-field';

export type SettingItemType = {
  id: number;
  config: FieldConfigUnion;
  value: IncomingValueUnion;
};

export type SettingsSectionType = {
  name: string;
  fields: Array<SettingItemType>;
};
