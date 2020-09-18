<template>
  <li class="settings-section">
    <div v-if="!shouldAlwaysDisplay" class="title-row" @click="toggleOpen">
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
import { computed, defineComponent, ref } from '@vue/composition-api';

import { ColumnDefinition } from '@tager/admin-ui';

import { SettingItemType, SettingsSectionType } from '../../../typings/model';
import { getSettingItemFormUrl } from '../../../utils/paths';
import {
  getDynamicColumnDefinition,
  isSectionOpen,
  toggleSection,
} from '../SettingsSectionList.helpers';

const COLUMN_DEFS: Array<ColumnDefinition<SettingItemType>> = [
  {
    id: 1,
    name: 'Name',
    field: 'label',
    format: ({ row }) => row.config.label,
    style: { width: '350px' },
    headStyle: { width: '350px' },
  },
  getDynamicColumnDefinition(),
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
    const shouldAlwaysDisplay = computed<boolean>(() => !props.section.name);

    const isOpen = ref<boolean>(
      shouldAlwaysDisplay.value || isSectionOpen(props.section.name)
    );

    function toggleOpen() {
      isOpen.value = !isOpen.value;
      toggleSection(props.section.name);
    }

    return {
      rowData: props.section.fields,
      isRowDataLoading: false,
      columnDefs: COLUMN_DEFS,
      getSettingItemFormUrl,
      isOpen,
      toggleOpen,
      shouldAlwaysDisplay,
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
