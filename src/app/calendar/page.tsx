"use client";

import { mockHackathons } from "@/data/mockHackathons";
import { format } from "date-fns";

export default function CalendarPage() {
  const upcomingHackathons = mockHackathons
    .filter((hackathon) => hackathon.status === "upcoming")
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar View</h1>
          <p className="text-muted-foreground mt-2">
            View upcoming hackathon deadlines and events
          </p>
        </div>

        <div className="rounded-lg border bg-card">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingHackathons.map((hackathon) => (
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
                      Registration Deadline:{" "}
                      {format(hackathon.registrationDeadline, "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
              ))}
              {upcomingHackathons.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No upcoming hackathons found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
