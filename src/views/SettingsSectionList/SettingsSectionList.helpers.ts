import {
  ColumnDefinition,
  formatBoolean,
  formatDate,
  formatDateTime,
} from '@tager/admin-ui';
import { isFileObject, isNotFalsy, isString } from '@tager/admin-services';
import { ButtonField } from '@tager/admin-dynamic-field';

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

      if (row.config.type === 'HTML') {
        return row.value ? 'HTML Content' : '';
      }

      if (row.config.type === 'DATE' && isString(row.value)) {
        const date = new Date(row.value);
        const isValid = !Number.isNaN(date.valueOf());

        if (isValid) {
          return formatDate(date);
        }
      }

      if (row.config.type === 'DATETIME' && isString(row.value)) {
        const date = new Date(row.value);
        const isValid = !Number.isNaN(date.valueOf());

        if (isValid) {
          return formatDateTime(date);
        }
      }

      if (row.config.type === 'TEXT' && isString(row.value)) {
        return row.value.length > 100
          ? row.value.slice(0, 100) + '...'
          : row.value;
      }

      if (row.config.type === 'BUTTON') {
        const button = row.value as ButtonField['value'];

        if (button) {
          return [
            `Label: "${button.label}".`,
            `Link: "${button.link}".`,
            button.isNewTab ? '(Open in new tab)' : null,
          ]
            .filter(isNotFalsy)
            .join(' ');
        }
      }

      if (row.config.type === 'TRUE_FALSE') {
        return formatBoolean(row.value);
      }

      return row.value;
    },
  };
}
