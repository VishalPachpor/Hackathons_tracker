"use client";

import { Button } from "@/components/ui/button";
import { mockHackathons } from "@/data/mockHackathons";
import { format } from "date-fns";
import Link from "next/link";

export default function DashboardPage() {
  // For now, we'll show all hackathons as if they're tracked
  const trackedHackathons = mockHackathons.slice(0, 3);

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Track your hackathons and manage notifications
            </p>
          </div>
          <Button asChild>
            <Link href="/hackathons">Browse More</Link>
          </Button>
        </div>

        <div className="grid gap-6">
          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Tracked Hackathons</h2>
              <div className="space-y-4">
                {trackedHackathons.map((hackathon) => (
                  <div
                    key={hackathon.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div>
                      <h3 className="font-medium">{hackathon.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {hackathon.platform}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {format(hackathon.startDate, "MMM dd, yyyy")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Status: {hackathon.status}
                      </p>
                    </div>
                  </div>
                ))}
                {trackedHackathons.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      You haven't tracked any hackathons yet
                    </p>
                    <Button asChild>
                      <Link href="/hackathons">Browse Hackathons</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Notification Settings
              </h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Configure your notification preferences to stay updated about
                  hackathon deadlines and important updates.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/notifications">Manage Notifications</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
