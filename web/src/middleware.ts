import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "@/i18n/settings";

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix: "always",
});

export const config = {
  matcher: ["/", "/(ja|en)/:path*"],
};
