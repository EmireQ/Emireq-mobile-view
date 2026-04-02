import { apiFetch } from "@/lib/api";

// ─── Investor Messaging ──────────────────────────────────────────────────────

export function getInvestorConversations(token: string) {
  return apiFetch("/investors/messages/conversations/", { token });
}

export function getInvestorConversation(token: string, conversationId: number) {
  return apiFetch(`/investors/messages/conversations/${conversationId}/`, { token });
}

export function sendInvestorMessage(token: string, conversationId: number, body: string) {
  return apiFetch(`/investors/messages/conversations/${conversationId}/`, {
    method: "POST",
    token,
    body: { body },
  });
}

export function markInvestorConversationRead(token: string, conversationId: number) {
  return apiFetch(`/investors/messages/conversations/${conversationId}/read/`, {
    method: "POST",
    token,
  });
}

export function startConversationWithStartup(token: string, startupId: number) {
  return apiFetch(`/investors/messages/start/${startupId}/`, {
    method: "POST",
    token,
  });
}

// ─── Startup Messaging ───────────────────────────────────────────────────────

export function getStartupConversations(token: string) {
  return apiFetch("/startups/messages/conversations/", { token });
}

export function getStartupConversation(token: string, conversationId: number) {
  return apiFetch(`/startups/messages/conversations/${conversationId}/`, { token });
}

export function sendStartupMessage(token: string, conversationId: number, body: string) {
  return apiFetch(`/startups/messages/conversations/${conversationId}/`, {
    method: "POST",
    token,
    body: { body },
  });
}

export function markStartupConversationRead(token: string, conversationId: number) {
  return apiFetch(`/startups/messages/conversations/${conversationId}/read/`, {
    method: "POST",
    token,
  });
}
