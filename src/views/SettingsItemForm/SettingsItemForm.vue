<template>
  <Page :title="pageTitle" :is-content-loading="isContentLoading">
    <form novalidate @submit.prevent>
      <DynamicField v-if="values" :field="values" />
    </form>

    <template #footer>
      <FormFooter
        :back-href="settingsItemListRoutePath"
        :is-submitting="isSubmitting"
        @submit="submitForm"
      />
    </template>
  </Page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
  convertRequestErrorToMap,
  navigateBack,
  useResource,
  useToast,
} from "@tager/admin-services";
import { DynamicField } from "@tager/admin-dynamic-field";
import { useI18n } from "@tager/admin-services";
import { Page } from "@tager/admin-layout";
import { FormFooter, TagerFormSubmitEvent } from "@tager/admin-ui";

import {
  getSettingsItem,
  SettingsItemUpdatePayload,
  updateSettingsItem,
} from "../../services/requests";
import { getSettingItemListUrl } from "../../utils/paths";

import {
  convertSettingItemFormValuesToUpdatePayload,
  FormValues,
  getSettingsFormValues,
} from "./SettingsItemForm.helpers";

export default defineComponent({
  name: "SettingsItemForm",
  components: { FormFooter, Page, DynamicField },
  setup() {
    const { t } = useI18n();

    const route = useRoute();
    const router = useRouter();
    const toast = useToast();

    const settingItemId = computed(
      () => route.params.itemId as string | undefined
    );

    if (!settingItemId.value) return null;

    const [
      fetchSettingItem,
      { data: settingItem, loading: isSettingItemLoading },
    ] = useResource({
      fetchResource: () => getSettingsItem(settingItemId.value || ""),
      resourceName: "Setting item",
      initialValue: null,
    });

    onMounted(() => {
      fetchSettingItem();
    });

    watch(settingItemId, fetchSettingItem);

    /** Form state */

    const errors = ref<Record<string, string>>({});
    const values = ref<FormValues>(getSettingsFormValues(settingItem.value));
    const isSubmitting = ref<boolean>(false);

    watch(settingItem, () => {
      values.value = getSettingsFormValues(settingItem.value);
    });

    function submitForm(event: TagerFormSubmitEvent) {
      isSubmitting.value = true;

      const body: SettingsItemUpdatePayload =
        convertSettingItemFormValuesToUpdatePayload(values.value);

      updateSettingsItem(settingItemId.value || "", body)
        .then(() => {
          errors.value = {};

          if (event.type === "create_exit" || event.type === "save_exit") {
            navigateBack(router, getSettingItemListUrl());
          }

          toast.show({
            variant: "success",
            title: t("settings:success"),
            body: t("settings:settingsHaveBeenSuccessfullyUpdated"),
          });
        })
        .catch((error) => {
          console.error(error);
          errors.value = convertRequestErrorToMap(error);
          toast.show({
            variant: "danger",
            title: t("settings:error"),
            body: t("settings:settingsUpdateHaveBeenFailed"),
          });
        })
        .finally(() => {
          isSubmitting.value = false;
        });
    }

    const pageTitle = computed<string>(
      () => settingItem.value?.config.label ?? ""
    );

    const isContentLoading = computed<boolean>(
      () => isSettingItemLoading.value
    );

    return {
      t,
      pageTitle,
      isContentLoading,
      settingsItemListRoutePath: getSettingItemListUrl(),
      values,
      errors,
      isSubmitting,
      submitForm,
    };
  },
});
</script>

<style scoped lang="scss"></style>
