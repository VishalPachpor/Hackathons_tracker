"use client";

import { HackathonCard } from "@/components/HackathonCard";
import { HackathonFilters } from "@/components/HackathonFilters";
import { mockHackathons } from "@/data/mockHackathons";
import { useState } from "react";

export default function HackathonsPage() {
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
    <div className="container py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Hackathons</h1>
          <p className="text-muted-foreground mt-2">
            Browse and filter hackathons from various platforms
          </p>
        </div>

        <HackathonFilters
          platforms={platforms}
          selectedPlatform={selectedPlatform}
          onPlatformChange={setSelectedPlatform}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((hackathon) => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))}
          {filteredHackathons.length === 0 && (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">
                No hackathons found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
