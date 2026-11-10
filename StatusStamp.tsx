import { Check, Hourglass, Layers, Lock, TriangleAlert } from "lucide-react";
import type { CSSProperties } from "react";

import type { Status } from "@/data/registry";

const ICONS = {
  confirmed: Check,
  expected: Hourglass,
  rolling: Layers,
  unconfirmed: TriangleAlert,
  closed: Lock,
} satisfies Record<Status, unknown>;

/**
 * Status of a registry entry. Meaning never depends on colour alone: each
 * status has its own icon, its own border pattern and its own word.
 */
export function StatusStamp({
  status,
  label,
  className = "",
  style,
}: {
  status: Status;
  label: string;
  className?: string;
  style?: CSSProperties;
}) {
  const Icon = ICONS[status];
  return (
    <span className={`stamp stamp-${status} ${className}`} style={style}>
      <Icon size={14} strokeWidth={2.4} aria-hidden="true" />
      {label}
    </span>
  );
}
