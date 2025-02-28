"use client";

import { HackathonCard } from "@/components/HackathonCard";
import { HackathonFilters } from "@/components/HackathonFilters";
import { Button } from "@/components/ui/button";
import { mockHackathons } from "@/data/mockHackathons";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const platforms = Array.from(
    new Set(mockHackathons.map((hackathon) => hackathon.platform))
  );

  const filteredHackathons = mockHackathons.filter((hackathon) => {
    const matchesSearch =
      hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hackathon.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlatform =
      selectedPlatform === "all" || hackathon.platform === selectedPlatform;

    const matchesStatus =
      selectedStatus === "all" || hackathon.status === selectedStatus;

    return matchesSearch && matchesPlatform && matchesStatus;
  });

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 web3-gradient overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
              Track Your Next Hackathon Success
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
              Stay organized and never miss a deadline. Track hackathons, set
              reminders, and focus on building great projects.
            </p>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/hackathons">Browse Hackathons</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/calendar">View Calendar</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 items-start">
            {/* Track Events */}
            <div className="group relative rounded-lg border p-6 hover:bg-slate-800/50">
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-bold text-white">Track Events</h3>
                <p className="text-gray-300">
                  Follow your favorite hackathons and get reminders for
                  registration deadlines.
                </p>
              </div>
            </div>
            {/* Get Notified */}
            <div className="group relative rounded-lg border p-6 hover:bg-slate-800/50">
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-bold text-white">Get Notified</h3>
                <p className="text-gray-300">
                  Receive SMS notifications for upcoming deadlines and event
                  updates.
                </p>
              </div>
            </div>
            {/* Stay Organized */}
            <div className="group relative rounded-lg border p-6 hover:bg-slate-800/50">
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-bold text-white">Stay Organized</h3>
                <p className="text-gray-300">
                  Keep all your hackathon schedules and details in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Never Miss a Deadline
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
              Our calendar view helps you stay on top of all your hackathon
              deadlines and important dates.
            </p>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/calendar">View Full Calendar</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Hackathons */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
              Featured Hackathons
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
              Discover the most exciting upcoming hackathons from around the
              world.
            </p>
          </div>

          <div className="mb-8">
            <HackathonFilters
              platforms={platforms}
              selectedPlatform={selectedPlatform}
              onPlatformChange={setSelectedPlatform}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredHackathons.slice(0, 3).map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Button asChild variant="outline">
              <Link href="/hackathons">View All Hackathons</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
