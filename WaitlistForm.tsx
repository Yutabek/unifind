"use client";

import { ArrowUpRight, Check, CircleAlert, LoaderCircle } from "lucide-react";
import { useActionState, useEffect, useId, useRef, useState, useTransition, type FormEvent } from "react";

import { joinWaitlist } from "@/app/actions/waitlist";
import type { Dict } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { PREFILL_EVENT, type PrefillDetail } from "@/lib/prefill";
import { INTERESTS, ROLES, STUDENT_BANDS, type Interest, type Role } from "@/lib/validation";
import { INITIAL_WAITLIST_STATE, type FieldErrors, type WaitlistState } from "@/lib/waitlist-state";

interface Props {
  locale: Locale;
  t: Dict["waitlist"];
  privacyHref: string;
  telegramUrl: string;
  /** Screen-reader suffix for links that open a new window. */
  external: string;
}

/**
 * Early-access form. Every field is controlled and validation happens on the
 * server (src/app/actions/waitlist.ts); the browser's own validation bubbles
 * are off so the messages are in the page language.
 *
 * Submitting: `action={formAction}` alone would make React reset the form
 * after each action, and it does not restore controlled radios and checkboxes
 * (the person's role and consent would silently un-tick after an error). So once the
 * page is hydrated, onSubmit takes over and calls the same action by hand, which
 * never resets. Before hydration the native `action` still works.
 */
