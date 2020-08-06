<template>
  <page-layout :sidebar-menu-list="sidebarMenuList">
    <router-view />
  </page-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { MenuItemType } from '@tager/admin-layout';
import { getSettingItemListUrl } from '../utils/paths';

export const COMMON_SETTINGS_MENU_ITEM: MenuItemType = {
  id: 'settings',
  text: 'Common Settings',
  url: getSettingItemListUrl(),
  icon: 'settings',
};

export default Vue.extend({
  name: 'App',
  data(): { sidebarMenuList: Array<MenuItemType> } {
    return {
      sidebarMenuList: [COMMON_SETTINGS_MENU_ITEM],
    };
  },
});
</script>

<style scoped lang="scss"></style>
