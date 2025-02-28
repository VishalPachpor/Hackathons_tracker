import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface HackathonFiltersProps {
  platforms: string[];
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

export function HackathonFilters({
  platforms,
  selectedPlatform,
  onPlatformChange,
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
}: HackathonFiltersProps) {
  const chains = [
    "Ethereum",
    "Polygon",
    "Solana",
    "Chainlink",
    "IPFS/Filecoin",
    "Other",
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search hackathons..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full border-primary/50 bg-background/50 backdrop-blur-sm focus-visible:ring-primary"
          />
        </div>
        <Select value={selectedPlatform} onValueChange={onPlatformChange}>
          <SelectTrigger className="w-full sm:w-[180px] border-primary/50 bg-background/50 backdrop-blur-sm focus:ring-primary">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent className="bg-background/95 backdrop-blur-sm border-primary/50">
            <SelectItem value="all">All Platforms</SelectItem>
            {platforms.map((platform) => (
              <SelectItem key={platform} value={platform}>
                {platform}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full sm:w-[180px] border-primary/50 bg-background/50 backdrop-blur-sm focus:ring-primary">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-background/95 backdrop-blur-sm border-primary/50">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="ended">Ended</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge
          variant="outline"
          className="cursor-pointer border-primary/50 text-primary hover:bg-primary/10 backdrop-blur-sm"
        >
          Web3
        </Badge>
        <Badge
          variant="outline"
          className="cursor-pointer border-secondary/50 text-secondary hover:bg-secondary/10 backdrop-blur-sm"
        >
          AI/ML
        </Badge>
        <Badge
          variant="outline"
          className="cursor-pointer border-accent/50 text-accent hover:bg-accent/10 backdrop-blur-sm"
        >
          DeFi
        </Badge>
        <Badge
          variant="outline"
          className="cursor-pointer border-primary/50 text-primary hover:bg-primary/10 backdrop-blur-sm"
        >
          NFT
        </Badge>
        <Badge
          variant="outline"
          className="cursor-pointer border-secondary/50 text-secondary hover:bg-secondary/10 backdrop-blur-sm"
        >
          GameFi
        </Badge>
      </div>
    </div>
  );
}
