import { Nullable, FileType } from '@tager/admin-services';

interface SettingsItem {
  id: number;
  key: string;
  label: string;
  type: string;
  value: any;
}

interface SettingsItemFile extends SettingsItem {
  type: 'IMAGE';
  value: Nullable<FileType>;
}

interface SettingsItemString extends SettingsItem {
  type: 'NUMBER' | 'STRING' | 'TEXT';
  value: Nullable<string>;
}

export type SettingsItemType = SettingsItemFile | SettingsItemString;
