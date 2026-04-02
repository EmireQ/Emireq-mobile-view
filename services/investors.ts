import { apiFetch } from "@/lib/api";

// ─── Investor Profile ─────────────────────────────────────────────────────────

export function getInvestorProfile(token: string) {
  return apiFetch("/investors/me/", { token });
}

export function getInvestorOnboardingStatus(token: string) {
  return apiFetch<{ ok: boolean; current_step: number; completed: boolean }>("/investors/onboarding/status/", { token });
}

export function submitInvestorOnboardingStep(
  token: string,
  step: number,
  data: Record<string, unknown> | FormData,
) {
  const isForm = data instanceof FormData;
  return apiFetch(`/investors/onboarding/step/${step}/`, {
    method: "POST",
    token,
    body: data,
    ...(isForm ? { isFormData: true } : {}),
  });
}

// ─── Enrichment ───────────────────────────────────────────────────────────────

export function investorEnrichPreview(token: string, data: { full_name: string; country: string; investor_type: string; ai_linkedin?: string }) {
  return apiFetch("/investors/enrich/preview/", {
    method: "POST",
    token,
    body: data,
  });
}

// ─── Due Diligence ────────────────────────────────────────────────────────────

export function getDueDiligenceList(token: string) {
  return apiFetch("/investors/due-diligence/", { token });
}

export function getDueDiligenceReport(token: string, startupId: number) {
  return apiFetch(`/investors/due-diligence/startups/${startupId}/report/`, { token });
}
