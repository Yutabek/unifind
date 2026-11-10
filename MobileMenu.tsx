"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function MobileMenu({
  links,
  ctaHref,
  ctaLabel,
  openLabel,
  closeLabel,
}: {
  links: { href: string; label: string }[];
  ctaHref: string;
  ctaLabel: string;
  openLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-full border border-ink/20 text-ink lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto bg-glaze px-5 pb-10 pt-4 lg:hidden"
        >
          <nav>
            <ul className="divide-y divide-ink/10">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-display text-3xl font-bold leading-none text-ink no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href={ctaHref} onClick={() => setOpen(false)} className="btn btn-primary mt-8 w-full">
            {ctaLabel}
          </a>
        </div>
      )}
    </>
  );
}
