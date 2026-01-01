import enMessages from '../messages/en.json';

type Messages = typeof enMessages;
type Locale = 'en';

const messages: Record<Locale, Messages> = {
  en: enMessages,
};

export function getMessages(locale: Locale = 'en'): Messages {
  return messages[locale] || messages.en;
}

export function t(locale: Locale = 'en', key: string, params?: Record<string, string | number>): string {
  const messages = getMessages(locale);
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = messages;
  
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }
  
  if (typeof value !== 'string') {
    console.warn(`Translation value is not a string: ${key}`);
    return key;
  }
  
  // Simple parameter replacement
  if (params) {
    return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey]?.toString() || match;
    });
  }
  
  return value;
}

export type { Locale };

