<template>
  <page
    :title="pageTitle"
    :is-content-loading="isContentLoading"
    :footer="{
      backHref: settingsItemListRoutePath,
      backLabel: t('settings:backToCommonSettings'),
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
  SetupContext,
  watch,
} from '@vue/composition-api';

import { convertRequestErrorToMap, useResource } from '@tager/admin-services';
import { DynamicField } from '@tager/admin-dynamic-field';
import { useTranslation } from '@tager/admin-ui';

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

export default defineComponent({
  name: 'SettingsItemForm',
  components: { DynamicField },
  setup(props, context: SetupContext) {
    const { t } = useTranslation(context);

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

    function submitForm({ shouldExit }: { shouldExit: boolean }) {
      isSubmitting.value = true;

      const body: SettingsItemUpdatePayload = convertSettingItemFormValuesToUpdatePayload(
        values.value
      );

      updateSettingsItem(settingItemId.value, body)
        .then(() => {
          errors.value = {};

          if (shouldExit) {
            context.root.$router.push(getSettingItemListUrl());
          }

          context.root.$toast({
            variant: 'success',
            title: t('settings:success'),
            body: t('settings:settingsHaveBeenSuccessfullyUpdated'),
          });
        })
        .catch((error) => {
          console.error(error);
          errors.value = convertRequestErrorToMap(error);
          context.root.$toast({
            variant: 'danger',
            title: t('settings:error'),
            body: t('settings:settingsUpdateHaveBeenFailed'),
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
