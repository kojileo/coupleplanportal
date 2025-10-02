import { getRequestConfig } from "next-intl/server";
import { getMessages } from "./getMessages";
import { defaultLocale, locales, type Locale } from "./settings";

export default getRequestConfig(async ({ locale }) => {
  const localeToUse = (locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale);

  const messages = await getMessages(localeToUse);

  return {
    locale: localeToUse,
    messages,
  };
});
