import { apiFetch } from "@/lib/api";

export function search(params: { q?: string; type?: string; industry?: string; stage?: string; location?: string }) {
  const searchParams = new URLSearchParams();
  if (params.q) searchParams.set("q", params.q);
  if (params.type) searchParams.set("type", params.type);
  if (params.industry) searchParams.set("industry", params.industry);
  if (params.stage) searchParams.set("stage", params.stage);
  if (params.location) searchParams.set("location", params.location);
  return apiFetch(`/search/?${searchParams.toString()}`);
}

export function searchHome(q: string, limit = 6) {
  return apiFetch(`/search/home/?q=${encodeURIComponent(q)}&limit=${limit}`);
}
