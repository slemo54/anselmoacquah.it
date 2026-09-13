import { ImageResponse } from "next/og";
import { Language } from "@/i18n/language";
import { Site } from "@/lib/site";

export const alt = Language.copy(Language.defaultLocale).seo.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const copy = Language.copy(Language.defaultLocale);

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
          background: "#080b0a",
          color: "#f2f5ef",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              letterSpacing: "-0.06em",
              fontWeight: 700,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            AA
            <span style={{ color: "#a5ff66" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              color: "#9ba6a0",
              fontSize: 22,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            Verona, Italy
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              width: 72,
              height: 4,
              background: "#a5ff66",
              borderRadius: 999,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 84,
              lineHeight: 0.92,
              letterSpacing: "-0.07em",
              fontWeight: 500,
            }}
          >
            Anselmo Acquah
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 860,
              color: "#c5cec8",
              fontSize: 30,
              lineHeight: 1.35,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            {copy.seo.ogTitle.replace(`${Site.displayName}, from Verona — `, "")}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#9ba6a0",
            fontSize: 22,
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          <span>IT · ENG · FR</span>
          <span>www.anselmoacquah.it/portfolio</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
