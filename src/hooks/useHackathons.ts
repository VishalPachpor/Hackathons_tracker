import { useState, useEffect } from "react";
import { Hackathon } from "@prisma/client";
import { mockHackathons } from "@/data/mockHackathons";

interface UseHackathonsOptions {
  status?: string;
  mode?: string;
  tags?: string[];
  initialData?: Hackathon[];
}

export function useHackathons({
  status,
  mode,
  tags,
  initialData,
}: UseHackathonsOptions = {}) {
  const [hackathons, setHackathons] = useState<Hackathon[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Filter mock data based on the provided filters
        let filteredHackathons = [...mockHackathons];

        if (status) {
          filteredHackathons = filteredHackathons.filter(
            (h) => h.status === status
          );
        }

        if (mode) {
          filteredHackathons = filteredHackathons.filter(
            (h) => h.mode === mode
          );
        }

        if (tags?.length) {
          filteredHackathons = filteredHackathons.filter((h) =>
            tags.some((tag) => h.tags.includes(tag))
          );
        }

        setHackathons(filteredHackathons);
      } catch (err) {
        setError("Failed to fetch hackathons");
        console.error("Error fetching hackathons:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHackathons();
  }, [status, mode, tags]);

  const refetch = () => {
    setHackathons([]);
    setIsLoading(true);
  };

  return {
    hackathons,
    isLoading,
    error,
    refetch,
  };
}
