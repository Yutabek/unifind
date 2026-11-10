"use client";

import type { ReactNode } from "react";

import { prefillWaitlist } from "@/lib/prefill";
import type { Interest, Role } from "@/lib/validation";

/** A link to the waitlist that also preselects a role and/or a destination in the form. */
export function PrefillLink({
  role,
  interest,
  className,
  children,
  href = "#waitlist",
}: {
  role?: Role;
  interest?: Interest;
  className?: string;
  children: ReactNode;
  href?: string;
}) {
  return (
    <a href={href} className={className} onClick={() => prefillWaitlist({ role, interest })}>
      {children}
    </a>
  );
}
