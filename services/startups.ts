import { apiFetch } from "@/lib/api";

// ─── Profile ──────────────────────────────────────────────────────────────────

export function getStartupMe(token: string) {
  return apiFetch("/startups/me/", { token });
}

export function getStartupProfile(token: string) {
  return apiFetch("/startups/profile/", { token });
}

export function createStartupProfile(token: string, data: Record<string, unknown>) {
  return apiFetch("/startups/profile/", {
    method: "POST",
    token,
    body: data,
  });
}

export function updateStartupProfile(token: string, data: Record<string, unknown>) {
  return apiFetch("/startups/profile/", {
    method: "PATCH",
    token,
    body: data,
  });
}

// ─── Onboarding ───────────────────────────────────────────────────────────────

export function getStartupOnboardingStatus(token: string) {
  return apiFetch<{ ok: boolean; current_step: number; completed: boolean }>("/startups/onboarding/status/", { token });
}

export function submitStartupOnboardingStep(token: string, step: number, data: Record<string, unknown>) {
  return apiFetch(`/startups/onboarding/step/${step}/`, {
    method: "POST",
    token,
    body: data,
  });
}

// ─── Documents ────────────────────────────────────────────────────────────────

export function getStartupDocuments(token: string) {
  return apiFetch("/startups/documents/", { token });
}

export function uploadStartupDocument(token: string, formData: FormData) {
  return apiFetch("/startups/documents/", {
    method: "POST",
    token,
    body: formData,
    isFormData: true,
  });
}

export function updateStartupDocument(token: string, documentId: number, formData: FormData) {
  return apiFetch(`/startups/documents/${documentId}/`, {
    method: "PATCH",
    token,
    body: formData,
    isFormData: true,
  });
}

export function deleteStartupDocument(token: string, documentId: number) {
  return apiFetch(`/startups/documents/${documentId}/`, {
    method: "DELETE",
    token,
  });
}

// ─── Listings ─────────────────────────────────────────────────────────────────

export function getStartups() {
  return apiFetch("/startups/");
}

export function getStartupById(startupId: number) {
  return apiFetch(`/startups/${startupId}/`);
}

export function autocompleteStartups(field: string, query: string) {
  return apiFetch(`/startups/autocomplete/?field=${encodeURIComponent(field)}&query=${encodeURIComponent(query)}`);
}

// ─── Enrichment ───────────────────────────────────────────────────────────────

export function startupEnrichPreview(token: string, data: { company_name: string; domain: string; country: string }) {
  return apiFetch("/startups/enrich/preview/", {
    method: "POST",
    token,
    body: data,
  });
}

export function startupEnrichApply(token: string, data: { profile: Record<string, unknown> }) {
  return apiFetch("/startups/enrich/apply/", {
    method: "POST",
    token,
    body: data,
  });
}
