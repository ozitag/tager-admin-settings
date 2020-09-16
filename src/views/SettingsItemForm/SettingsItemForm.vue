<template>
  <page
    :title="pageTitle"
    :is-content-loading="isContentLoading"
    :footer="{
      backHref: settingsItemListRoutePath,
      backLabel: 'Back to Common settings',
      onSubmit: submitForm,
      isSubmitting: isSubmitting,
    }"
  >
    <form novalidate @submit.prevent>
      <DynamicField v-if="values" :field="values" />
    </form>
  </page>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
} from '@vue/composition-api';

import { convertRequestErrorToMap, useResource } from '@tager/admin-services';

import {
  getSettingsItem,
  SettingsItemUpdatePayload,
  updateSettingsItem,
} from '../../services/requests';
import { getSettingItemListUrl } from '../../utils/paths';

import {
  convertSettingItemFormValuesToUpdatePayload,
  FormValues,
  getSettingsFormValues,
} from './SettingsItemForm.helpers';
import DynamicField from './components/DynamicField.vue';

export default defineComponent({
  name: 'SettingsItemForm',
  components: { DynamicField },
  setup(props, context) {
    const settingItemId = computed<string>(
      () => context.root.$route.params.itemId
    );
    const [
      fetchSettingItem,
      { data: settingItem, loading: isSettingItemLoading },
    ] = useResource({
      fetchResource: () => getSettingsItem(settingItemId.value),
      context,
      resourceName: 'Setting item',
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

    function submitForm() {
      isSubmitting.value = true;

      const body: SettingsItemUpdatePayload = convertSettingItemFormValuesToUpdatePayload(
        values.value
      );

      updateSettingsItem(settingItemId.value, body)
        .then(() => {
          errors.value = {};
          context.root.$router.push(getSettingItemListUrl());

          context.root.$toast({
            variant: 'success',
            title: 'Success',
            body: 'Settings have been successfully updated',
          });
        })
        .catch((error) => {
          console.error(error);
          errors.value = convertRequestErrorToMap(error);
          context.root.$toast({
            variant: 'danger',
            title: 'Error',
            body: 'Settings update have been failed',
          });
        })
        .finally(() => {
          isSubmitting.value = false;
        });
    }

    const pageTitle = computed<string>(
      () => settingItem.value?.config.label ?? ''
    );

    const isContentLoading = computed<boolean>(
      () => isSettingItemLoading.value
    );

    return {
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
