import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { getDict } from "@/lib/dictionaries";
import { DEFAULT_LOCALE, LOCALES, isLocale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Draw the three images once at build time instead of on every request. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// Satori (the engine behind ImageResponse) reads TTF/OTF/WOFF, not WOFF2, and has no
// unicode-range: each script is its own font, tried in the order of the font-family list.
// Sofia has no ʻ (U+02BB, used in Uzbek), so Onest is listed after it as the fallback.
const FONT_DIR = join(process.cwd(), "assets", "og");
const read = (file: string) => readFile(join(FONT_DIR, file));

const DISPLAY = "SofiaLatin, SofiaCyrillic, OnestLatin, OnestCyrillic";
const TEXT = "OnestLatin, OnestCyrillic";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = await getDict(locale);

  const [sofiaLatin, sofiaCyrillic, onestLatin, onestCyrillic] = await Promise.all([
    read("sofia-sans-condensed-latin-700-normal.woff"),
    read("sofia-sans-condensed-cyrillic-700-normal.woff"),
    read("onest-latin-500-normal.woff"),
    read("onest-cyrillic-500-normal.woff"),
  ]);

  const hatched = "repeating-linear-gradient(135deg, #f2a71b 0px, #f2a71b 4px, rgba(242,167,27,0.18) 4px, rgba(242,167,27,0.18) 14px)";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#1b2b8c",
          color: "#f3f6ff",
          fontFamily: TEXT,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width="84" height="84" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="9" fill="#f3f6ff" />
            <path d="M9.5 23c0-7 13-4 13-11.5" fill="none" stroke="#1b2b8c" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="9.5" cy="23" r="2.9" fill="#1b2b8c" />
            <circle cx="22.5" cy="9.5" r="3.5" fill="#f2a71b" />
          </svg>
          <div style={{ display: "flex", marginLeft: 26, fontFamily: DISPLAY, fontSize: 96, fontWeight: 700, color: "#ffffff" }}>
            {SITE.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              maxWidth: 940,
              fontSize: 62,
              fontWeight: 500,
              lineHeight: 1.18,
              letterSpacing: "-0.01em",
            }}
          >
            {dict.meta.ogTagline}
          </div>

          {/* The register's own alphabet: solid = confirmed, hatched = expected. */}
          <div style={{ display: "flex", flexDirection: "column", marginTop: 52 }}>
            <div style={{ display: "flex", position: "relative", height: 34 }}>
              <div style={{ display: "flex", marginLeft: 250, width: 360, height: 34, borderRadius: 8, background: "#86e3b9" }} />
            </div>
            <div style={{ display: "flex", position: "relative", height: 34, marginTop: 14 }}>
              <div
                style={{
                  display: "flex",
                  marginLeft: 120,
                  width: 560,
                  height: 34,
                  borderRadius: 8,
                  border: "3px solid #f2a71b",
                  backgroundImage: hatched,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "SofiaLatin", data: sofiaLatin, weight: 700, style: "normal" },
        { name: "SofiaCyrillic", data: sofiaCyrillic, weight: 700, style: "normal" },
        { name: "OnestLatin", data: onestLatin, weight: 500, style: "normal" },
        { name: "OnestCyrillic", data: onestCyrillic, weight: 500, style: "normal" },
      ],
    },
  );
}
