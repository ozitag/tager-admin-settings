<template>
  <PageLayout :sidebar-menu-list="sidebarMenuList">
    <router-view />
  </PageLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { MenuItemType, PageLayout } from "@tager/admin-layout";
import { SettingsIcon } from "@tager/admin-ui";
import { useI18n } from "@tager/admin-services";

import { getSettingItemListUrl } from "../utils/paths";

export default defineComponent({
  name: "App",
  components: { PageLayout },
  setup() {
    const { t } = useI18n();

    const sidebarMenuList: Array<MenuItemType> = [
      {
        id: "settings",
        text: t("settings:commonSettings"),
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
