import axios from "axios";
import { PrismaClient, Hackathon } from "@prisma/client";
import Redis from "redis";
import { promisify } from "util";

const prisma = new PrismaClient();
const redis = Redis.createClient(process.env.REDIS_URL);
const getAsync = promisify(redis.get).bind(redis);
const setAsync = promisify(redis.set).bind(redis);

interface DevfolioHackathon {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  registration_deadline: string;
  participant_count: number;
  registration_url: string;
  status: string;
  location: string;
  mode: string;
  prize_pool: string;
  organizer: {
    name: string;
    logo_url: string;
  };
  tags: string[];
}

export class DevfolioService {
  private readonly CACHE_TTL = 300; // 5 minutes in seconds
  private readonly API_URL = process.env.DEVFOLIO_API_URL;
  private readonly API_KEY = process.env.DEVFOLIO_API_KEY;

  constructor() {
    this.setupAxiosInterceptors();
  }

  private setupAxiosInterceptors() {
    axios.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${this.API_KEY}`;
      return config;
    });

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        await this.logSyncError(error);
        throw error;
      }
    );
  }

  private async logSyncError(error: any) {
    try {
      await prisma.syncLog.create({
        data: {
          status: "failed",
          message: error.message,
          error: JSON.stringify(error.response?.data || error),
        },
      });
    } catch (logError) {
      console.error("Failed to log sync error:", logError);
    }
  }

  private transformHackathon(
    data: DevfolioHackathon
  ): Omit<Hackathon, "id" | "createdAt" | "updatedAt" | "lastSyncedAt"> {
    return {
      devfolioId: data.id,
      title: data.title,
      description: data.description,
      startDate: new Date(data.start_date),
      endDate: new Date(data.end_date),
      registrationDeadline: data.registration_deadline
        ? new Date(data.registration_deadline)
        : null,
      participantCount: data.participant_count,
      registrationUrl: data.registration_url,
      status: data.status.toLowerCase(),
      location: data.location,
      mode: data.mode.toLowerCase(),
      prizePool: data.prize_pool,
      organizerName: data.organizer.name,
      organizerLogo: data.organizer.logo_url,
      tags: data.tags,
    };
  }

  public async fetchHackathons(): Promise<void> {
    try {
      const cachedData = await getAsync("hackathons");
      if (cachedData) {
        console.log("Using cached hackathon data");
        return;
      }

      const response = await axios.get<{ hackathons: DevfolioHackathon[] }>(
        `${this.API_URL}/hackathons`
      );

      const hackathons = response.data.hackathons;

      // Process each hackathon
      for (const hackathon of hackathons) {
        const transformedData = this.transformHackathon(hackathon);

        await prisma.hackathon.upsert({
          where: { devfolioId: hackathon.id },
          update: {
            ...transformedData,
            lastSyncedAt: new Date(),
          },
          create: transformedData,
        });
      }

      // Cache the successful response
      await setAsync(
        "hackathons",
        JSON.stringify(hackathons),
        "EX",
        this.CACHE_TTL
      );

      // Log successful sync
      await prisma.syncLog.create({
        data: {
          status: "success",
          message: `Successfully synced ${hackathons.length} hackathons`,
        },
      });
    } catch (error) {
      throw new Error(`Failed to fetch hackathons: ${error.message}`);
    }
  }

  public async getHackathons(filters?: {
    status?: string;
    mode?: string;
    tags?: string[];
  }) {
    const where: any = {};

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.mode) {
      where.mode = filters.mode;
    }

    if (filters?.tags?.length) {
      where.tags = {
        hasEvery: filters.tags,
      };
    }

    return prisma.hackathon.findMany({
      where,
      orderBy: [
        {
          startDate: "asc",
        },
      ],
    });
  }

  public async getHackathonById(id: string) {
    return prisma.hackathon.findUnique({
      where: { id },
    });
  }
}