export function WaitlistForm({ locale, t, privacyHref, telegramUrl, external }: Props) {
  const [state, formAction, pending] = useActionState(joinWaitlist, INITIAL_WAITLIST_STATE);
  const [, startTransition] = useTransition();
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [role, setRole] = useState<Role | "">("");
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [interests, setInterests] = useState<Interest[]>([]);
  const [org, setOrg] = useState("");
  const [students, setStudents] = useState("");
  const [consent, setConsent] = useState(false);
  // Read in the browser after mount: when the form appeared, and where the visitor came from.
  const [meta, setMeta] = useState({ ts: "", source: "", medium: "", campaign: "" });

  // Errors disappear as soon as the person touches the field they belong to.
  const [dismissed, setDismissed] = useState<{ source: WaitlistState; keys: Partial<Record<keyof FieldErrors, true>> }>({
    source: INITIAL_WAITLIST_STATE,
    keys: {},
  });
  const dismissedKeys = dismissed.source === state ? dismissed.keys : {};
  const clearError = (key: keyof FieldErrors) => setDismissed({ source: state, keys: { ...dismissedKeys, [key]: true } });
  const fieldErrors: FieldErrors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const errorOf = (key: keyof FieldErrors) => (dismissedKeys[key] ? undefined : fieldErrors[key]);
  const formError = state.status === "error" ? state.message : undefined;

  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setMeta({
      ts: String(Date.now()),
      source: params.get("utm_source") ?? "",
      medium: params.get("utm_medium") ?? "",
      campaign: params.get("utm_campaign") ?? "",
    });
  }, []);

  // Buttons elsewhere on the page ("remind me", "apply for the pilot") preselect a role or a destination.
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const detail = ((event as CustomEvent<PrefillDetail>).detail ?? {}) as PrefillDetail;
      if (detail.role) setRole(detail.role);
      const interest = detail.interest;
      if (interest) {
        setInterests((current) => {
          if (current.includes(interest)) return current;
          return interest === "unsure" ? ["unsure"] : [...current.filter((i) => i !== "unsure"), interest];
        });
      }
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  // Move focus to where the person needs to look next.
  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.focus();
      return;
    }
    if (state.status !== "error") return;
    const errors = state.fieldErrors ?? {};
    const target = errors.role
      ? `${uid}-role`
      : errors.contact
        ? `${uid}-contact`
        : errors.org
          ? `${uid}-org`
          : errors.consent
            ? `${uid}-consent`
            : `${uid}-alert`;
    document.getElementById(target)?.focus();
  }, [state, uid]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => formAction(data));
  }

  function toggleInterest(value: Interest) {
    setInterests((current) => {
      if (current.includes(value)) return current.filter((i) => i !== value);
      return value === "unsure" ? ["unsure"] : [...current.filter((i) => i !== "unsure"), value];
    });
  }

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} className="outline-none">
        <span className="grid size-14 place-items-center rounded-full bg-emerald-soft text-emerald">
          <Check size={28} strokeWidth={2.6} aria-hidden="true" />
        </span>
        <h3 className="t-display-sm mt-5">{t.success.title}</h3>
        <p className="mt-3 max-w-[32rem] text-ink-2">{state.already ? t.success.already : t.success.body}</p>
        {telegramUrl && (
          <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-7">
            {t.success.telegram}
            <ArrowUpRight size={18} aria-hidden="true" />
            <span className="sr-only"> ({external})</span>
          </a>
        )}
      </div>
    );
  }

  const roleError = errorOf("role");
  const contactError = errorOf("contact");
  const orgError = errorOf("org");
  const consentError = errorOf("consent");

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate aria-busy={pending} className="grid gap-7">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="ts" value={meta.ts} />
      <input type="hidden" name="source" value={meta.source} />
      <input type="hidden" name="medium" value={meta.medium} />
      <input type="hidden" name="campaign" value={meta.campaign} />

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {formError && (
        <div
          id={id("alert")}
          tabIndex={-1}
          className="flex gap-2.5 rounded-xl bg-pomegranate-soft p-4 font-medium leading-snug text-pomegranate"
        >
          <CircleAlert size={20} className="mt-0.5" aria-hidden="true" />
          <p>{formError}</p>
        </div>
      )}

      {/* Who */}
      <fieldset>
        <legend className="field-label">{t.roleLabel}</legend>
        <div className="flex flex-wrap gap-2.5">
          {ROLES.map((value, index) => (
            <label key={value} className="pill">
              <input
                id={index === 0 ? id("role") : undefined}
                type="radio"
                name="role"
                value={value}
                checked={role === value}
                required
                aria-describedby={roleError ? id("role-error") : undefined}
                onChange={() => {
                  setRole(value);
                  clearError("role");
                }}
              />
              <span>{t.roles[value]}</span>
            </label>
          ))}
        </div>
        {roleError && (
          <p id={id("role-error")} className="field-error">
            {roleError}
          </p>
        )}
      </fieldset>

      {/* Agencies are asked two extra things */}
      {role === "agency" && (
        <div className="detail-swap grid gap-7">
          <div>
            <label className="field-label" htmlFor={id("org")}>
              {t.orgLabel}
            </label>
            <input
              id={id("org")}
              name="org"
              type="text"
              className="input"
              value={org}
              maxLength={120}
              autoComplete="organization"
              required
              aria-invalid={orgError ? true : undefined}
              aria-describedby={orgError ? id("org-error") : undefined}
              onChange={(event) => {
                setOrg(event.target.value);
                clearError("org");
              }}
            />
            {orgError && (
              <p id={id("org-error")} className="field-error">
                {orgError}
              </p>
            )}
          </div>

          <div>
            <label className="field-label" htmlFor={id("students")}>
              {t.studentsLabel} <span className="font-normal text-ink-3">({t.optional})</span>
            </label>
            <select
              id={id("students")}
              name="students"
              className="input"
              value={students}
              onChange={(event) => setStudents(event.target.value)}
            >
              <option value="">—</option>
              {STUDENT_BANDS.map((band, index) => (
                <option key={band} value={band}>
                  {t.studentsOptions[index]}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* How to reach them */}
      <div>
        <label className="field-label" htmlFor={id("contact")}>
          {t.contactLabel}
        </label>
        <input
          id={id("contact")}
          name="contact"
          type="text"
          className="input"
          value={contact}
          maxLength={120}
          placeholder={t.contactPlaceholder}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          required
          aria-invalid={contactError ? true : undefined}
          aria-describedby={`${id("contact-hint")}${contactError ? ` ${id("contact-error")}` : ""}`}
          onChange={(event) => {
            setContact(event.target.value);
            clearError("contact");
          }}
        />
        <p id={id("contact-hint")} className="field-hint">
          {t.contactHint}
        </p>
        {contactError && (
          <p id={id("contact-error")} className="field-error">
            {contactError}
          </p>
        )}
      </div>

      <div>
        <label className="field-label" htmlFor={id("name")}>
          {t.nameLabel} <span className="font-normal text-ink-3">({t.optional})</span>
        </label>
        <input
          id={id("name")}
          name="name"
          type="text"
          className="input"
          value={name}
          maxLength={80}
          autoComplete="name"
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <fieldset>
        <legend className="field-label">
          {t.interestsLabel} <span className="font-normal text-ink-3">({t.optional})</span>
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {INTERESTS.map((value) => (
            <label key={value} className="pill">
              <input
                type="checkbox"
                name="interests"
                value={value}
                checked={interests.includes(value)}
                onChange={() => toggleInterest(value)}
              />
              <span>{t.interests[value]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Consent */}
      <div>
        <label className="check">
          <input
            id={id("consent")}
            type="checkbox"
            name="consent"
            checked={consent}
            aria-invalid={consentError ? true : undefined}
            aria-describedby={consentError ? id("consent-error") : undefined}
            onChange={(event) => {
              setConsent(event.target.checked);
              clearError("consent");
            }}
          />
          <span className="box" aria-hidden="true">
            <Check size={16} strokeWidth={3} />
          </span>
          <span>{t.consent}</span>
        </label>
        <p className="mt-2 pl-9 text-sm">
          <a href={privacyHref} target="_blank" rel="noopener" className="link">
            {t.privacyLink}
            <span className="sr-only"> ({external})</span>
          </a>
        </p>
        {consentError && (
          <p id={id("consent-error")} className="field-error pl-9">
            {consentError}
          </p>
        )}
      </div>

      <div>
        <button type="submit" className="btn btn-primary w-full sm:w-auto sm:min-w-64" disabled={pending}>
          {pending ? (
            <>
              <LoaderCircle size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
              {t.submitting}
            </>
          ) : (
            t.submit
          )}
        </button>
      </div>
    </form>
  );
}
