import { defaultLocale, locales } from "./src/i18n/settings";

const config = {
  defaultLocale,
  locales,
  localePrefix: "always" as const,
};

export default config;
