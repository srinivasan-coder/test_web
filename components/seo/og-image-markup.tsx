import { SITE_CONFIG } from "@/lib/constants";

/**
 * Shared Open Graph / Twitter image composition for ImageResponse.
 */
export function OgImageMarkup() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#111827",
        color: "#FFFFFF",
        padding: "72px",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#93C5FD",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Photography Studio
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ fontSize: 76, lineHeight: 1.05, fontWeight: 600 }}>
          {SITE_CONFIG.name}
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#E5E7EB",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 400,
          }}
        >
          {SITE_CONFIG.tagline}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 22,
          color: "#9CA3AF",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        San Francisco · aperture.studio
      </div>
    </div>
  );
}
