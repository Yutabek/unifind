import type { NextConfig } from "next";

const LOCALES = ["uz", "ru", "en"] as const;

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // The root "/" has no page of its own: send people to their language.
  // Order matters, the first matching rule wins:
  //   1) the language they picked before (cookie set by the language switcher)
  //   2) the browser language (Russian or English), 3) Uzbek by default.
  async redirects() {
    return [
      ...LOCALES.map((locale) => ({
        source: "/",
        has: [{ type: "cookie" as const, key: "hamroh_lang", value: locale }],
        destination: `/${locale}`,
        permanent: false,
      })),
      {
        source: "/",
        has: [{ type: "header" as const, key: "accept-language", value: "[rR][uU].*" }],
        destination: "/ru",
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "header" as const, key: "accept-language", value: "[eE][nN].*" }],
        destination: "/en",
        permanent: false,
      },
      { source: "/", destination: "/uz", permanent: false },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
      {
        // Fonts never change name, so they can be cached for a year.
        source: "/fonts/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
