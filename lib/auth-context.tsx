"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import {
  getFirebaseAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from "@/lib/firebase";
import { apiFetch } from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

type UserRole = "investor" | "startup" | null;

interface AuthUser {
  role: UserRole;
  token: string;
  email?: string;
  username?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  investorLogin: (identifier: string, password: string) => Promise<void>;
  investorRegister: (data: { username: string; email: string; password: string; password_confirmation: string }) => Promise<void>;
  startupLogin: (email: string, password: string) => Promise<void>;
  startupRegister: (data: { username: string; email: string; password: string; password_confirmation: string }) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Token storage keys ───────────────────────────────────────────────────────

const INVESTOR_TOKEN_KEY = "emireq_investor_token";
const USER_ROLE_KEY = "emireq_user_role";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const role = localStorage.getItem(USER_ROLE_KEY) as UserRole;

    // Investor: restore from localStorage
    if (role === "investor") {
      const token = localStorage.getItem(INVESTOR_TOKEN_KEY);
      if (token) setUser({ role: "investor", token });
      setLoading(false);
    }

    // Startup: listen to Firebase auth state for token
    let unsubscribe: (() => void) | undefined;
    try {
      unsubscribe = onAuthStateChanged(getFirebaseAuth(), async (fbUser) => {
        setFirebaseUser(fbUser);
        if (fbUser && role === "startup") {
          const token = await fbUser.getIdToken();
          setUser({ role: "startup", token, email: fbUser.email || undefined });
        } else if (!fbUser && role === "startup") {
          setUser(null);
          localStorage.removeItem(USER_ROLE_KEY);
        }
        setLoading(false);
      });
    } catch {
      // Firebase not configured — skip auth listener
      if (role !== "investor") setLoading(false);
    }

    return () => unsubscribe?.();
  }, []);

  // ─── Investor Auth (token-based) ──────────────────────────────────────

  const investorLogin = useCallback(async (identifier: string, password: string) => {
    const data = await apiFetch<{ token?: string; key?: string }>("/investors/auth/login/", {
      method: "POST",
      body: { identifier, password },
    });
    const token = data.token || data.key || "";
    localStorage.setItem(INVESTOR_TOKEN_KEY, token);
    localStorage.setItem(USER_ROLE_KEY, "investor");
    setUser({ role: "investor", token });
  }, []);

  const investorRegister = useCallback(async (data: { username: string; email: string; password: string; password_confirmation: string }) => {
    await apiFetch("/investors/auth/register/", {
      method: "POST",
      body: data,
    });
  }, []);

  // ─── Startup Auth (Firebase-based) ────────────────────────────────────

  const startupLogin = useCallback(async (email: string, password: string) => {
    // Register the login attempt on the backend
    await apiFetch("/startups/auth/login/", {
      method: "POST",
      body: { email, password },
    }).catch(() => {});

    // Sign in via Firebase — the ID token is what the backend verifies
    const cred = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
    const token = await cred.user.getIdToken();
    localStorage.setItem(USER_ROLE_KEY, "startup");
    setUser({ role: "startup", token, email });
  }, []);

  const startupRegister = useCallback(async (data: { username: string; email: string; password: string; password_confirmation: string }) => {
    // Backend creates the Firebase user server-side
    await apiFetch("/startups/auth/register/", {
      method: "POST",
      body: data,
    });
  }, []);

  // ─── Logout ───────────────────────────────────────────────────────────

  const logout = useCallback(async () => {
    const role = user?.role;
    try {
      const endpoint = role === "investor" ? "/investors/auth/logout/" : "/startups/auth/logout/";
      await apiFetch(endpoint, { method: "POST", token: user?.token }).catch(() => {});
      if (role === "startup") {
        await firebaseSignOut(getFirebaseAuth());
      }
    } finally {
      localStorage.removeItem(INVESTOR_TOKEN_KEY);
      localStorage.removeItem(USER_ROLE_KEY);
      setUser(null);
      setFirebaseUser(null);
    }
  }, [user]);

  // ─── Get fresh token ─────────────────────────────────────────────────
  // For startups, always get a fresh Firebase ID token (they expire hourly)

  const getToken = useCallback(async () => {
    if (user?.role === "startup" && firebaseUser) {
      return firebaseUser.getIdToken();
    }
    return user?.token || null;
  }, [user, firebaseUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        investorLogin,
        investorRegister,
        startupLogin,
        startupRegister,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
