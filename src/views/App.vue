<template>
  <page-layout :sidebar-menu-list="sidebarMenuList">
    <router-view/>
  </page-layout>
</template>

<script lang="ts">
import {defineComponent, SetupContext} from 'vue';

import {MenuItemType} from '@tager/admin-layout';
import {SettingsIcon} from '@tager/admin-ui';
import {useI18n} from '@tager/admin-services';

import {getSettingItemListUrl} from '../utils/paths';

export default defineComponent({
  name: 'App',
  setup() {
    const {t} = useI18n();

    const sidebarMenuList: Array<MenuItemType> = [
      {
        id: 'settings',
        text: t('settings:commonSettings'),
        url: getSettingItemListUrl(),
        icon: SettingsIcon,
      },
    ];

    return {
      sidebarMenuList,
    };
  },
});
</script>

<style scoped lang="scss"></style>
