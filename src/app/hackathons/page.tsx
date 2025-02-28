"use client";

import { useState } from "react";
import { useHackathons } from "@/hooks/useHackathons";
import { HackathonCard } from "@/components/HackathonCard";
import { HackathonFilters } from "@/components/HackathonFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function HackathonsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedMode, setSelectedMode] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { hackathons, isLoading, error } = useHackathons({
    status: selectedStatus || undefined,
    mode: selectedMode || undefined,
    tags: selectedTags.length ? selectedTags : undefined,
  });

  const filteredHackathons = hackathons.filter((hackathon) => {
    if (
      searchQuery &&
      !hackathon.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <main className="container py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Hackathons</h1>
          <p className="text-muted-foreground">
            Discover and track the latest hackathons from Devfolio
          </p>
        </div>

        <HackathonFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedMode={selectedMode}
          onModeChange={setSelectedMode}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
        />

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            : filteredHackathons.map((hackathon) => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} />
              ))}
        </div>

        {!isLoading && filteredHackathons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hackathons found</p>
          </div>
        )}
      </div>
    </main>
  );
}
