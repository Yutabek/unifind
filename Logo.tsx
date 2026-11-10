/**
 * The mark is a route: a filled start point, an open destination, and the
 * path between them. It is deliberately plain, so a rename of the brand
 * (src/lib/site.ts) does not force a redesign.
 */
export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect width="32" height="32" rx="9" fill="#1B2B8C" />
      <path
        d="M9.5 23c0-7 13-4 13-11.5"
        fill="none"
        stroke="#F3F6FF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="9.5" cy="23" r="2.9" fill="#F3F6FF" />
      <circle cx="22.5" cy="9.5" r="3.5" fill="#F2A71B" />
    </svg>
  );
}
