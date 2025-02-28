"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { mockHackathons } from "@/data/mockHackathons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { HackathonCard } from "@/components/HackathonCard";
import { Link } from "@/components/ui/link";
import { useState } from "react";

// Mock user data (in a real app, this would come from an API/database)
const initialUserData = {
  name: "Alex Chen",
  email: "alex@example.com",
  avatar: "https://images.unsplash.com/photo-1639322537228-f710d846310a",
  bio: "Full-stack developer passionate about Web3 and blockchain technology. Always looking for new hackathons to participate in!",
  location: "San Francisco, CA",
  github: "alexchen",
  twitter: "alexchen_web3",
  achievements: [
    "1st Place - ETHGlobal 2023",
    "Best DeFi Project - Polygon BUIDL IT",
    "Community Choice - Chainlink Hackathon",
  ],
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [newAchievement, setNewAchievement] = useState("");
  const attendedHackathons = mockHackathons.slice(0, 3);

  const handleSave = () => {
    // In a real app, this would make an API call to update the user's profile
    setIsEditing(false);
  };

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setUserData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()],
      }));
      setNewAchievement("");
    }
  };

  const handleRemoveAchievement = (index: number) => {
    setUserData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-12">
        {/* User Info Section */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="overflow-hidden">
            <CardHeader className="relative h-48">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-background">
                  <Image
                    src={userData.avatar}
                    alt={userData.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {isEditing ? (
                  <Input
                    value={userData.name}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="mt-6 text-center text-lg font-semibold"
                    placeholder="Your name"
                  />
                ) : (
                  <h1 className="mt-6 text-2xl font-bold">{userData.name}</h1>
                )}
                {isEditing ? (
                  <Input
                    value={userData.location}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    className="mt-2 text-center text-sm"
                    placeholder="Your location"
                  />
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {userData.location}
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">About</h2>
                {isEditing ? (
                  <Textarea
                    value={userData.bio}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    className="min-h-[120px] text-base"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {userData.bio}
                  </p>
                )}
              </div>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Contact</h2>
                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                          value={userData.email}
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          placeholder="your@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">GitHub</label>
                        <Input
                          value={userData.github}
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              github: e.target.value,
                            }))
                          }
                          placeholder="GitHub username"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Twitter</label>
                        <Input
                          value={userData.twitter}
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              twitter: e.target.value,
                            }))
                          }
                          placeholder="Twitter username"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <span className="font-medium">Email:</span> {userData.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-medium">GitHub:</span> @{userData.github}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-medium">Twitter:</span> @{userData.twitter}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Achievements</h2>
                <ul className="space-y-3">
                  {userData.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between gap-4 text-sm bg-muted/50 rounded-lg p-3"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-primary text-lg">🏆</span> {achievement}
                      </span>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveAchievement(index)}
                          className="h-8 px-2 hover:bg-destructive/10 hover:text-destructive"
                        >
                          ✕
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
                {isEditing && (
                  <div className="flex gap-3 mt-4">
                    <Input
                      value={newAchievement}
                      onChange={(e) => setNewAchievement(e.target.value)}
                      placeholder="Add new achievement"
                      className="flex-1"
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleAddAchievement()
                      }
                    />
                    <Button onClick={handleAddAchievement}>
                      Add
                    </Button>
                  </div>
                )}
              </div>
              <div className="pt-4 space-y-3">
                <Button
                  className="w-full"
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => {
                    if (isEditing) {
                      handleSave();
                    } else {
                      setIsEditing(true);
                    }
                  }}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
                {isEditing && (
                  <Button
                    className="w-full"
                    variant="ghost"
                    onClick={() => {
                      setIsEditing(false);
                      setUserData(initialUserData);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Statistics</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-lg bg-primary/5">
                  <p className="text-3xl font-bold text-primary">
                    {attendedHackathons.length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Hackathons Attended
                  </p>
                </div>
                <div className="text-center p-6 rounded-lg bg-secondary/5">
                  <p className="text-3xl font-bold text-secondary">
                    {userData.achievements.length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">Prizes Won</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hackathons Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Attended Hackathons</h2>
            <Button variant="outline">View All</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {attendedHackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>

          {attendedHackathons.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  You haven't attended any hackathons yet.
                </p>
                <Button asChild>
                  <Link href="/hackathons">Browse Hackathons</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
