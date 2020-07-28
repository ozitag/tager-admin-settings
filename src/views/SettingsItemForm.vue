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
import { COMMON_SETTINGS_ROUTE_PATHS } from '../constants/paths';

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
      settingsItemListRoutePath: COMMON_SETTINGS_ROUTE_PATHS.ITEM_LIST,
    };
  },
  computed: {
    itemId(): string {
      return this.$route.params.itemId;
    },
    valueFieldType(): string {
      switch (this.settingsItem?.type) {
        case 'IMAGE':
        case 'FILE':
        case 'GALLERY':
          return 'form-field-file-input';
        default:
          return 'form-field';
      }
    },
    valueFieldAttrs(): Record<string, string | number | boolean> {
      switch (this.settingsItem?.type) {
        case 'GALLERY':
          return { fileType: 'image', multiple: true };
        case 'IMAGE':
          return { fileType: 'image' };
        case 'FILE':
          return {};
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
        case 'FILE':
        case 'IMAGE':
          return {
            value: (this.values.value as Nullable<FileType>)?.id ?? null,
          };
        case 'GALLERY':
          return {
            value: (this.values.value as Array<FileType>).map(
              (file) => file.id
            ),
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
          this.$router.push(COMMON_SETTINGS_ROUTE_PATHS.ITEM_LIST);

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
