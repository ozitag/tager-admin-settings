<template>
  <li class="settings-section">
    <div v-if="shouldAlwaysDisplay">
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
    <div v-else>
      <ToggleSection :name="section.name" :opened-by-default="isOpenByDefault">
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
      </ToggleSection>
    </div>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import {
  BaseButton,
  BaseTable,
  ColumnDefinition,
  EditIcon,
  ToggleSection,
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
  components: {
    EditIcon,
    BaseButton,
    BaseTable,
    ToggleSection,
  },
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
      isOpenByDefault: isSectionOpen(props.section.name),
      shouldAlwaysDisplay,
    };
  },
});
</script>

<style scoped lang="scss">
.settings-section {
  margin-bottom: 1rem;
}
</style>
