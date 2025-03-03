import { Hackathon } from "@prisma/client";

export const mockHackathons: Hackathon[] = [
  {
    id: "1",
    devfolioId: "hack-1",
    title: "Web3 Innovation Hackathon",
    description:
      "Join us for a 48-hour hackathon focused on building the future of Web3. Create innovative solutions using blockchain technology.",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-04-03"),
    registrationDeadline: new Date("2024-03-28"),
    participantCount: 250,
    registrationUrl: "https://example.com/web3-hackathon",
    status: "upcoming",
    location: "Online",
    mode: "online",
    prizePool: "$10,000",
    organizerName: "Web3 Foundation",
    organizerLogo:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    tags: ["web3", "blockchain", "defi"],
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSyncedAt: new Date(),
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
  {
    id: "2",
    devfolioId: "hack-2",
    title: "AI/ML Summit Hackathon",
    description:
      "Build cutting-edge AI and machine learning solutions. Perfect for developers interested in artificial intelligence.",
    startDate: new Date("2024-04-15"),
    endDate: new Date("2024-04-17"),
    registrationDeadline: new Date("2024-04-10"),
    participantCount: 300,
    registrationUrl: "https://example.com/ai-hackathon",
    status: "upcoming",
    location: "San Francisco",
    mode: "hybrid",
    prizePool: "$15,000",
    organizerName: "AI Research Labs",
    organizerLogo:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    tags: ["ai", "machine-learning", "data-science"],
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSyncedAt: new Date(),
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  },
  {
    id: "3",
    devfolioId: "hack-3",
    title: "GameFi Revolution",
    description:
      "Create the next generation of blockchain games. Combine gaming with DeFi mechanics for an immersive experience.",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-05-03"),
    registrationDeadline: new Date("2024-04-25"),
    participantCount: 200,
    registrationUrl: "https://example.com/gamefi-hackathon",
    status: "upcoming",
    location: "Virtual",
    mode: "online",
    prizePool: "$20,000",
    organizerName: "GameFi DAO",
    organizerLogo: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
    tags: ["gamefi", "web3", "gaming"],
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSyncedAt: new Date(),
    imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
  },
];
