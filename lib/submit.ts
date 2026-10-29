import { SIGNUP_ENDPOINT } from "@/lib/event";

/**
 * Saves one form submission to the Google Sheet behind SIGNUP_ENDPOINT
 * (scripts/google-sheet-signups.gs). `form` names the tab; every other key
 * becomes a column, so use readable labels as keys.
 *
 * Sent as text/plain so the browser makes a simple request (no CORS
 * pre-flight, which Apps Script cannot answer). Resolves true only when the
 * script confirms the row was written; any other outcome is false and the
 * caller shows the visitor the phone and email fallback.
 */
export async function saveToSheet(form: string, values: Record<string, string | string[]>): Promise<boolean> {
  try {
    const res = await fetch(SIGNUP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ form, ...values }),
    });
    if (!res.ok) return false;
    const out = (await res.json()) as { ok?: boolean };
    return out.ok === true;
  } catch {
    return false;
  }
}
