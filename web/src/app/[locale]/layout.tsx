import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";

import { getMessages } from "@/i18n/getMessages";
import { locales, type Locale } from "@/i18n/settings";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const localeValue = locale as Locale;

  if (!locales.includes(localeValue)) {
    notFound();
  }

  setRequestLocale(localeValue);

  const messages = await getMessages(localeValue);

  return (
    <NextIntlClientProvider locale={localeValue} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
