<template>
  <page-layout :sidebar-menu-list="sidebarMenuList">
    <router-view />
  </page-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { MenuItemType } from '@tager/admin-layout';

import { COMMON_SETTINGS_ROUTE_PATHS } from '../constants/paths';

export const COMMON_SETTINGS_MENU_ITEM: MenuItemType = {
  id: 'settings',
  name: 'Common Settings',
  path: COMMON_SETTINGS_ROUTE_PATHS.ITEM_LIST,
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
