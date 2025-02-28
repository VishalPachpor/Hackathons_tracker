import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hackathon } from "@/types/hackathon";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface HackathonCardProps {
  hackathon: Hackathon;
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  const [isAttending, setIsAttending] = useState(false);
  const {
    title,
    description,
    imageUrl,
    startDate,
    endDate,
    prizePool,
    platform,
    organizer,
    mode,
    tags,
    website,
  } = hackathon;

  const handleAttend = () => {
    setIsAttending(!isAttending);
    // In a real app, this would make an API call to update the user's profile
  };

  return (
    <Card className="gradient-border flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.02]">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover brightness-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute top-4 right-4 flex gap-2">
          <Badge
            variant="outline"
            className={`${
              mode === "online"
                ? "border-green-500 text-green-500"
                : mode === "offline"
                ? "border-blue-500 text-blue-500"
                : "border-purple-500 text-purple-500"
            } backdrop-blur-md bg-background/30`}
          >
            {mode}
          </Badge>
          {isAttending && (
            <Badge
              variant="outline"
              className="border-primary text-primary backdrop-blur-md bg-background/30"
            >
              Attending
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="space-y-2">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold tracking-tight glow-text">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">by {organizer}</p>
        </div>
      </CardHeader>

      <CardContent className="flex-grow space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Date:</span>
            <span className="text-muted-foreground">
              {format(startDate, "MMM dd")} - {format(endDate, "MMM dd, yyyy")}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Prize Pool:</span>
            <span className="text-primary glow-text">{prizePool}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Platform:</span>
            <span className="text-muted-foreground">{platform}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-primary/50 text-primary backdrop-blur-md"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge
              variant="outline"
              className="border-primary/50 text-primary backdrop-blur-md"
            >
              +{tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-4 gap-2">
        <Button
          variant={isAttending ? "outline" : "secondary"}
          className="flex-1"
          onClick={handleAttend}
        >
          {isAttending ? "Attending" : "Attend"}
        </Button>
        <Button variant="default" asChild className="flex-1">
          <Link href={website} target="_blank" rel="noopener noreferrer">
            Register
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
