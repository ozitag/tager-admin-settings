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
        <ChevronRightIcon />
      </span>

      <span class="title">
        {{ section.name }}
      </span>
    </button>

    <div v-show="isOpen" class="content">
      <BaseTable
        :column-defs="columnDefs"
        :row-data="rowData"
        :loading="isRowDataLoading"
        enumerable
      >
        <template #cell(actions)="{ row }">
          <BaseButton
            variant="icon"
            :title="$i18n.t('settings:edit')"
            :href="getSettingItemFormUrl({ itemId: row.id })"
          >
            <EditIcon />
          </BaseButton>
        </template>
      </BaseTable>
    </div>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import {
  BaseButton,
  BaseTable,
  ChevronRightIcon,
  ColumnDefinition,
  EditIcon,
} from "@tager/admin-ui";
import { useI18n } from "@tager/admin-services";

import { SettingItemType } from "../../../typings/model";
import { getSettingItemFormUrl } from "../../../utils/paths";
import {
  getDynamicColumnDefinition,
  isSectionOpen,
  toggleSection,
} from "../SettingsSectionList.helpers";

export default defineComponent({
  name: "SettingsSection",
  components: { EditIcon, BaseButton, BaseTable, ChevronRightIcon },
  props: {
    section: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();

    const shouldAlwaysDisplay = computed<boolean>(() => !props.section.name);

    const isOpen = ref<boolean>(
      shouldAlwaysDisplay.value || isSectionOpen(props.section.name)
    );

    function toggleOpen() {
      isOpen.value = !isOpen.value;
      toggleSection(props.section.name);
    }

    const columnDefs: Array<ColumnDefinition<SettingItemType>> = [
      {
        id: 1,
        name: t("settings:name"),
        field: "label",
        format: ({ row }) => row.config.label,
        style: { width: "350px" },
        headStyle: { width: "350px" },
      },
      getDynamicColumnDefinition(t),
      {
        id: 3,
        name: t("settings:actions"),
        field: "actions",
        style: { width: "80px", textAlign: "center" },
        headStyle: { width: "80px", textAlign: "center" },
      },
    ];

    return {
      t,
      rowData: props.section.fields,
      isRowDataLoading: false,
      columnDefs,
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
