<template>
  <PageLayout :sidebar-menu-list="sidebarMenuList">
    <router-view/>
  </PageLayout>
</template>

<script lang="ts">
import {defineComponent} from "vue";

import {type MenuItemType, PageLayout} from "@tager/admin-layout";
import {useI18n} from "@tager/admin-services";
import {ViewListIcon} from "@tager/admin-ui";

import {getSettingItemListUrl} from "../utils/paths";

export default defineComponent({
  name: "App",
  components: {PageLayout},
  setup() {
    const i18n = useI18n();

    const sidebarMenuList: Array<MenuItemType> = [
      {
        id: "pages",
        text: i18n.t("settings:commonSettings"),
        icon: ViewListIcon,
        children: [
          {
            text: i18n.t("settings:commonSettings"),
            url: getSettingItemListUrl(),
          },
        ],
      },
    ];

    return {
      sidebarMenuList,
    };
  },
});
</script>

<style scoped lang="scss"></style>
