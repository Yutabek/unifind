import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client that uses the SECRET key.
 * The secret key bypasses Row Level Security, so it must never reach the
 * browser: this file imports "server-only", which makes the build fail if a
 * client component ever imports it.
 */

let client: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(readUrl() && readKey());
}

function readUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || undefined;
}

function readKey(): string | undefined {
  // SUPABASE_SERVICE_ROLE_KEY is the legacy name of the same kind of key.
  return process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || undefined;
}

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = readUrl();
  const key = readKey();
  if (!url || !key) return null;
  client ??= createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  return client;
}
