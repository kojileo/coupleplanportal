import type { Locale } from "./settings";

export async function getMessages(locale: Locale) {
  const messages = await import(`./messages/${locale}.json`);
  return messages.default;
}
