<template>
  <page title="Settings">
    <base-table
      :column-defs="columnDefs"
      :row-data="rowData"
      :loading="isRowDataLoading"
      enumerable
    >
      <template v-slot:cell(actions)="{ row }">
        <base-button
          variant="icon"
          title="Edit"
          :href="getSettingsItemPageHref(row.id)"
        >
          <svg-icon name="edit"></svg-icon>
        </base-button>
      </template>
    </base-table>
  </page>
</template>

<script lang="ts">
import Vue from 'vue';
import { ColumnDefinition } from '@tager/admin-ui';

import { SettingsItemType } from '../typings/model';
import { getSettingsItemList } from '../services/requests';
import { getSettingItemFormUrl } from '../utils/paths';

const COLUMN_DEFS: Array<ColumnDefinition<SettingsItemType>> = [
  { id: 1, name: 'Name', field: 'label' },
  {
    id: 2,
    name: 'Value',
    field: 'value',
    type: ({ row }) => (row.type === 'IMAGE' ? 'image' : 'string'),
  },
  {
    id: 3,
    name: 'Actions',
    field: 'actions',
    style: { width: '80px', textAlign: 'center' },
    headStyle: { width: '80px', textAlign: 'center' },
  },
];

export default Vue.extend({
  name: 'SettingsItemList',
  data(): {
    columnDefs: Array<ColumnDefinition<SettingsItemType>>;
    rowData: Array<SettingsItemType>;
    isRowDataLoading: boolean;
  } {
    return {
      columnDefs: COLUMN_DEFS,
      rowData: [],
      isRowDataLoading: false,
    };
  },
  mounted(): void {
    this.refreshSeoPageList();
  },
  methods: {
    refreshSeoPageList(): Promise<void> {
      this.isRowDataLoading = true;

      return getSettingsItemList()
        .then((response) => {
          this.rowData = response.data;
        })
        .catch(console.error)
        .finally(() => {
          this.isRowDataLoading = false;
        });
    },
    getSettingsItemPageHref(itemId: number): string {
      return getSettingItemFormUrl({ itemId });
    },
  },
});
</script>

<style scoped lang="scss"></style>
