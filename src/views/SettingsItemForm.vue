<template>
  <page
    :title="settingsItem ? settingsItem.label : ''"
    :is-content-loading="isInitialLoading"
    :footer="{
      backHref: settingsItemListRoutePath,
      backLabel: 'Back to Common settings',
      onSubmit: submitForm,
      isSubmitting: isSubmitting,
    }"
  >
    <form novalidate @submit.prevent>
      <component
        :is="valueFieldType"
        v-if="settingsItem"
        v-model="values.value"
        name="value"
        label="Value"
        :error="errors.value"
        v-bind="valueFieldAttrs"
      />
    </form>
  </page>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  convertRequestErrorToMap,
  FileType,
  Nullable,
} from '@tager/admin-services';

import {
  getSettingsItem,
  SettingsItemUpdatePayload,
  updateSettingsItem,
} from '../services/requests';
import { SettingsItemType } from '../typings/model';
import { getSettingItemListUrl } from '../utils/paths';

type FormValues = Pick<SettingsItemType, 'value'>;

export default Vue.extend({
  name: 'SettingsItemForm',
  data(): {
    settingsItem: Nullable<SettingsItemType>;
    values: FormValues;
    errors: Record<string, string>;
    isSubmitting: boolean;
    isInitialLoading: boolean;
    settingsItemListRoutePath: string;
  } {
    return {
      settingsItem: null,
      values: { value: null },
      errors: {},
      isSubmitting: false,
      isInitialLoading: false,
      settingsItemListRoutePath: getSettingItemListUrl(),
    };
  },
  computed: {
    itemId(): string {
      return this.$route.params.itemId;
    },
    valueFieldType(): string {
      switch (this.settingsItem?.type) {
        case 'IMAGE':
          return 'form-field-file-input';
        default:
          return 'form-field';
      }
    },
    valueFieldAttrs(): Record<string, string | number> {
      switch (this.settingsItem?.type) {
        case 'IMAGE':
          return { fileType: 'image' };
        case 'TEXT':
          return { type: 'textarea', rows: 4 };
        default:
          return {};
      }
    },
  },
  mounted(): void {
    this.isInitialLoading = true;

    getSettingsItem(this.itemId)
      .then((response) => {
        this.values = this.convertSettingsItemToFormValues(response.data);
        this.settingsItem = response.data;
      })
      .catch(console.error)
      .finally(() => {
        this.isInitialLoading = false;
      });
  },
  methods: {
    convertSettingsItemToFormValues(
      settingsItem: SettingsItemType
    ): FormValues {
      return {
        value: settingsItem.value,
      };
    },
    convertFormValuesToRequest(): SettingsItemUpdatePayload {
      switch (this.settingsItem?.type ?? 'STRING') {
        case 'IMAGE':
          return {
            value: (this.values.value as Nullable<FileType>)?.id ?? null,
          };
        default:
          return { value: this.values.value as string };
      }
    },
    submitForm() {
      this.isSubmitting = true;

      const body: SettingsItemUpdatePayload = this.convertFormValuesToRequest();

      updateSettingsItem(this.itemId, body)
        .then(() => {
          this.errors = {};
          this.$router.push(getSettingItemListUrl());

          this.$toast({
            variant: 'success',
            title: 'Success',
            body: 'Settings have been successfully updated',
          });
        })
        .catch((error) => {
          console.error(error);
          this.errors = convertRequestErrorToMap(error);
          this.$toast({
            variant: 'danger',
            title: 'Error',
            body: 'Settings update have been failed',
          });
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
  },
});
</script>

<style scoped lang="scss"></style>
