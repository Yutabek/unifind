export type FieldErrors = Partial<Record<"role" | "contact" | "org" | "consent", string>>;

export type WaitlistState =
  | { status: "idle" }
  | { status: "success"; already: boolean }
  | { status: "error"; message?: string; fieldErrors?: FieldErrors };

export const INITIAL_WAITLIST_STATE: WaitlistState = { status: "idle" };
