"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function NotificationsPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Notification Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your notification preferences
          </p>
        </div>

        <div className="grid gap-6 max-w-2xl">
          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">SMS Notifications</h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <Button>Save Phone Number</Button>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Email Notifications
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <Button>Save Email</Button>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Choose when you want to receive notifications:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between p-2 rounded hover:bg-accent">
                    <span>Registration Deadlines</span>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </li>
                  <li className="flex items-center justify-between p-2 rounded hover:bg-accent">
                    <span>Event Start Reminders</span>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </li>
                  <li className="flex items-center justify-between p-2 rounded hover:bg-accent">
                    <span>New Hackathon Announcements</span>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
