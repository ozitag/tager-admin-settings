<template>
  <li class="settings-section">
    <button
      v-if="!shouldAlwaysDisplay"
      type="button"
      :class="['title-button', isOpen ? 'collapse' : 'expand']"
      :title="isOpen ? 'Collapse' : 'Expand'"
      @click="toggleOpen"
    >
      <span
        role="img"
        :class="['icon-chevron-right', { 'icon-expand-more': isOpen }]"
      >
        <svg-icon name="chevronRight" />
      </span>

      <span class="title">
        {{ section.name }}
      </span>
    </button>

    <div v-show="isOpen" class="content">
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
            :href="getSettingItemFormUrl({ itemId: row.id })"
          >
            <svg-icon name="edit"></svg-icon>
          </base-button>
        </template>
      </base-table>
    </div>
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
  margin-bottom: 1rem;

  .title-button {
    display: inline-flex;
    align-items: center;
    color: inherit;
    margin-left: -0.375rem;
    transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    &:hover {
      cursor: pointer;
    }

    &.collapse {
      color: var(--primary);

      .icon-expand-more {
        color: var(--primary);
      }
    }
  }

  .icon-chevron-right {
    margin-right: 0.375rem;
    color: var(--secondary);
    transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    svg {
      display: block;
      fill: currentColor;
      will-change: transform;
      transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 0.24s;
    }

    &.icon-expand-more {
      svg {
        transform: rotate(90deg);
      }
    }
  }

  .content {
    margin: 1rem 0 2rem 0;
    padding: 0 1.5rem;
  }
}
</style>
