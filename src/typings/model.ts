import { Nullable, FileType } from '@tager/admin-services';

interface SettingsItem {
  id: number;
  key: string;
  label: string;
  type: string;
  value: any;
}

interface SettingsItemFile extends SettingsItem {
  type: 'IMAGE' | 'FILE';
  value: Nullable<FileType>;
}

interface SettingsItemFileList extends SettingsItem {
  type: 'GALLERY';
  value: Array<FileType>;
}

interface SettingsItemString extends SettingsItem {
  type: 'NUMBER' | 'STRING' | 'TEXT';
  value: Nullable<string>;
}

export type SettingsItemType =
  | SettingsItemFile
  | SettingsItemFileList
  | SettingsItemString;

export type SettingsSectionType = {
  name: string;
  fields: Array<SettingsItemType>;
};

/** Common */
export interface FieldTemplate {
  readonly name: string;
  readonly label: string;
  readonly type: string;
  readonly meta: Record<string, any>;
  readonly fields?: Array<FieldTemplate>;
}

export interface Field<Template extends FieldTemplate, Value = any> {
  readonly id: string;
  readonly template: Template;
  value: Value;
}

export interface IncomingField<Value> {
  readonly name: string;
  readonly value: Value;
}

export interface OutgoingField<Value> {
  readonly name: string;
  readonly value: Value;
}

/** Default - we use it as fallback for unknown fields */

export interface DefaultFieldTemplate extends FieldTemplate {}

export interface DefaultField extends Field<DefaultFieldTemplate, null> {}
export interface DefaultIncomingField extends IncomingField<null> {}
export interface DefaultOutgoingField extends OutgoingField<null> {}

/** STRING */

export interface StringFieldTemplate extends FieldTemplate {
  type: 'STRING';
}
export interface StringField extends Field<StringFieldTemplate, string> {}
export interface StringIncomingField extends IncomingField<string> {}
export interface StringOutgoingField extends OutgoingField<string> {}

/** URL */

export interface UrlFieldTemplate extends FieldTemplate {
  type: 'URL';
}
export interface UrlField extends Field<UrlFieldTemplate, string> {}
export interface UrlIncomingField extends IncomingField<string> {}
export interface UrlOutgoingField extends OutgoingField<string> {}

/** DATE */

export interface DateFieldTemplate extends FieldTemplate {
  type: 'DATE';
}
export interface DateField extends Field<DateFieldTemplate, string> {}
export interface DateIncomingField extends IncomingField<string> {}
export interface DateOutgoingField extends OutgoingField<string> {}

/** DATETIME */

export interface DateTimeFieldTemplate extends FieldTemplate {
  type: 'DATETIME';
}
export interface DateTimeField extends Field<DateTimeFieldTemplate, string> {}
export interface DateTimeIncomingField extends IncomingField<string> {}
export interface DateTimeOutgoingField extends OutgoingField<string> {}

/** TEXT */

export interface TextFieldTemplate extends FieldTemplate {
  type: 'TEXT';
}
export interface TextField extends Field<TextFieldTemplate, string> {}
export interface TextIncomingField extends IncomingField<string> {}
export interface TextOutgoingField extends OutgoingField<string> {}

/** HTML */

export interface HtmlFieldTemplate extends FieldTemplate {
  type: 'HTML';
}
export interface HtmlField extends Field<HtmlFieldTemplate, string> {}
export interface HtmlIncomingField extends IncomingField<string> {}
export interface HtmlOutgoingField extends OutgoingField<string> {}

/** IMAGE */

export interface ImageFieldTemplate extends FieldTemplate {
  type: 'IMAGE';
}
export interface ImageField
  extends Field<ImageFieldTemplate, Nullable<FileType>> {}
export interface ImageIncomingField extends IncomingField<Nullable<FileType>> {}
export interface ImageOutgoingField extends OutgoingField<Nullable<number>> {}

/** GALLERY */

export interface GalleryFieldTemplate extends FieldTemplate {
  type: 'GALLERY';
}
export interface GalleryField
  extends Field<GalleryFieldTemplate, Array<FileType>> {}
export interface GalleryIncomingField extends IncomingField<Array<FileType>> {}
export interface GalleryOutgoingField extends OutgoingField<Array<number>> {}

/** FILE */

export interface FileFieldTemplate extends FieldTemplate {
  type: 'FILE';
}
export interface FileField
  extends Field<FileFieldTemplate, Nullable<FileType>> {}
export interface FileIncomingField extends IncomingField<Nullable<FileType>> {}
export interface FileOutgoingField extends OutgoingField<Nullable<number>> {}

/** REPEATER */

export interface RepeaterFieldTemplate extends FieldTemplate {
  type: 'REPEATER';
  fields: Array<FieldTemplateUnion>;
  meta: { view?: 'TABLE' };
}
export interface RepeaterField
  extends Field<
    RepeaterFieldTemplate,
    Array<{ id: string; value: Array<FieldUnion> }>
  > {}
export interface RepeaterIncomingField
  extends IncomingField<Array<Array<IncomingFieldUnion>>> {}
export interface RepeaterOutgoingField
  extends OutgoingField<Array<Array<OutgoingFieldUnion>>> {}

/** All */
export type FieldTemplateUnion =
  | StringFieldTemplate
  | UrlFieldTemplate
  | TextFieldTemplate
  | HtmlFieldTemplate
  | ImageFieldTemplate
  | GalleryFieldTemplate
  | FileFieldTemplate
  | DateFieldTemplate
  | RepeaterFieldTemplate;

export type FieldUnion =
  | StringField
  | UrlField
  | TextField
  | HtmlField
  | ImageField
  | GalleryField
  | FileField
  | DateField
  | RepeaterField
  | DefaultField;

export type IncomingFieldUnion =
  | StringIncomingField
  | UrlIncomingField
  | TextIncomingField
  | HtmlIncomingField
  | ImageIncomingField
  | GalleryIncomingField
  | FileIncomingField
  | DateIncomingField
  | RepeaterIncomingField;

export type OutgoingFieldUnion =
  | StringOutgoingField
  | UrlOutgoingField
  | TextOutgoingField
  | HtmlOutgoingField
  | ImageOutgoingField
  | GalleryOutgoingField
  | FileOutgoingField
  | DateOutgoingField
  | RepeaterOutgoingField
  | DefaultOutgoingField;

/***************************/

export type SettingItemFullType = {
  id: number;
  template: FieldTemplateUnion;
  value: IncomingFieldUnion['value'];
};
