import { i18n } from '@tager/admin-services';

import EN from './locales/en';
import RU from './locales/ru';

i18n.addTranslations('en', 'settings', EN);
i18n.addTranslations('ru', 'settings', RU);

export * from './constants/routes';
export * from './constants/paths';
export * from './utils/paths';
