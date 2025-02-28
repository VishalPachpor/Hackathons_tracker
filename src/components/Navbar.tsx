"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";

export function Navbar() {
  const { login, ready, authenticated, logout } = usePrivy();

  return (
    <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            HackTracker
          </span>
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          {authenticated ? (
            <>
              <Button
                variant="ghost"
                asChild
                className="text-sm font-medium"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button
                variant="ghost"
                asChild
                className="text-sm font-medium"
              >
                <Link href="/profile">Profile</Link>
              </Button>
            </>
          ) : null}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {authenticated ? (
            <Button
              onClick={() => logout()}
              variant="default"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => login()}
              disabled={!ready}
              variant="default"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
