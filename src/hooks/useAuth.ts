import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useAuth() {
  const { login, logout, authenticated, ready, user } = usePrivy();
  const router = useRouter();

  const handleLogin = useCallback(
    async (provider: "google" | "github" | "discord") => {
      try {
        await login({ provider });
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    [login]
  );

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [logout, router]);

  return {
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: authenticated,
    isLoading: !ready,
    user,
  };
}
