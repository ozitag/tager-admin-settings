<template>
  <page :title="t('settings:settings')" :is-content-loading="isContentLoading">
    <ul>
      <SettingsSection
        v-for="(section, index) of settingsSectionList"
        :key="index"
        :section="section"
      />
    </ul>
  </page>
</template>

<script lang="ts">
import { defineComponent, onMounted, SetupContext } from '@vue/composition-api';

import { useResource } from '@tager/admin-services';
import { useTranslation } from '@tager/admin-ui';

import { getSettingsSectionList } from '../../services/requests';
import { SettingsSectionType } from '../../typings/model';

import SettingsSection from './components/SettingsSection.vue';

export default defineComponent({
  name: 'SettingsSectionList',
  components: { SettingsSection },
  setup(props, context: SetupContext) {
    const { t } = useTranslation(context);

    const [
      fetchSettingsSectionList,
      { data: settingsSectionList, loading: isSettingsSectionListLoading },
    ] = useResource<Array<SettingsSectionType>>({
      fetchResource: getSettingsSectionList,
      initialValue: [],
      context,
      resourceName: 'Settings section list',
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
