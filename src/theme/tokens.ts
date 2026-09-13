/**
 * Quiet-luxury 2026 art direction.
 *
 * Display: Fraunces (optical-size serif). Body: Manrope. Meta: IBM Plex Mono.
 * Palette: warm cinematic ink against the portrait’s skin and black tailoring.
 * Accent is aged brass; oxblood is a scarce Verona/wine signal — never a
 * purple/blue SaaS gradient, never Inter + Space Grotesk.
 *
 * Keep hex values in lockstep with src/theme/tokens.css.
 */
export class ArtDirection {
  static void(): string {
    return "#070605";
  }

  static ink(): string {
    return "#0c0a08";
  }

  static surface(): string {
    return "#151210";
  }

  static surfaceRaised(): string {
    return "#1d1916";
  }

  static line(): string {
    return "#2c261f";
  }

  static ivory(): string {
    return "#f4ece2";
  }

  static cream(): string {
    return "#e6d8c8";
  }

  static muted(): string {
    return "#9a8d80";
  }

  static brass(): string {
    return "#c6a36a";
  }

  static brassBright(): string {
    return "#d8bc86";
  }

  static oxblood(): string {
    return "#7a3a32";
  }

  static onAccent(): string {
    return "#140f0c";
  }

  static themeColor(): string {
    return ArtDirection.ink();
  }

  static cssVar(token: string): string {
    return `var(--${token})`;
  }

  static displayFamily(): string {
    return ArtDirection.cssVar("font-display");
  }

  static bodyFamily(): string {
    return ArtDirection.cssVar("font-body");
  }

  static metaFamily(): string {
    return ArtDirection.cssVar("font-code");
  }

  static cinemaGradient(): string {
    return [
      `radial-gradient(1200px 680px at 18% 0%, color-mix(in srgb, ${ArtDirection.brass()} 16%, transparent), transparent 58%)`,
      `radial-gradient(900px 620px at 92% 100%, color-mix(in srgb, ${ArtDirection.oxblood()} 18%, transparent), transparent 62%)`,
    ].join(", ");
  }

  static accentGradient(): string {
    return `linear-gradient(135deg, ${ArtDirection.brass()}, color-mix(in srgb, ${ArtDirection.brass()} 52%, ${ArtDirection.oxblood()}))`;
  }

  static cssVars(): Record<string, string> {
    return {
      "--void": ArtDirection.void(),
      "--ink": ArtDirection.ink(),
      "--surface": ArtDirection.surface(),
      "--surface-raised": ArtDirection.surfaceRaised(),
      "--line": ArtDirection.line(),
      "--ivory": ArtDirection.ivory(),
      "--cream": ArtDirection.cream(),
      "--muted": ArtDirection.muted(),
      "--brass": ArtDirection.brass(),
      "--brass-bright": ArtDirection.brassBright(),
      "--oxblood": ArtDirection.oxblood(),
      "--on-accent": ArtDirection.onAccent(),
    };
  }
}
