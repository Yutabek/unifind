import type { Interest, Role } from "@/lib/validation";

/** Event name shared by the buttons that prefill the waitlist form and the form that listens. */
export const PREFILL_EVENT = "hamroh:prefill";

export interface PrefillDetail {
  role?: Role;
  interest?: Interest;
}

/** Call from a click handler. The form (a separate client component) picks it up. */
export function prefillWaitlist(detail: PrefillDetail): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail }));
}
