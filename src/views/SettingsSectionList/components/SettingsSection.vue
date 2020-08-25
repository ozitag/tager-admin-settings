<template>
  <li class="settings-section">
    <div class="title-row" @click="toggleOpen">
      <h3 v-if="section.name">{{ section.name }}</h3>
      <base-button variant="icon">
        <svg-icon :name="isOpen ? 'expandLess' : 'expandMore'" />
      </base-button>
    </div>
    <base-table
      v-show="isOpen"
      :column-defs="columnDefs"
      :row-data="rowData"
      :loading="isRowDataLoading"
      enumerable
    >
      <template v-slot:cell(actions)="{ row }">
        <base-button
          variant="icon"
          title="Edit"
          :href="getSettingItemFormUrl({ itemId: row.id })"
        >
          <svg-icon name="edit"></svg-icon>
        </base-button>
      </template>
    </base-table>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { ColumnDefinition } from '@tager/admin-ui';

import { SettingsItemType, SettingsSectionType } from '../../../typings/model';
import { getFileSize } from '../../../utils/common';
import { getSettingItemFormUrl } from '../../../utils/paths';

const COLUMN_DEFS: Array<ColumnDefinition<SettingsItemType>> = [
  { id: 1, name: 'Name', field: 'label' },
  {
    id: 2,
    name: 'Value',
    field: 'value',
    type: ({ row }) => (row.type === 'IMAGE' ? 'image' : 'string'),
    format: ({ row }) => {
      if (row.type === 'FILE') {
        const file = row.value;

        if (!file) return '';

        const fileSize = getFileSize(file.size);
        return `${file.name} - ${fileSize}`;
      }

      if (row.type === 'GALLERY') {
        return `${row.value.length} image${row.value.length === 1 ? '' : 's'}`;
      }

      return row.value;
    },
  },
  {
    id: 3,
    name: 'Actions',
    field: 'actions',
    style: { width: '80px', textAlign: 'center' },
    headStyle: { width: '80px', textAlign: 'center' },
  },
];

type Props = Readonly<{
  section: SettingsSectionType;
}>;

export default defineComponent<Props>({
  name: 'SettingsSection',
  props: {
    section: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const isOpen = ref<boolean>(false);

    function toggleOpen() {
      isOpen.value = !isOpen.value;
    }

    return {
      rowData: props.section.fields,
      isRowDataLoading: false,
      columnDefs: COLUMN_DEFS,
      getSettingItemFormUrl,
      section: props.section,
      isOpen,
      toggleOpen,
    };
  },
});
</script>

<style scoped lang="scss">
.settings-section {
  &:not(:last-child) {
    margin-bottom: 2rem;
  }

  .title-row {
    display: inline-flex;
    align-items: center;
    margin-bottom: 0.3rem;

    &:hover {
      cursor: pointer;

      color: #888;
    }
  }
}
</style>
