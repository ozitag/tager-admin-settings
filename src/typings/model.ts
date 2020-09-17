import { Nullable, FileType } from '@tager/admin-services';
import {
  FieldConfigUnion,
  IncomingValueUnion,
} from '@tager/admin-dynamic-field';

interface SettingsItem {
  id: number;
  key: string;
  label: string;
  type: string;
  value: unknown;
}

interface SettingsItemFile extends SettingsItem {
  type: 'IMAGE' | 'FILE';
  value: Nullable<FileType>;
}

interface SettingsItemFileList extends SettingsItem {
  type: 'GALLERY';
  value: Array<FileType>;
}

interface SettingsItemString extends SettingsItem {
  type: 'NUMBER' | 'STRING' | 'TEXT';
  value: Nullable<string>;
}

export type SettingsItemType =
  | SettingsItemFile
  | SettingsItemFileList
  | SettingsItemString;

export type SettingsSectionType = {
  name: string;
  fields: Array<SettingsItemType>;
};

export type SettingItemFullType = {
  id: number;
  config: FieldConfigUnion;
  value: IncomingValueUnion;
};
