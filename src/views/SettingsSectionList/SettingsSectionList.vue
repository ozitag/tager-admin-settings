<template>
  <Page
    :title="$i18n.t('settings:settings')"
    :is-content-loading="isContentLoading"
  >
    <ul>
      <SettingsSection
        v-for="(section, index) of settingsSectionList"
        :key="index"
        :section="section"
      />
    </ul>
  </Page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

import { useResource, useI18n } from "@tager/admin-services";
import { Page } from "@tager/admin-layout";

import { getSettingsSectionList } from "../../services/requests";
import { SettingsSectionType } from "../../typings/model";

import SettingsSection from "./components/SettingsSection.vue";

export default defineComponent({
  name: "SettingsSectionList",
  components: { Page, SettingsSection },
  setup() {
    const { t } = useI18n();

    const [
      fetchSettingsSectionList,
      { data: settingsSectionList, loading: isSettingsSectionListLoading },
    ] = useResource<Array<SettingsSectionType>>({
      fetchResource: getSettingsSectionList,
      initialValue: [],
      resourceName: "Settings section list",
    });

    onMounted(() => {
      fetchSettingsSectionList();
    });

    return {
      t,
      settingsSectionList,
      isContentLoading: isSettingsSectionListLoading,
    };
  },
});
</script>

<style scoped lang="scss"></style>
