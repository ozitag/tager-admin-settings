import { ColumnDefinition } from '@tager/admin-ui';
import { isFileObject } from '@tager/admin-services';

import { SettingItemType } from '../../typings/model';
import { getFileSize } from '../../utils/common';

const KEY = 'open_sections';

function getOpenSectionNames(): Array<string> {
  const sectionListString = localStorage.getItem(KEY) ?? '';
  return sectionListString.split(',').filter(Boolean);
}

export function isSectionOpen(sectionName: string): boolean {
  return getOpenSectionNames().includes(sectionName);
}

export function toggleSection(sectionName: string): void {
  const openSectionList = getOpenSectionNames();
  let updatedSectionList: Array<string> = openSectionList;

  if (isSectionOpen(sectionName)) {
    updatedSectionList = openSectionList.filter(
      (openSectionName) => sectionName !== openSectionName
    );
  } else {
    updatedSectionList.push(sectionName);
  }

  localStorage.setItem(KEY, updatedSectionList.toString());
}

export function getDynamicColumnDefinition(): ColumnDefinition<
  SettingItemType
> {
  return {
    id: 2,
    name: 'Value',
    field: 'value',
    type: ({ row }) => {
      switch (row.config.type) {
        case 'IMAGE':
          return 'image';
        case 'HTML':
          return 'html';
        case 'COLOR':
          return 'color';
        case 'URL':
          return 'link';
        default:
          return 'string';
      }
    },
    format: ({ row }) => {
      if (row.config.type === 'FILE' && isFileObject(row.value)) {
        const file = row.value;

        const fileSize = getFileSize(file.size);
        return `${file.name} - ${fileSize}`;
      }

      if (row.config.type === 'GALLERY' && Array.isArray(row.value)) {
        const images = row.value;
        return `${images.length} image${images.length === 1 ? '' : 's'}`;
      }

      if (row.config.type === 'REPEATER' && Array.isArray(row.value)) {
        const images = row.value;
        return `${images.length} item${images.length === 1 ? '' : 's'}`;
      }

      return row.value;
    },
  };
}
