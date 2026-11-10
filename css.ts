import type { CSSProperties } from "react";

/** Lets inline styles carry CSS custom properties: style={vars({ "--d": "0.3s" })}. */
export function vars(values: Record<`--${string}`, string | number>): CSSProperties {
  return values as CSSProperties;
}
